<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_matches', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Valor apostado
            $table->decimal('bet_amount', 10, 2);

            // Se o bot correu no truco
            $table->boolean('bot_ran')->default(false);

            // Se o usuário venceu (true/false)
            // Quando bot corre, isso sempre será true
            $table->boolean('user_won')->nullable();

            // RTP utilizado na partida
            $table->integer('rtp_used');

            // Dados extras do bot
            $table->json('bot_data')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_matches');
    }
};
