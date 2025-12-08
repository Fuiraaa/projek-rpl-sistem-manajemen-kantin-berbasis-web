<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log; 
use App\Models\Transaksi;
use App\Models\Menu;
use App\Models\Pengeluaran;
use App\Models\ProduksiHarian;
use Carbon\Carbon;

class SettingController extends Controller
{
    /**
     * Menampilkan halaman Settings
     */
    public function index()
    {
        $settings = [
            'tanggal_sistem' => session('app_settings.tanggal_sistem', date('Y-m-d')),
            'ukuran_font' => session('app_settings.ukuran_font', '14'),
        ];

        // Cek file backup terakhir (hanya visual, tidak mempengaruhi fungsi backup baru)
        $lastBackup = '-';
        if (Storage::exists('backups')) {
            $files = Storage::files('backups');
            if (!empty($files)) {
                $jsonFiles = array_filter($files, function($f) {
                    return str_ends_with($f, '.json'); 
                });
                if (!empty($jsonFiles)) {
                    $lastFile = end($jsonFiles);
                    $timestamp = Storage::lastModified($lastFile);
                    $lastBackup = date('d-m-Y, H:i:s', $timestamp) . ' WIB';
                }
            }
        }

        return Inertia::render('Settings/Setting', [
            'settings' => $settings,
            'last_backup' => $lastBackup
        ]);
    }

    /**
     * Update Preferensi
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'tanggal_sistem' => 'required|date',
            'ukuran_font' => 'required',
        ]);

        session(['app_settings' => $validated]);

        return back()->with('success', 'Pengaturan preferensi berhasil disimpan!');
    }

    /**
     * Handle Backup Data (Direct Stream JSON)
     * REVISI: Langsung stream ke browser tanpa simpan ke storage dulu untuk menghindari error permission.
     */
    public function backup()
    {
        // Bersihkan buffer agar tidak corrupt
        if (ob_get_length()) ob_end_clean();

        try {
            $fileName = 'backup_full_' . now()->format('Y-m-d_His') . '.json';
            
            $headers = [
                'Content-type'        => 'application/json',
                'Content-Disposition' => "attachment; filename=$fileName",
                'Pragma'              => 'no-cache',
                'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
                'Expires'             => '0',
            ];

            return response()->stream(function () {
                // Ambil data
                $fullData = [
                    'meta' => [
                        'version' => '1.0',
                        'timestamp' => now()->toDateTimeString(),
                        'app_name' => config('app.name', 'Kasir App')
                    ],
                    'menus' => Menu::withTrashed()->get(),
                    'produksi' => ProduksiHarian::with('produksiDetail')->withTrashed()->get(),
                    'transaksi' => Transaksi::with('detail')->get(),
                    'pengeluaran' => Pengeluaran::get(),
                ];

                echo json_encode($fullData, JSON_PRETTY_PRINT);
                
            }, 200, $headers);

        } catch (\Exception $e) {
            Log::error('BACKUP ERROR: ' . $e->getMessage());
            return back()->with('error', 'Gagal backup: ' . $e->getMessage());
        }
    }

