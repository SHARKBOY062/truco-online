<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TrucoService;

class GameController extends Controller
{
    public function start(Request $request, TrucoService $service)
    {
        $request->validate([
            'bet_amount' => 'required|numeric|min:1',
            'rtp'        => 'required|integer|min:0|max:100',
        ]);

        $user = $request->user();

        $result = $service->startMatch(
            $user,
            $request->bet_amount,
            $request->rtp
        );

        if (isset($result['error'])) {
            return response()->json(['success' => false, 'message' => $result['error']], 422);
        }

        return response()->json([
            'success' => true,
            'match'   => $result['match'],
            'balance' => $result['user_balance'],
        ]);
    }
}
