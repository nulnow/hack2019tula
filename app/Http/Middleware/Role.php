<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Role
{
    public function handle($request, Closure $next, $roleName)
    {
        if (!Auth::check()) {
            abort(404);
        }
        if (!Auth::user()->hasRole($roleName)) {
            abort(404);
        }
        return $next($request);
    }
}
