import React, { useState, useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/react";

import Layout from "../components/Layout";
import kalender from "../../images/kalender.png";

export default function Index() {
    const { produksi_harian, auth } = usePage().props; // ✅ TAMBAH auth
    const [cart, setCart] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [produksiDetail, setProduksiDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduksiHarianId, setSelectedProduksiHarianId] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { post, data, setData, processing } = useForm({
        produksi_harian_id: "",
        tanggal_transaksi: new Date().toISOString().split('T')[0],
        items: []
    });

    // ✅ RESET STATE SETIAK KOMPONEN DIMUAT
    useEffect(() => {
        console.log('🔄 Resetting state for new user:', auth.user?.id);
        setCart([]);
        setSelectedDate("");
        setProduksiDetail([]);
        setSelectedProduksiHarianId("");
        setData({
            produksi_harian_id: "",
            tanggal_transaksi: new Date().toISOString().split('T')[0],
            items: []
        });
    }, []); // ✅ Empty dependency array = reset on mount

    // ✅ FUNGSI UNTUK MENDAPATKAN CSRF TOKEN
    const getCsrfToken = () => {
        const metaToken = document.querySelector('meta[name="csrf-token"]')?.content;
        const inputToken = document.querySelector('input[name="_token"]')?.value;
        const windowToken = window.csrfToken;
        
        return metaToken || inputToken || windowToken;
    };

    // Handle date change - filter produksi harian by date
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setLoading(true);
        
        const produksi = produksi_harian.find(ph => ph.tanggal_produksi === date);
        
        if (produksi) {
            setSelectedProduksiHarianId(produksi.produksi_harian_id);
            setProduksiDetail(produksi.produksi_detail || []);
            setData("produksi_harian_id", produksi.produksi_harian_id);
        } else {
            setSelectedProduksiHarianId("");
            setProduksiDetail([]);
            setData("produksi_harian_id", "");
        }
        
        setLoading(false);
    };

    // Get unique dates for dropdown
    const availableDates = [...new Set(produksi_harian.map(ph => ph.tanggal_produksi))].sort().reverse();

    // Add item ke cart
    const addToCart = (item) => {
        if (item.qty >= item.jumlah_tersisa) {
            alert('Stok tidak mencukupi!');
            return;
        }

        setCart((prev) => {
            const exist = prev.find((i) => i.produksi_detail_id === item.produksi_detail_id);

            if (exist) {
                if (exist.qty >= item.jumlah_tersisa) {
                    alert('Stok tidak mencukupi!');
                    return prev;
                }
                return prev.map((i) =>
                    i.produksi_detail_id === item.produksi_detail_id
                        ? { ...i, qty: i.qty + 1 }
                        : i
                );
            }

            return [...prev, { 
                ...item, 
                qty: 1,
                jumlah_tersisa: item.jumlah_tersisa 
            }];
        });
    };

    // Remove item dari cart
    const removeFromCart = (item) => {
        setCart((prev) => {
            const exist = prev.find((i) => i.produksi_detail_id === item.produksi_detail_id);

            if (!exist) return prev;

            if (exist.qty === 1) {
                return prev.filter((i) => i.produksi_detail_id !== item.produksi_detail_id);
            }

            return prev.map((i) =>
                i.produksi_detail_id === item.produksi_detail_id
                    ? { ...i, qty: i.qty - 1 }
                    : i
            );
        });
    };

    // ✅ SUBMIT TRANSAKSI 
    const submit = async () => {
        if (cart.length === 0) {
            alert('Keranjang kosong!');
            return;
        }

        if (!selectedProduksiHarianId) {
            alert('Pilih tanggal produksi terlebih dahulu!');
            return;
        }

        setSubmitting(true);

        const formData = {
            produksi_harian_id: selectedProduksiHarianId,
            tanggal_transaksi: data.tanggal_transaksi,
            items: cart.map((item) => ({
                produksi_detail_id: item.produksi_detail_id,
                nama_menu: item.nama_menu,
                harga_satuan: item.harga,
                jumlah: item.qty,
            })),
        };

        console.log('🔍 Data yang dikirim:', formData);

        try {
            const csrfToken = getCsrfToken();
            
            if (!csrfToken) {
                alert('CSRF token tidak ditemukan! Silakan refresh halaman.');
                setSubmitting(false);
                return;
            }

            const response = await fetch('/transaksi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const contentType = response.headers.get('content-type');

            if (response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const result = await response.json();
                    console.log('✅ Success Response:', result);
                    
                    alert('Transaksi berhasil! ID: ' + (result.transaksi_id || ''));
                    setCart([]);
                    router.reload();
                } else {
                    const text = await response.text();
                    console.log('📝 Response text:', text);
                    
                    alert('Transaksi berhasil!');
                    setCart([]);
                    router.reload();
                }
            } else {
                if (contentType && contentType.includes('application/json')) {
                    const error = await response.json();
                    console.error('❌ Error Response:', error);
                    alert('Transaksi gagal: ' + (error.message || 'Unknown error'));
                } else {
                    const errorText = await response.text();
                    console.error('❌ Error Text:', errorText);
                    alert('Transaksi gagal. Status: ' + response.status);
                }
            }

        } catch (error) {
            console.error('❌ Fetch Error:', error);
            alert('Terjadi error jaringan: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Layout>
            <div className="flex items-center gap-2 mb-4 font-bold">
                <img src={kalender} alt="kalender" className="w-4 h-4 relative top-[1px]" />
                <p>Transaksi</p>
            </div>

            {/* Tanggal Transaksi */}
            <div className="bg-white border border-pink-300 mb-4 p-4 rounded-lg shadow-md shadow-pink-200/50">
                <label className="block text-sm font-medium mb-2">Tanggal Transaksi</label>
                <input
                    type="date"
                    className="rounded px-2 py-1 w-full border border-gray-300"
                    value={data.tanggal_transaksi}
                    onChange={(e) => setData("tanggal_transaksi", e.target.value)}
                />
            </div>

            {/* Filter Tanggal Produksi */}
            <div className="bg-white border border-pink-300 mb-4 p-4 rounded-lg shadow-md shadow-pink-200/50">
                <label className="block text-sm font-medium mb-2">Pilih Tanggal Produksi</label>
                <select
                    className="rounded px-2 py-1 w-full border border-gray-300"
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    disabled={submitting}
                >
                    <option value="">Pilih Tanggal Produksi</option>
                    {availableDates.map(date => (
                        <option key={date} value={date}>
                            {new Date(date).toLocaleDateString('id-ID')}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex w-full h-screen gap-4 p-4">
                
                {/* MENU LIST */}
                <div
                    className={`bg-white p-6 rounded-lg shadow-md flex-1 overflow-y-auto transition-all duration-300 ${
                        cart.length > 0 ? "w-[68%]" : "w-full"
                    }`}
                >
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <p>Loading...</p>
                        </div>
                    ) : !selectedDate ? (
                        <div className="flex justify-center items-center h-32">
                            <p className="text-gray-500">Pilih tanggal produksi untuk melihat menu</p>
                        </div>
                    ) : produksiDetail.length === 0 ? (
                        <div className="flex justify-center items-center h-32">
                            <p className="text-gray-500">Tidak ada menu yang diproduksi pada tanggal ini</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
                            {produksiDetail.map((item) => (
                                <div
                                    key={item.produksi_detail_id}
                                    onClick={() => item.jumlah_tersisa > 0 && addToCart({
                                        produksi_detail_id: item.produksi_detail_id,
                                        nama_menu: item.nama_menu,
                                        harga: item.harga,
                                        img: item.gambar,
                                        jumlah_tersisa: item.jumlah_tersisa
                                    })}
                                    className={`cursor-pointer transition rounded-xl shadow p-3 w-36 flex flex-col items-center ${
                                        item.jumlah_tersisa > 0 
                                            ? 'bg-pink-100 hover:bg-pink-200' 
                                            : 'bg-gray-100 opacity-50'
                                    }`}
                                >
                                    <img 
                                        src={item.gambar} 
                                        className="w-12 h-12 rounded-lg object-cover" 
                                        alt={item.nama_menu}
                                        onError={(e) => {
                                            e.target.src = '/images/placeholder-food.png';
                                        }}
                                    />
                                    <p className="font-bold text-sm mt-1 text-center">{item.nama_menu}</p>
                                    <p className="text-xs text-gray-600">
                                        Rp. {item.harga?.toLocaleString()}
                                    </p>
                                    <p className={`text-xs mt-1 ${
                                        item.jumlah_tersisa > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        Stok: {item.jumlah_tersisa}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* CART */}
                {cart.length > 0 && (
                    <div className="w-[32%] bg-white rounded-lg shadow-md p-4 flex flex-col">
                        <h3 className="font-bold text-lg mb-4">Keranjang</h3>
                        
                        <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px] pr-2">
                            {cart.map((item) => (
                                <div
                                    key={item.produksi_detail_id}
                                    className="flex items-center gap-3 bg-pink-50 border border-pink-500 rounded-lg p-3 shadow-sm"
                                >
                                    <img 
                                        src={item.img} 
                                        className="w-10 h-10 rounded-md object-cover" 
                                        alt={item.nama_menu}
                                        onError={(e) => {
                                            e.target.src = '/images/placeholder-food.png';
                                        }}
                                    />
                                    <div className="flex-1">
                                        <p className="font-bold text-sm">{item.nama_menu}</p>
                                        <p className="text-xs text-gray-600">
                                            Rp. {item.harga.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-green-600">
                                            Stok: {item.jumlah_tersisa}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => removeFromCart(item)}
                                            className="px-2 py-1 bg-pink-200 rounded hover:bg-pink-300 transition"
                                            disabled={submitting}
                                        >
                                            –
                                        </button>

                                        <span className="px-3 font-medium">{item.qty}</span>

                                        <button
                                            onClick={() => addToCart(item)}
                                            disabled={item.qty >= item.jumlah_tersisa || submitting}
                                            className={`px-2 py-1 rounded transition ${
                                                item.qty >= item.jumlah_tersisa || submitting
                                                    ? 'bg-gray-200 cursor-not-allowed'
                                                    : 'bg-pink-200 hover:bg-pink-300'
                                            }`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-6 border-t flex items-center justify-between gap-2">
                            <div>
                                <p className="text-sm text-gray-500">
                                    {cart.reduce((sum, i) => sum + i.qty, 0)} item
                                </p>
                                <p className="text-xl font-bold text-pink-600">
                                    Rp.{" "}
                                    {cart
                                        .reduce((sum, i) => sum + i.harga * i.qty, 0)
                                        .toLocaleString()}
                                </p>
                            </div>

                            <button
                                onClick={submit}
                                disabled={submitting}
                                className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Memproses...' : 'Buat Pesanan'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}