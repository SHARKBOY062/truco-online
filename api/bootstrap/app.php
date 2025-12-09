<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )

    ->withMiddleware(function (Middleware $middleware): void {

        /**
         * ---------------------------------------------------------
         *  🔥 MIDDLEWARE GLOBAL — CORS
         * ---------------------------------------------------------
         */
        $middleware->prepend(\App\Http\Middleware\CorsMiddleware::class);

        /**
         * ---------------------------------------------------------
         *  GRUPO API — Stateless (sem sessão, sem CSRF)
         * ---------------------------------------------------------
         */
        $middleware->group('api', [
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);

        // IMPORTANTE:
        // NÃO adicionar session, csrf ou EnsureFrontendRequestsAreStateful no grupo API
    })

    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })

    ->create();
