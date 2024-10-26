// src/AddProduct.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../Api/api'; // Nhập hàm gọi API

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('category_id', categoryId);
        if (image) {
            formData.append('image', image);
        }

        try {
            await createProduct(formData);
            setSuccess('Sản phẩm đã được tạo thành công');
            navigate('/products'); // Chuyển hướng đến trang sản phẩm
        } catch (error) {
            setError('Không thể tạo sản phẩm. Vui lòng thử lại.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Thêm Sản Phẩm</h2>
            {error && <div className="bg-red-500 text-white p-4 rounded-md mb-4">{error}</div>}
            {success && <div className="bg-green-500 text-white p-4 rounded-md mb-4">{success}</div>}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block mb-2">Tên sản phẩm</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-gray-300 p-2 w-full rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Mô tả</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Giá</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="border border-gray-300 p-2 w-full rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Số lượng</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className="border border-gray-300 p-2 w-full rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">ID danh mục</label>
                    <input
                        type="text"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                        className="border border-gray-300 p-2 w-full rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Hình ảnh</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="border border-gray-300 p-2 w-full rounded-md"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Thêm sản phẩm</button>
            </form>
        </div>
    );
};

export default AddProduct;
