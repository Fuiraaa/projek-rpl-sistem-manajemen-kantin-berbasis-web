<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->id('menu_id');

            // user_id (indexed + cascade)
            $table->foreignId('user_id')
                ->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->string('nama');

            // harga integer lebih cepat daripada decimal (frontend-friendly)
            $table->unsignedInteger('harga');

            $table->string('gambar')->nullable();

            $table->unsignedInteger('quantity')->default(0);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('menus');
    }
};
