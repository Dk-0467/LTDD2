import React, { useState, useEffect } from 'react';
import { fetchOrders, deleteOrder } from '../../Api/api'; // Đảm bảo fetchOrders gọi đúng endpoint
import { Link } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hàm lấy danh sách đơn hàng
    const fetchAllOrders = async () => {
        setLoading(true);
        try {
            const response = await fetchOrders(); // Gọi API lấy danh sách đơn hàng
            setOrders(response || []);
        } catch (err) {
            console.error(err);
            setError('Không thể tải đơn hàng. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders(); // Gọi hàm lấy danh sách đơn hàng lần đầu

        // Tự động làm mới dữ liệu mỗi 5 giây
        const intervalId = setInterval(fetchAllOrders, 5000); // 5000ms = 5s

        // Xóa interval khi component bị hủy
        return () => clearInterval(intervalId);
    }, []); // Chỉ chạy khi component được mount

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?')) {
            try {
                await deleteOrder(id);
                // Tự động làm mới danh sách đơn hàng sau khi xóa
                fetchAllOrders(); // Cập nhật lại danh sách đơn hàng
            } catch (err) {
                console.error(err);
                setError('Không thể xóa đơn hàng.');
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h2>
            <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 mb-4">
                Trang quản lý
            </Link>
            {error && <p className="text-red-500">{error}</p>}

                <table className="min-w-full bg-white border border-gray-300 mt-4">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">User ID</th>
                            <th className="border border-gray-300 px-4 py-2">Tổng tiền</th>
                            <th className="border border-gray-300 px-4 py-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.user_id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.total_amount}</td>
                                    
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center border border-gray-300 px-4 py-2">
                                    Không có đơn hàng nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            
        </div>
    );
};

export default OrderList;
