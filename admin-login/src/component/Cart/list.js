import React, { useState, useEffect } from 'react';
import { getCartItems, deleteCartItem } from '../../Api/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Cart = () => {
    const { role } = useAuth();
    const [carts, setCarts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCartItems();

        // Tự động làm mới dữ liệu mỗi 5 giây
        const intervalId = setInterval(fetchCartItems, 5000); // 5000ms = 5s

        // Xóa interval khi component bị hủy
        return () => clearInterval(intervalId);
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await getCartItems();
            setCarts(response || []);
        } catch (err) {
            console.error(err);
            setError('Không thể tải giỏ hàng. Vui lòng thử lại sau.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?')) {
            try {
                await deleteCartItem(id);
                fetchCartItems();
            } catch (err) {
                console.error(err);
                setError('Không thể xóa sản phẩm khỏi giỏ hàng.');
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
            <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 mb-4">
                Trang quản lý
            </Link>
            {error && <p className="text-red-500">{error}</p>}

            <table className="min-w-full bg-white border border-gray-300 mt-4">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Product ID</th>
                        <th className="border border-gray-300 px-4 py-2">User ID</th>
                        <th className="border border-gray-300 px-4 py-2">Số lượng</th>
                        <th className="border border-gray-300 px-4 py-2">Kích thước</th>
                        <th className="border border-gray-300 px-4 py-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {carts.length > 0 ? (
                        carts.map((item) => (
                            <tr key={item.id}>
                                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.product_id}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.user_id}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.size}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {role === 'admin' && (
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                        >
                                            Xóa
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center border border-gray-300 px-4 py-2">Giỏ hàng trống.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Cart;
