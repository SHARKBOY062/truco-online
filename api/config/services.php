<?php

return [

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | PixionPay
    |--------------------------------------------------------------------------
    | Auth headers exigidos:
    | X-Auth-Key e X-Secret-Key
    | Base URL: https://app.pixionpay.com/api
    */
    'pixionpay' => [
        'base_url'      => env('PIXIONPAY_BASE_URL', 'https://app.pixionpay.com/api'),
        'auth_key'      => env('PIXIONPAY_AUTH_KEY'),
        'secret_key'    => env('PIXIONPAY_SECRET_KEY'),
        'webhook_token' => env('PIXIONPAY_WEBHOOK_TOKEN'),
        'webhook_path'  => env('PIXIONPAY_WEBHOOK_PATH', '/api/webhooks/pixionpay'),
    ],

];
