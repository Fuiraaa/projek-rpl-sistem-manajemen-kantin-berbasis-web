<?php
// database/migrations/2025_11_22_000002_create_transaction_items_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transaction_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained()->onDelete('cascade'); // Relasi ke transactions
            $table->foreignId('menu_id')->constrained()->onDelete('cascade'); // Relasi ke menu yang dibeli
            $table->string('menu_name'); // Nama menu (disimpan untuk archive)
            $table->decimal('menu_price', 10, 2); // Harga menu saat transaksi (disimpan untuk archive)
            $table->integer('quantity'); // Jumlah yang dibeli
            $table->decimal('subtotal', 10, 2); // Harga * quantity
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transaction_items');
    }
};