<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController; // Thêm dòng này để sử dụng UserController
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('login');
});

