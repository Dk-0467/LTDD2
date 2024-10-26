<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // Lấy tất cả người dùng
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Lấy người dùng theo ID
    public function show($id)
    {
        // Tìm người dùng theo ID
        $user = User::select('id', 'username', 'email', 'password', 'created_at', 'updated_at', 'phone')->find($id);

        // Kiểm tra nếu người dùng tồn tại
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Trả về thông tin người dùng
        return response()->json($user);
    }

    // Tạo người dùng mới
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        $request['password'] = Hash::make($request['password']);
        
        $user = User::create($request->all());
        return response()->json($user, 201);
    }

    // Cập nhật thông tin người dùng
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $request->validate([
            'name' => 'nullable|string|max:100',
            'email' => 'nullable|string|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
        ]);

        // Cập nhật mật khẩu nếu có
        if ($request->has('password')) {
            $request['password'] = Hash::make($request['password']);
        }

        $user->update($request->all());
        return response()->json($user);
    }

    // Xóa người dùng
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

        // Đăng ký người dùng
        public function register(Request $request)
        {
            $validator = Validator::make($request->all(), [
                'username' => 'required|string|max:255|unique:users',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'phone' => 'required|string|max:15|unique:users',
                'role' => 'nullable|in:user,admin', // Thêm role vào danh sách validation
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            // Mã hóa mật khẩu
            $request['password'] = Hash::make($request['password']);

            // Tạo người dùng mới với các trường cần thiết
            $user = User::create($request->only(['username', 'email', 'password', 'phone', 'role'])); // Thêm role

            return response()->json(['user' => $user->only(['id', 'username', 'email', 'phone', 'role', 'created_at', 'updated_at'])], 201);
        }

        
    // Đăng nhập người dùng
    public function login(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'login' => 'required|string', // Username hoặc email
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Tìm người dùng theo email hoặc username
        $user = User::where('email', $request->login)
                    ->orWhere('username', $request->login)
                    ->first();

        // Kiểm tra thông tin đăng nhập
        if ($user && Hash::check($request->password, $user->password)) {
            // Tạo token cho người dùng
            $token = $user->createToken('YourAppName')->plainTextToken;

            return response()->json(['user' => $user->only(['id', 'username', 'email', 'created_at', 'updated_at']), 'token' => $token], 200);
        } else {
            return response()->json(['message' => 'Thông tin đăng nhập không chính xác.'], 401);
        }
    }

    public function loginAdmin(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'login' => 'required|string', // Username hoặc email
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Tìm người dùng theo email hoặc username
        $user = User::where('email', $request->login)
                    ->orWhere('username', $request->login)
                    ->first();

        // Kiểm tra thông tin đăng nhập và quyền truy cập
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                // Kiểm tra nếu user có role là admin
                if ($user->role === 'admin') {
                    // Tạo token cho admin
                    $token = $user->createToken('AdminToken')->plainTextToken;

                    return response()->json([
                        'user' => $user->only(['id', 'username', 'email', 'created_at', 'updated_at', 'phone', 'role']),
                        'token' => $token
                    ], 200);
                } elseif ($user->role === 'user') {
                    // Người dùng thường chỉ có quyền xem
                    $token = $user->createToken('UserToken')->plainTextToken;

                    return response()->json([
                        'user' => $user->only(['id', 'username', 'email', 'created_at', 'updated_at', 'phone', 'role']),
                        'token' => $token,
                        'message' => 'Bạn chỉ có quyền xem.'
                    ], 200);
                }
            } else {
                return response()->json(['message' => 'Thông tin đăng nhập không chính xác.'], 401); // 401 Unauthorized
            }
        } else {
            return response()->json(['message' => 'Thông tin đăng nhập không chính xác.'], 401); // 401 Unauthorized
        }
    }


}
