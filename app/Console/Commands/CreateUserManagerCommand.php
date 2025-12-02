<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreateUserManagerCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'create user manager if not exist';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        User::firstOrCreate(
            ['email' => 'fortinamuteba@gmail.com'],
            [
                'name' => 'Muteba',
                'password' => 'demo123',
                'email_verified_at' => now(),
            ]
        );
    }
}
