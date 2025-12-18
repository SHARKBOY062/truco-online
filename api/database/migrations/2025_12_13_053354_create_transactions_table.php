<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('transactions', function (Blueprint $table) {
        $table->id();

        $table->string('external_id')->nullable()->index(); // id externo (gateway)
        $table->string('reference')->nullable()->index();   // referência interna (pedido etc)

        $table->decimal('amount', 12, 2);

        $table->foreignId('user_id')->constrained()->cascadeOnDelete();

        $table->string('status')->default('pending')->index(); // Pendente ao criar
        $table->string('method')->default('pix')->index();     // PIX

        $table->string('e2e_id')->nullable()->index(); // id e2e do Pix
        $table->timestamp('paid_at')->nullable();

        $table->timestamps(); // created_at / updated_at
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
