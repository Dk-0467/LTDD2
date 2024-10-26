<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}"> <!-- Thêm CSS nếu cần -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"> <!-- Bootstrap CSS -->
    <style>
        body {
            background-color: #f8f9fa; /* Màu nền nhẹ */
        }
        .container {
            max-width: 400px; /* Giới hạn chiều rộng của form */
            margin-top: 100px; /* Căn giữa theo chiều dọc */
            padding: 30px;
            background-color: #ffffff; /* Màu nền trắng cho form */
            border-radius: 10px; /* Bo tròn góc cho form */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Đổ bóng cho form */
        }
        h1 {
            font-size: 24px; /* Kích thước tiêu đề */
            margin-bottom: 20px; /* Khoảng cách dưới tiêu đề */
        }
        .btn-primary {
            width: 100%; /* Nút đăng nhập chiếm toàn bộ chiều rộng */
        }
        .alert {
            margin-top: 20px; /* Khoảng cách trên cho thông báo lỗi */
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="text-center">Đăng Nhập Admin</h1>
        <form action="{{ url('/admin/login') }}" method="POST">
            @csrf
            <div class="mb-3">
                <label for="login" class="form-label">Username hoặc Email</label>
                <input type="text" class="form-control" id="login" name="login" required placeholder="Nhập username hoặc email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mật Khẩu</label>
                <input type="password" class="form-control" id="password" name="password" required placeholder="Nhập mật khẩu">
            </div>
            <button type="submit" class="btn btn-primary">Đăng Nhập</button>
        </form>

        @if(session('error'))
            <div class="alert alert-danger">{{ session('error') }}</div>
        @endif
    </div>

</body>
</html>
