<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('financial_operations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // deposit / withdraw / bet / win / loss
            $table->string('type');

            // valor da operação
            $table->decimal('amount', 12, 2);

            // detalhes (opcional)
            $table->string('description')->nullable();

            // usado nas apostas
            $table->string('game_mode')->nullable(); // Ex: Truco Paulista, Goiano...

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('financial_operations');
    }
};
