<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            // se já existir, comente o que já tiver
            if (!Schema::hasColumn('transactions', 'external_id')) {
                $table->string('external_id')->nullable()->index();
            }

            if (!Schema::hasColumn('transactions', 'status')) {
                $table->string('status', 32)->default('pending')->index();
            }

            if (!Schema::hasColumn('transactions', 'method')) {
                $table->string('method', 32)->default('pix')->index();
            }

            if (!Schema::hasColumn('transactions', 'e2e_id')) {
                $table->string('e2e_id')->nullable()->index();
            }

            if (!Schema::hasColumn('transactions', 'paid_at')) {
                $table->timestamp('paid_at')->nullable();
            }

            if (!Schema::hasColumn('transactions', 'meta')) {
                $table->json('meta')->nullable();
            }
        });

        // ideal: external_id único por transação (evita duplicar)
        // se você já tem duplicados, ajuste antes
        Schema::table('transactions', function (Blueprint $table) {
            // tente criar unique (se já existir, pode dar erro)
            // se der erro, você remove duplicados e cria depois
            // $table->unique('external_id');
        });
    }

    public function down(): void
    {
        // normalmente não precisa reverter em prod
    }
};
