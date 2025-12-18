<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

use App\Http\Controllers\UserAddressController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\ExtractController;

use App\Http\Controllers\Api\DepositController;
use App\Http\Controllers\Api\WithdrawController;
use App\Http\Controllers\Api\PixionPayWebhookController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Auth, Perfil, Endereço, Extrato, PIX IN/OUT e Webhooks
*/

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/
Route::post('/register', function (Request $request) {
    $data = $request->validate([
        'name'     => 'required|string|max:255',
        'cpf'      => 'required|string|max:14|unique:users,cpf',
        'email'    => 'required|email|unique:users,email',
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
        'user'    => $user,
        'token'   => $user->createToken('auth')->plainTextToken,
    ]);
});

Route::post('/login', function (Request $request) {
    $request->validate([
        'email'    => 'required|string',
        'password' => 'required|string',
    ]);

    $user = User::where('email', $request->email)
        ->orWhere('cpf', $request->email)
        ->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Credenciais inválidas',
        ], 401);
    }

    return response()->json([
        'success' => true,
        'user'    => $user,
        'token'   => $user->createToken('auth')->plainTextToken,
    ]);
});

/*
|--------------------------------------------------------------------------
| WEBHOOKS PIXIONPAY (SEM AUTH)
|--------------------------------------------------------------------------
| Proteção via X-Webhook-Token
| URLs SEPARADAS (IN / OUT)
*/
Route::post('/webhooks/pixionpay/in',  [PixionPayWebhookController::class, 'handleIn']);
Route::post('/webhooks/pixionpay/out', [PixionPayWebhookController::class, 'handleOut']);

/*
|--------------------------------------------------------------------------
| ROTAS PROTEGIDAS (auth:sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', fn (Request $r) => response()->json([
        'success' => true,
        'user' => $r->user()
    ]));

    Route::post('/logout', function (Request $r) {
        $r->user()->currentAccessToken()->delete();
        return response()->json(['success' => true]);
    });

    Route::post('/profile/basic', [UserProfileController::class, 'updateBasic']);

    Route::get('/address', [UserAddressController::class, 'get']);
    Route::post('/address', [UserAddressController::class, 'save']);
    Route::post('/cep-lookup', [UserAddressController::class, 'lookupCep']);

    Route::get('/extract', [ExtractController::class, 'index']);

    Route::post('/deposits/pix',  [DepositController::class, 'pix']);
    Route::post('/withdraws/pix', [WithdrawController::class, 'out']);
});
