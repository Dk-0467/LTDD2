import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../Api/api'; // Nhập hàm gọi API
import { useAuth } from '../../context/AuthContext'; // Nhập useAuth

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { role } = useAuth(); // Lấy thông tin role từ context

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            setError('Không thể tải danh sách sản phẩm');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
            try {
                await deleteProduct(id);
                loadProducts();
            } catch (error) {
                setError('Không thể xóa sản phẩm');
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h2>
            <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 mb-4">Trang quản lý</Link>
            {error && <div className="bg-red-500 text-white p-4 rounded-md mb-4">{error}</div>}
            <Link to="/products/create" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 mb-4">Thêm sản phẩm</Link>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Tên sản phẩm</th>
                        <th className="py-3 px-4 text-left">Giá</th>
                        <th className="py-3 px-4 text-left">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-4">{product.id}</td>
                            <td className="py-3 px-4">{product.name}</td>
                            <td className="py-3 px-4">{product.price} VNĐ</td>
                            <td className="py-3 px-4">
                                <Link to={`/products/edit/${product.id}`} className={`bg-yellow-500 text-white px-2 py-1 rounded-md shadow-md hover:bg-yellow-600 mr-2 ${role === 'admin' ? '' : 'pointer-events-none opacity-50'}`}>Sửa</Link>
                                
                                {/* Kiểm tra quyền admin trước khi hiển thị nút xóa */}
                                {role === 'admin' ? (
                                    <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded-md shadow-md hover:bg-red-600">Xóa</button>
                                ) : (
                                    <button className="bg-gray-300 text-white px-2 py-1 rounded-md shadow-md" disabled>Xóa</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
