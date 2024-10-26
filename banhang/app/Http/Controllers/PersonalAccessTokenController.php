<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PersonalAccessToken; // Đảm bảo import model
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class PersonalAccessTokenController extends Controller
{
    public function index()
    {
        // Lấy tất cả các token
        $tokens = SanctumPersonalAccessToken::all();
        return response()->json($tokens);
    }

    public function show($id)
    {
        // Lấy token theo ID
        $token = SanctumPersonalAccessToken::find($id);
        if (!$token) {
            return response()->json(['message' => 'Token not found'], 404);
        }
        return response()->json($token);
    }
}
