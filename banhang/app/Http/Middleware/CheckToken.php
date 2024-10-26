<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra token có tồn tại hay không
        if (!$request->bearerToken()) {
            return response()->json(['message' => 'Unauthorized'], 401); // Trả về nếu không có token
        }

        // Xác thực người dùng từ token (cần cài đặt auth:sanctum trong Kernel.php)
        if (Auth::check()) {
            $user = Auth::user();

            // Cho phép admin có toàn quyền truy cập
            if ($user->role === 'admin') {
                return $next($request);
            }

            // Người dùng thông thường chỉ được phép xem (GET requests)
            if ($user->role === 'user' && $request->isMethod('get')) {
                return $next($request); // Cho phép người dùng xem
            }

            // Từ chối các phương thức không phải GET (POST, PUT, DELETE) cho user thường
            return response()->json(['message' => 'Bạn không có quyền thực hiện thao tác này.'], 403); // 403 Forbidden
        }

        // Nếu người dùng không được xác thực
        return response()->json(['message' => 'Unauthorized'], 401); // 401 Unauthorized
    }
}
