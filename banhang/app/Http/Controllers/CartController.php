<?php

namespace App\Http\Controllers;

use App\Models\Cart; // Đừng quên thêm model Cart
use App\Models\Product; // Thêm model Product nếu bạn sử dụng
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Xem giỏ hàng
    public function index()
    {
        $user = Auth::user();
        
        // Kiểm tra nếu là admin thì lấy toàn bộ dữ liệu giỏ hàng
        if ($user->role === 'admin') {
            $cartItems = Cart::with('product:id,name,price,image')->get();
        } else {
            // Nếu không phải admin, chỉ lấy giỏ hàng của chính người dùng
            $cartItems = Cart::where('user_id', $user->id)
                ->with('product:id,name,price,image')
                ->get();
        }

        // Kiểm tra xem giỏ hàng có trống không
        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Giỏ hàng trống.'], 200);
        }

        // Trả về dữ liệu giỏ hàng với thông tin sản phẩm
        return response()->json($cartItems->map(function ($item) {
            return [
                'id' => $item->id,
                'user_id' => $item->user_id,
                'product' => [
                    'id' => $item->product->id,
                    'name' => $item->product->name,
                    'price' => $item->product->price,
                    'image' => $item->product->image,
                ],
                'quantity' => $item->quantity,
                'size' => $item->size,
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at,
            ];
        }));
    }


    // Thêm sản phẩm vào giỏ hàng
    public function store(Request $request)
    {
        // Xác thực đầu vào
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'size' => 'required|string|max:50',
        ]);
    
        // Lấy thông tin người dùng đã xác thực
        $user = Auth::user(); // Lấy thông tin người dùng từ token
    
        // Kiểm tra xem người dùng có đăng nhập không
        if (!$user) {
            return response()->json(['message' => 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.'], 401); // 401 Unauthorized
        }
    
        $userId = $user->id; // Lấy ID người dùng đã xác thực
    
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        $cartItem = Cart::where('user_id', $userId)
            ->where('product_id', $request->product_id)
            ->where('size', $request->size)
            ->first();
    
        if ($cartItem) {
            // Cập nhật số lượng nếu sản phẩm đã tồn tại trong giỏ hàng
            $cartItem->quantity += $request->quantity;
            $cartItem->updated_at = now(); // Cập nhật thời gian sửa đổi
            $cartItem->save();
        } else {
            // Thêm sản phẩm mới vào giỏ hàng
            Cart::create([
                'user_id' => $userId,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'size' => $request->size,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    
        return response()->json(['message' => 'Sản phẩm đã được thêm vào giỏ hàng thành công!']);
    }
    
    // Thêm phương thức xóa sản phẩm trong giỏ hàng
    public function destroy(Request $request, $id)
    {
        $user = Auth::user(); // Lấy thông tin người dùng từ token
    
        // Kiểm tra xem người dùng có phải là admin hay không
        if ($user->role === 'admin') {
            // Nếu là admin, tìm sản phẩm theo ID mà không cần kiểm tra user_id
            $cartItem = Cart::find($id);
        } else {
            // Nếu là user, chỉ tìm sản phẩm thuộc về người dùng đó
            $cartItem = Cart::where('user_id', $user->id)->where('id', $id)->first();
        }
    
        // Kiểm tra xem sản phẩm có tồn tại không
        if (!$cartItem) {
            return response()->json(['message' => 'Sản phẩm không tồn tại trong giỏ hàng.'], 404);
        }
    
        // Xóa sản phẩm khỏi giỏ hàng
        $cartItem->delete();
        return response()->json(['message' => 'Sản phẩm đã được xóa khỏi giỏ hàng.']);
    }
    
    public function updateQuantity(Request $request, $id)
    {
        // Xác thực đầu vào
        $request->validate([
            'quantity' => 'required|integer|min:1', // Đảm bảo số lượng phải là số nguyên dương
        ]);
    
        $user = Auth::user(); // Lấy thông tin người dùng từ token
        $userId = $user->id; // Lấy ID người dùng đã xác thực
    
        // Tìm sản phẩm trong giỏ hàng của người dùng
        $cartItem = Cart::where('user_id', $userId)->where('id', $id)->first();
    
        // Kiểm tra xem sản phẩm có trong giỏ hàng không
        if (!$cartItem) {
            return response()->json(['message' => 'Sản phẩm không tồn tại trong giỏ hàng.'], 404);
        }
    
        // Cập nhật số lượng sản phẩm
        $cartItem->quantity = $request->quantity;
        $cartItem->updated_at = now(); // Cập nhật thời gian sửa đổi
        $cartItem->save(); // Lưu lại thay đổi
    
        // Trả về thông tin sản phẩm đã cập nhật
        return response()->json([
            'message' => 'Số lượng sản phẩm đã được cập nhật thành công!',
            'cartItem' => [
                'id' => $cartItem->id,
                'user_id' => $cartItem->user_id,
                'product_id' => $cartItem->product_id,
                'quantity' => $cartItem->quantity,
                'size' => $cartItem->size,
                'created_at' => $cartItem->created_at,
                'updated_at' => $cartItem->updated_at,
            ]
        ]);
    }
    
   
}
