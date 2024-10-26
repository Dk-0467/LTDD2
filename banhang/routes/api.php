<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\PersonalAccessTokenController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route cho personal_access_tokens
Route::middleware('auth:api')->get('/validate-token', function (Request $request) {
    return response()->json(['valid' => true]);
});

// Route xem giỏ hàng
//cart
Route::middleware('auth:api')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cartadd', [CartController::class, 'store']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    Route::put('/cart/{id}/update-quantity', [CartController::class, 'updateQuantity']);

});

Route::get('/products', [ProductController::class, 'index']); // Lấy tất cả sản phẩm
Route::get('/products/{id}', [ProductController::class, 'show']); // Lấy sản phẩm theo ID
Route::post('/products', [ProductController::class, 'store']); // Tạo sản phẩm mới
Route::put('/products/{id}', [ProductController::class, 'update']); // Cập nhật sản phẩm
Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Xóa sản phẩm

Route::get('/categories', [CategoryController::class, 'indexUser']); // Lấy tất cả danh mục
Route::get('/categories/{id}', [CategoryController::class, 'show']); // Lấy danh mục theo ID
Route::post('/categories', [CategoryController::class, 'store']); // Tạo danh mục mới
Route::put('/categories/{id}', [CategoryController::class, 'update']); // Cập nhật danh mục
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']); // Xóa danh mục

Route::middleware('auth:api')->group(function () {
    Route::get('/orders', [OrderController::class, 'index']); // Xem tất cả đơn hàng
    Route::get('/orders/{id}', [OrderController::class, 'getOrder']); // Xem đơn hàng cụ thể
    Route::post('/orderspay', [OrderController::class, 'store']); // Thanh toán giỏ hàng
});
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']); // Xóa đơn hàng

Route::get('/order-items/{userId}', [OrderItemController::class, 'getOrderItemsByUserId']);
Route::delete('order-items/{orderItemId}/{userId}', [OrderItemController::class, 'deleteOrderItemByIdAndUserId']);

Route::get('/users', [UserController::class, 'index']); // Lấy tất cả người dùng
Route::get('/users/show/{id}', [UserController::class, 'show']); // Lấy người dùng theo ID
Route::post('/users/store', [UserController::class, 'store']); // Tạo người dùng mới
Route::put('/users/{id}', [UserController::class, 'update']); // Cập nhật thông tin người dùng
Route::delete('/users/{id}', [UserController::class, 'destroy']); // Xóa người dùng

Route::post('/register', [UserController::class, 'register']); // Đăng ký người dùng
Route::post('/login', [UserController::class, 'login']); // Đăng nhập người dùng

Route::post('/admin/login', [UserController::class, 'loginAdmin']); // Đường dẫn đăng nhập admin
