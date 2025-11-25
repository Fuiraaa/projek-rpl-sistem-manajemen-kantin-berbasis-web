<?php
// database/migrations/2025_11_22_000001_create_transactions_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Pemilik transaksi
            $table->string('transaction_code')->unique(); // Kode unik: TRX-20251122-0001
            $table->decimal('total_amount', 15, 2); // Total harga semua item
            $table->integer('total_items'); // Total quantity semua item
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};