<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * ============================================
     * REGISTER – Criar nova conta
     * ============================================
     */
    public function register(Request $request)
    {
        $request->validate([
            'name'                  => 'required|string|max:255',
            'cpf'                   => 'required|string|max:14|unique:users',
            'email'                 => 'required|email|unique:users',
            'password'              => 'required|min:6|confirmed',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'cpf'      => $request->cpf,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'balance'  => 0, // saldo inicial
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Usuário registrado com sucesso.',
            'user'    => $user,
            'token'   => $user->createToken('auth')->plainTextToken,
        ], 201);
    }

    /**
     * ============================================
     * LOGIN – Email ou CPF + senha
     * ============================================
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required',
            'password' => 'required',
        ]);

        // login usando email OR cpf
        $user = User::where('email', $request->email)
                    ->orWhere('cpf', $request->email)
                    ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Credenciais inválidas.'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'user'    => $user,
            'token'   => $user->createToken('auth')->plainTextToken,
        ]);
    }

    /**
     * ============================================
     * USER – Retorna o usuário autenticado
     * ============================================
     */
    public function user(Request $request)
    {
        return response()->json([
            'success' => true,
            'user'    => $request->user(),
        ]);
    }

    /**
     * ============================================
     * LOGOUT – Revogar token atual
     * ============================================
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout realizado com sucesso.'
        ]);
    }
}
