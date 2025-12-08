<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
    Schema::create('transaksis', function (Blueprint $table) {
        $table->id('transaksi_id');
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

        // FIXED ↓↓↓
        $table->foreignId('produksi_harian_id')
            ->constrained('produksi_harian', 'produksi_harian_id')
            ->onDelete('cascade');

        $table->date('tanggal_transaksi');
        $table->time('waktu_transaksi');
        $table->integer('total_porsi');
        $table->integer('total_harga');

        $table->timestamps();
    });

    }

    public function down()
    {
        Schema::dropIfExists('transaksis');
    }
};
