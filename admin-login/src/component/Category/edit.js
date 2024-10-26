// src/EditCategory.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCategoryById, updateCategory } from '../../Api/api';

const EditCategory = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(''); // Trường để lưu hình ảnh hiện tại
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const category = await fetchCategoryById(id);
                setName(category.category.name);
                setCurrentImage(category.category.image || ''); // Cập nhật hình ảnh hiện tại
            } catch (error) {
                setError('Không thể tải danh mục');
            }
        };
        loadCategory();
    }, [id]);

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
            await updateCategory(id, formData);
            setSuccess('Danh mục đã được cập nhật thành công');
            navigate('/categories'); // Chuyển hướng về danh sách danh mục
        } catch (error) {
            setError('Không thể cập nhật danh mục. Vui lòng thử lại.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Sửa Danh Mục</h2>
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
                    <label className="block mb-2">Hình Ảnh Hiện Tại</label>
                    {currentImage && <img src={`http://192.168.102.104:8000/images/category/${currentImage}`} alt="Current" className="w-32 h-32 object-cover mb-2" />}
                    <label className="block mb-2">Hình Ảnh (nếu có)</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="border border-gray-300 p-2 w-full rounded-md"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Cập Nhật Danh Mục</button>
            </form>
        </div>
    );
};

export default EditCategory;
