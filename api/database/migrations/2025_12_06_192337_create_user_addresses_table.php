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
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->id();

            // Relacionamento com users
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Endereço
            $table->string('zip', 9);          // CEP
            $table->string('street');          // Logradouro
            $table->string('number');          // Número
            $table->string('complement')->nullable(); // Complemento
            $table->string('district');        // Bairro
            $table->string('city');            // Cidade
            $table->string('state', 2);        // Estado (UF)
            $table->string('country')->default('Brasil');

            // Campos de controle
            $table->boolean('is_locked')->default(false); 
            // true = endereço enviado / não pode mudar

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_addresses');
    }
};
