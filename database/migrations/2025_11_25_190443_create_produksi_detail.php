<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('produksi_detail', function (Blueprint $table) {
            $table->id('produksi_detail_id');

            $table->foreignId('produksi_harian_id')
                ->constrained('produksi_harian', 'produksi_harian_id')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreignId('menu_id')
                ->constrained('menus', 'menu_id')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->string('nama_menu');

            // harga integer sesuai dengan menu
            $table->unsignedInteger('harga');

            $table->unsignedInteger('jumlah_porsi');
            $table->unsignedInteger('jumlah_tersisa');

            $table->string('gambar')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('produksi_detail');
    }
};
