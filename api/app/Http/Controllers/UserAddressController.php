<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserAddress;
use Illuminate\Support\Facades\Http;

class UserAddressController extends Controller
{
    /**
     * Retorna endereço salvo do usuário logado
     */
    public function get(Request $request)
    {
        $address = UserAddress::where('user_id', $request->user()->id)->first();

        return response()->json([
            'success' => true,
            'address' => $address
        ]);
    }

    /**
     * Salva endereço somente uma vez e bloqueia
     */
    public function save(Request $request)
    {
        $user = $request->user();

        $existing = UserAddress::where('user_id', $user->id)->first();

        if ($existing && $existing->is_locked) {
            return response()->json([
                'success' => false,
                'message' => 'Endereço já enviado e está bloqueado.'
            ], 403);
        }

        $data = $request->validate([
            'zip'        => 'required|string|max:9',
            'street'     => 'required|string',
            'number'     => 'required|string',
            'district'   => 'required|string',
            'city'       => 'required|string',
            'state'      => 'required|string|max:2',
            'country'    => 'required|string',
            'complement' => 'nullable|string',
        ]);

        $address = UserAddress::updateOrCreate(
            ['user_id' => $user->id],
            array_merge($data, ['is_locked' => true])
        );

        return response()->json([
            'success' => true,
            'message' => 'Endereço salvo e bloqueado.',
            'address' => $address
        ]);
    }

    /**
     * Consulta CEP via ViaCEP API
     */
    public function lookupCep(Request $request)
    {
        $request->validate([
            'cep' => 'required|string'
        ]);

        $cep = preg_replace('/\D/', '', $request->cep);

        if (strlen($cep) < 8) {
            return response()->json([
                'success' => false,
                'message' => 'CEP inválido.'
            ], 422);
        }

        try {
            $response = Http::get("https://viacep.com.br/ws/{$cep}/json/");

            if ($response->failed() || isset($response->json()['erro'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'CEP não encontrado.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data'    => $response->json(),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao consultar CEP.'
            ], 500);
        }
    }
}
