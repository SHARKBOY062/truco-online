<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

use App\Http\Controllers\UserAddressController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\ExtractController;

/*
|--------------------------------------------------------------------------
| API Routes — Autenticação + Perfil + Endereço + Extrato
|--------------------------------------------------------------------------
|
| Rotas de autenticação com Sanctum + Perfil + Endereço + Extrato.
|
*/

/**
 * =====================================================
 *  REGISTER — Criar novo usuário
 * =====================================================
 */
Route::post('/register', function (Request $request) {
    $data = $request->validate([
        'name'     => 'required|string|max:255',
        'cpf'      => 'required|string|max:14|unique:users',
        'email'    => 'required|email|unique:users',
        'password' => 'required|min:6|confirmed',
    ]);

    $user = User::create([
        'name'     => $data['name'],
        'cpf'      => $data['cpf'],
        'email'    => $data['email'],
        'password' => Hash::make($data['password']),
        'balance'  => 0,
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Usuário registrado com sucesso.',
        'user'    => $user,
        'token'   => $user->createToken('auth')->plainTextToken,
    ]);
});


/**
 * =====================================================
 *  LOGIN — Aceita Email OU CPF
 * =====================================================
 */
Route::post('/login', function (Request $request) {

    $request->validate([
        'email'    => 'required',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->email)
                ->orWhere('cpf', $request->email)
                ->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Credenciais inválidas'
        ], 401);
    }

    return response()->json([
        'success' => true,
        'user'    => $user,
        'token'   => $user->createToken('auth')->plainTextToken,
    ]);
});


/**
 * =====================================================
 *  ROTAS PROTEGIDAS — Requer Token Sanctum
 * =====================================================
 */
Route::middleware('auth:sanctum')->group(function () {

    /** Retorna dados do usuário autenticado */
    Route::get('/user', function (Request $request) {
        return response()->json([
            'success' => true,
            'user'    => $request->user(),
        ]);
    });

    /** Logout */
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'success' => true,
            'message' => 'Logout realizado com sucesso.',
        ]);
    });

    /**
     * PERFIL — Atualizar telefone + nascimento (somente 1 vez)
     */
    Route::post('/profile/basic', [UserProfileController::class, 'updateBasic']);

    /**
     * ENDEREÇO — buscar & salvar
     */
    Route::get('/address', [UserAddressController::class, 'get']);
    Route::post('/address', [UserAddressController::class, 'save']);

    /**
     * BUSCA DE CEP — ViaCEP
     */
    Route::post('/cep-lookup', [UserAddressController::class, 'lookupCep']);

    /**
     * EXTRATO — Dados financeiros do usuário
     */
    Route::get('/extract', [ExtractController::class, 'index']);
});
