<?php

namespace App\Services;

use App\Models\User;
use App\Models\GameMatch;
use App\Models\GameSetting;

class TrucoService
{
    /**
     * Inicia uma partida com aposta e cálculo de vitória baseado no RTP GLOBAL.
     */
    public function startMatch(User $user, float $betAmount)
    {
        // 1. Buscar RTP configurado no painel Filament
        $settings = GameSetting::first();
        $rtp = $settings->rtp ?? 50; // fallback caso não exista config

        // 2. Validação de saldo
        if ($user->balance < $betAmount) {
            return ['error' => 'Saldo insuficiente'];
        }

        // 3. Remove o valor da aposta imediatamente
        $user->balance -= $betAmount;
        $user->save();

        // 4. Bot decide baseado no RTP GLOBAL
        $decision = $this->botDecision($rtp);

        $botRan  = $decision['bot_ran'];
        $userWon = $decision['user_won'];

        // 5. Se o usuário ganhou → recebe o dobro
        $finalPrize = $userWon ? ($betAmount * 2) : 0;

        if ($userWon) {
            $user->balance += $finalPrize;
            $user->save();
        }

        // 6. Registrar partida
        $match = GameMatch::create([
            'user_id'    => $user->id,
            'bet_amount' => $betAmount,
            'bot_ran'    => $botRan,
            'user_won'   => $userWon,
            'rtp_used'   => $rtp, // salva o RTP do painel
            'bot_data'   => $decision,
        ]);

        return [
            'success'      => true,
            'match'        => $match,
            'user_balance' => $user->balance,
        ];
    }


    /**
     * Lógica do bot reagindo ao "TRUCO"
     * RTP 100 → usuário SEMPRE ganha
     * RTP 50  → 50% chance de ganhar
     * RTP 0   → usuário NUNCA ganha
     */
    private function botDecision(int $rtp)
    {
        $roll = rand(1, 100);  // número aleatório 1 a 100

        // vitória depende do RTP global
        $userWins = $roll <= $rtp;

        return [
            'random_value'     => $roll,
            'chance_user_win'  => $rtp,
            'user_won'         => $userWins,
            'bot_ran'          => $userWins ? true : false, // se perderia → bot corre
        ];
    }
}
