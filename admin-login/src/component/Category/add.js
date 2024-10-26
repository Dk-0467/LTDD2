// src/AddCategory.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../Api/api';

const AddCategory = () => {
    const [name, setName] = useState('');
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
        if (image) {
            formData.append('image', image);
        }
    
        try {
            await createCategory(formData);
            setSuccess('Danh mục đã được tạo thành công');
            navigate('/categories'); // Chuyển hướng về danh sách danh mục
        } catch (error) {
            setError('Không thể tạo danh mục. Vui lòng thử lại.');
        }
    };
    
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Thêm Danh Mục</h2>
            {error && <div className="bg-red-500 text-white p-4 rounded-md mb-4">{error}</div>}
            {success && <div className="bg-green-500 text-white p-4 rounded-md mb-4">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Tên Danh Mục</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-gray-300 p-2 w-full rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Hình Ảnh (nếu có)</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="border border-gray-300 p-2 w-full rounded-md"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Thêm Danh Mục</button>
            </form>
        </div>
    );
};

export default AddCategory;
