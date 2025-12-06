<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
// use Filament\Models\Contracts\HasAvatar; // opcional
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements FilamentUser // , HasAvatar (se quiser usar avatar)
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Campos liberados para criação e atualização.
     */
    protected $fillable = [
        'name',
        'cpf',
        'email',
        'password',
        'balance',
        'is_blocked', // 🚀 novo campo
    ];

    /**
     * Campos ocultos no retorno JSON.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Conversões automáticas de tipos.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'balance'           => 'float',
            'is_blocked'        => 'boolean', // 🚀 cast
        ];
    }

    /**
     * =====================================================
     * BLOQUEIO — impede acesso ao painel caso esteja bloqueado
     * =====================================================
     */
    public function canAccessPanel(Panel $panel): bool
    {
        if ($this->is_blocked) {
            return false; // 🚫 usuário bloqueado NÃO acessa o painel
        }

        return true; // qualquer usuário autenticado pode acessar
    }

    /**
     * =====================================================
     * RELACIONAMENTO — Endereço do usuário (1:1)
     * =====================================================
     */
    public function address()
    {
        return $this->hasOne(UserAddress::class);
    }

    /**
     * =====================================================
     * AVATAR PERSONALIZADO (opcional)
     * =====================================================
     */
    /*
    public function getFilamentAvatarUrl(): ?string
    {
        return $this->avatar_url ?? null;
    }
    */
}
