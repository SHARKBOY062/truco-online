<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('deposits', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // IDs do seu sistema / gateway
            $table->string('external_id')->unique();              // seu id (o que você mandou no create)
            $table->unsignedBigInteger('gateway_transaction_id')->nullable(); // transaction_id do webhook
            $table->string('txid')->nullable();
            $table->string('e2e')->nullable();

            $table->string('currency', 8)->default('BRL');
            $table->string('method', 32)->default('pix');
            $table->string('direction', 8)->default('in');

            $table->decimal('amount', 14, 2);
            $table->decimal('fee', 14, 2)->default(0);

            $table->string('status', 32)->default('PENDING'); // PENDING|PAID|CANCELED|...
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('canceled_at')->nullable();

            $table->json('raw_payload')->nullable(); // salva o webhook bruto

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('deposits');
    }
};
