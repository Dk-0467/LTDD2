import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories, deleteCategory } from '../../Api/api'; // Nhập hàm gọi API
import { useAuth } from '../../context/AuthContext'; // Nhập useAuth

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const { role } = useAuth(); // Lấy thông tin role từ context

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                setError('Không thể tải danh mục');
            }
        };
        loadCategories();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
            try {
                await deleteCategory(id);
                setCategories(categories.filter(category => category.id !== id));
            } catch (error) {
                setError('Không thể xóa danh mục');
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Quản lý Danh Mục</h2>
            <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 mb-4">Trang quản lý</Link>
            {error && <div className="bg-red-500 text-white p-4 rounded-md mb-4">{error}</div>}
            <Link to="/categories/create" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Thêm Danh Mục</Link>
            <table className="min-w-full mt-4 bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Tên Danh Mục</th>
                        <th className="border border-gray-300 px-4 py-2">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td className="border border-gray-300 px-4 py-2">{category.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link to={`/categories/edit/${category.id}`} className={`bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 ${role === 'admin' ? '' : 'pointer-events-none opacity-50'}`}>Sửa</Link>
                                
                                {/* Kiểm tra quyền admin trước khi hiển thị nút xóa */}
                                {role === 'admin' ? (
                                    <button onClick={() => handleDelete(category.id)} className="bg-red-500 text-white px-2 py-1 rounded-md">Xóa</button>
                                ) : (
                                    <button className="bg-gray-300 text-white px-2 py-1 rounded-md" disabled>Xóa</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
