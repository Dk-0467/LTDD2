import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Nhập useAuth

const ProtectedRoute = ({ children, allowedRoles = [], action }) => {
    const { isAuthenticated, role } = useAuth(); // Lấy thông tin từ context

    // Kiểm tra quyền truy cập
    const hasAccess = allowedRoles.length === 0 || allowedRoles.includes(role);

    if (!isAuthenticated) {
        // Nếu người dùng chưa đăng nhập
        return <Navigate to="/" />;
    }

    // Kiểm tra nếu người dùng không có quyền
    if (!hasAccess) {
        return <Navigate to="/dashboard" />; 
    }

    return children; // Nếu tất cả đều đúng, hiển thị component con
};

export default ProtectedRoute;
