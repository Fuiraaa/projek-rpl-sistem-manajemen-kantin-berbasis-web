<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('transaksi_detail', function (Blueprint $table) {
            $table->id('transaksi_detail_id');

            // FK: transaksi_id → transaksis.transaksi_id
            $table->foreignId('transaksi_id')
                ->constrained('transaksis', 'transaksi_id')
                ->onDelete('cascade');

            // FK: produksi_detail_id → produksi_details.produksi_detail_id
            $table->foreignId('produksi_detail_id')
                ->constrained('produksi_detail', 'produksi_detail_id')
                ->onDelete('cascade');

            $table->string('nama_menu');
            $table->integer('harga');
            $table->integer('jumlah');
            $table->integer('subtotal');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('transaksi_detail');
    }
};
