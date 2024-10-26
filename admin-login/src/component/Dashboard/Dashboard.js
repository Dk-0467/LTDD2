import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xóa token khỏi localStorage
        localStorage.removeItem('token');
        // Điều hướng về trang Login
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-6">Trang Quản Lý</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <Link to="/products" className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600">Quản lý sản phẩm</Link>
                <Link to="/categories" className="bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-600">Quản lý danh mục</Link>
                <Link to="/cart" className="bg-yellow-500 text-white p-4 rounded-lg shadow-md hover:bg-yellow-600">Giỏ hàng</Link>
                <Link to="/orders" className="bg-purple-500 text-white p-4 rounded-lg shadow-md hover:bg-purple-600">Quản lý đơn hàng</Link>
            </div>
            <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600"
            >
                Đăng xuất
            </button>
        </div>
    );
};

export default Dashboard;
