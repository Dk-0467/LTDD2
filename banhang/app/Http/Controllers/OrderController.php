<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart; // Thêm mô hình Cart

class OrderController extends Controller
{

    // 1. Lấy thông tin đơn hàng
    public function getOrder($id)
    {
        $order = Order::with(['orderItems', 'user']) // Tải các mục đơn hàng và thông tin người dùng
                      ->find($id);
                         
        if (!$order) {
            return response()->json(['message' => 'Order not found.'], 404);
        }   
        // Lấy tên người dùng
        $order->user_name = $order->user ? $order->user->name : 'Unknown'; // Kiểm tra nếu người dùng tồn tại    
        return response()->json($order);
    }
    

    // 2. Thanh toán giỏ hàng
    public function store(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validated = $request->validate([
            'user_id' => 'required|integer',
        ]);

        // Lấy tất cả sản phẩm trong giỏ hàng của người dùng
        $cartItems = Cart::where('user_id', $validated['user_id'])->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty.'], 400);
        }

        // Tính tổng số tiền từ các sản phẩm trong giỏ hàng
        $totalAmount = 0;
        
        // Tạo đơn hàng
        $order = Order::create([
            'user_id' => $validated['user_id'],
            'total_amount' => 0, // Khởi tạo tổng số tiền là 0
        ]);

        // Tạo các mục đơn hàng từ giỏ hàng
        foreach ($cartItems as $item) {
            if ($item->product && $item->product->price) {
                // Tính tiền cho mỗi mục dựa vào số lượng
                $itemTotal = $item->product->price * $item->quantity; 
                $totalAmount += $itemTotal; // Cộng vào tổng tiền

                // Lưu mục đơn hàng
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                    'size' => $item->size, // Lưu kích thước
                    'total' => $itemTotal, // Lưu tổng tiền cho mỗi mục
                ]);
            }
        }

        // Cập nhật tổng tiền cho đơn hàng
        $order->update(['total_amount' => $totalAmount]);

        // Xóa sản phẩm trong giỏ hàng sau khi thanh toán
        Cart::where('user_id', $validated['user_id'])->delete();

        return response()->json(['message' => 'Order created successfully.'], 201);
    }

 
    // 3. Xóa đơn hàng
    public function destroy($id)
    {
        // Tìm đơn hàng theo ID
        $order = Order::find($id);
        
        // Kiểm tra xem đơn hàng có tồn tại không
        if (!$order) {
            return response()->json(['message' => 'Order not found.'], 404);
        }

        // Xóa các mục đơn hàng liên quan
        $order->orderItems()->delete();

        // Xóa đơn hàng
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully.']);
    }

    
    // 4. Lấy tất cả đơn hàng cho admin hoặc đơn hàng của user
    public function index()
    {
        $user = auth()->user(); // Lấy thông tin người dùng hiện tại

        if ($user->role === 'admin') {
            // Admin có thể xem tất cả đơn hàng
            $orders = Order::with(['orderItems', 'user'])->get();

            // Thêm tên người dùng vào từng đơn hàng
            foreach ($orders as $order) {
                $order->user_name = $order->user ? $order->user->name : 'Unknown';
            }
        } else {
            // User chỉ có thể xem đơn hàng của chính họ
            $orders = Order::with(['orderItems'])
                        ->where('user_id', $user->id)
                        ->get();

            // Thêm tên người dùng vào từng đơn hàng
            foreach ($orders as $order) {
                $order->user_name = $user->name;
            }
        }

        return response()->json($orders);
    }

}
