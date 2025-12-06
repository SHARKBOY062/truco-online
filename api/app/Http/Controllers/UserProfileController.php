<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class UserProfileController extends Controller
{
    /**
     * Atualiza telefone e data de nascimento (somente 1 vez)
     */
    public function updateBasic(Request $request)
    {
        $user = $request->user();

        // Se já houver ambos os dados, bloqueia edição
        if (!empty($user->phone) && !empty($user->birthdate)) {
            return response()->json([
                'success' => false,
                'message' => 'Essas informações já foram cadastradas e não podem ser alteradas.'
            ], 403);
        }

        // Data mínima para ter 18 anos
        $minDate = Carbon::now()->subYears(18)->format('Y-m-d');

        // Validação
        $data = $request->validate([
            'phone'     => 'required|string|max:20',
            'birthdate' => "required|date|before_or_equal:$minDate",
        ], [
            'birthdate.before_or_equal' => 'Você precisa ter pelo menos 18 anos.',
        ]);

        // Atualiza APENAS os campos vazios
        $updateData = [
            'phone'     => $user->phone ?: $data['phone'],
            'birthdate' => $user->birthdate ?: $data['birthdate'],
        ];

        $user->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'Dados cadastrados com sucesso.',
            'user'    => $user->fresh(), // ← retorna dados atualizados corretamente
        ]);
    }
}