    /**
     * Download Laporan Keuangan (XML Excel)
     * FOKUS: Pemasukan vs Pengeluaran (Seperti LaporanController)
     */
    public function downloadReport()
    {
        $fileName = 'Laporan_Keuangan_Lengkap_' . now()->format('d-m-Y') . '.xls';

        $headers = [
            "Content-type"        => "application/vnd.ms-excel",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        // Callback stream
        $callback = function() {
            // PENTING: Bersihkan output buffer
            if (ob_get_length()) ob_end_clean();
            
            $output = fopen('php://output', 'w');
            
            // --- HEADER XML ---
            fwrite($output, '<?xml version="1.0"?>');
            fwrite($output, '<?mso-application progid="Excel.Sheet"?>');
            fwrite($output, '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" ');
            fwrite($output, 'xmlns:o="urn:schemas-microsoft-com:office:office" ');
            fwrite($output, 'xmlns:x="urn:schemas-microsoft-com:office:excel" ');
            fwrite($output, 'xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" ');
            fwrite($output, 'xmlns:html="http://www.w3.org/TR/REC-html40">');
            
            // Styles
            fwrite($output, '<Styles>');
            // Header Style (Pink Background, White Text)
            fwrite($output, '<Style ss:ID="header"><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#db2777" ss:Pattern="Solid"/><Alignment ss:Horizontal="Center" ss:Vertical="Center"/></Style>');
            // Currency Style
            fwrite($output, '<Style ss:ID="currency"><NumberFormat ss:Format="#,##0"/></Style>');
            // Title Style
            fwrite($output, '<Style ss:ID="title"><Font ss:Bold="1" ss:Size="14"/><Alignment ss:Horizontal="Center"/></Style>');
            fwrite($output, '</Styles>');

            // ================= LOGIKA PENGGABUNGAN DATA =================
            // 1. Ambil Pemasukan (Transaksi)
            $pemasukan = Transaksi::select(
                'tanggal_transaksi as tanggal', 
                'total_harga as nominal', 
                DB::raw("'Pemasukan' as tipe"),
                DB::raw("CONCAT('Penjualan #', transaksi_id) as deskripsi")
            )->get();

            // 2. Ambil Pengeluaran
            $pengeluaran = Pengeluaran::select(
                'tanggal_pengeluaran as tanggal', 
                'jumlah as nominal', 
                DB::raw("'Pengeluaran' as tipe"),
                'deskripsi'
            )->get();

            // 3. Gabung & Urutkan berdasarkan tanggal (Terbaru di atas)
            $gabungan = $pemasukan->concat($pengeluaran)->sortByDesc('tanggal');

            // Hitung Total untuk Ringkasan
            $totalPemasukan = $pemasukan->sum('nominal');
            $totalPengeluaran = $pengeluaran->sum('nominal');
            $labaBersih = $totalPemasukan - $totalPengeluaran;

            // ================= TAB 1: ARUS KAS (DETAIL) =================
            fwrite($output, '<Worksheet ss:Name="Laporan Arus Kas"><Table>');
            
            // Judul
            fwrite($output, '<Row><Cell ss:MergeAcross="3" ss:StyleID="title"><Data ss:Type="String">Laporan Arus Kas (Pemasukan &amp; Pengeluaran)</Data></Cell></Row>');
            fwrite($output, '<Row><Cell></Cell></Row>'); // Spacer

            // Header Kolom
            fwrite($output, '<Row>');
            fwrite($output, '<Cell ss:StyleID="header"><Data ss:Type="String">Tanggal</Data></Cell>');
            fwrite($output, '<Cell ss:StyleID="header"><Data ss:Type="String">Tipe</Data></Cell>');
            fwrite($output, '<Cell ss:StyleID="header"><Data ss:Type="String">Keterangan</Data></Cell>');
            fwrite($output, '<Cell ss:StyleID="header"><Data ss:Type="String">Nominal (Rp)</Data></Cell>');
            fwrite($output, '</Row>');

            // Isi Data
            foreach ($gabungan as $data) {
                fwrite($output, '<Row>');
                fwrite($output, '<Cell><Data ss:Type="String">' . Carbon::parse($data->tanggal)->format('Y-m-d') . '</Data></Cell>');
                
                // Warna tipe (Manual style inline logic sederhana)
                $tipeData = htmlspecialchars($data->tipe);
                fwrite($output, '<Cell><Data ss:Type="String">' . $tipeData . '</Data></Cell>');
                
                fwrite($output, '<Cell><Data ss:Type="String">' . htmlspecialchars($data->deskripsi) . '</Data></Cell>');
                fwrite($output, '<Cell ss:StyleID="currency"><Data ss:Type="Number">' . $data->nominal . '</Data></Cell>');
                fwrite($output, '</Row>');
            }
            fwrite($output, '</Table></Worksheet>');

            // ================= TAB 2: RINGKASAN LABA RUGI =================
            fwrite($output, '<Worksheet ss:Name="Ringkasan Laba Rugi"><Table>');
            
            fwrite($output, '<Column ss:Width="150"/>');
            fwrite($output, '<Column ss:Width="150"/>');

            fwrite($output, '<Row><Cell ss:MergeAcross="1" ss:StyleID="title"><Data ss:Type="String">Ringkasan Keuangan</Data></Cell></Row>');
            fwrite($output, '<Row><Cell></Cell></Row>');

            // Total Pemasukan
            fwrite($output, '<Row>');
            fwrite($output, '<Cell><Data ss:Type="String">Total Pemasukan</Data></Cell>');
            fwrite($output, '<Cell ss:StyleID="currency"><Data ss:Type="Number">' . $totalPemasukan . '</Data></Cell>');
            fwrite($output, '</Row>');

            // Total Pengeluaran
            fwrite($output, '<Row>');
            fwrite($output, '<Cell><Data ss:Type="String">Total Pengeluaran</Data></Cell>');
            fwrite($output, '<Cell ss:StyleID="currency"><Data ss:Type="Number">' . $totalPengeluaran . '</Data></Cell>');
            fwrite($output, '</Row>');

            // Divider
            fwrite($output, '<Row><Cell ss:MergeAcross="1"><Data ss:Type="String">------------------------------------------------</Data></Cell></Row>');

            // Laba Bersih
            fwrite($output, '<Row>');
            fwrite($output, '<Cell ss:StyleID="header"><Data ss:Type="String">Laba Bersih</Data></Cell>');
            fwrite($output, '<Cell ss:StyleID="currency"><Data ss:Type="Number">' . $labaBersih . '</Data></Cell>');
            fwrite($output, '</Row>');

            fwrite($output, '</Table></Worksheet>');

            // --- FOOTER XML ---
            fwrite($output, '</Workbook>');
            fclose($output);
        };

        return response()->stream($callback, 200, $headers);
    }
}