<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pengeluarans', function (Blueprint $table) {
            $table->id('pengeluaran_id');
            // Relasi ke user (pemilik usaha/admin)
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            $table->string('deskripsi'); // Contoh: "Bayar Listrik", "Beli Tepung"
            $table->bigInteger('jumlah'); // Nominal pengeluaran
            $table->date('tanggal_pengeluaran'); // Tanggal pengeluaran
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pengeluarans');
    }
};