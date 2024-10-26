// src/api.js
import axios from 'axios';

const API_URL = 'http://192.168.102.104:8000/api';

export const login = async (loginData) => {
    const response = await axios.post(`${API_URL}/admin/login`, loginData);
    return response.data;
};

export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};
export const fetchProductById = async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
};
export const createProduct = async (data) => {
    await axios.post(`${API_URL}/products`, data);
};

export const updateProduct = async (id, data) => {
    await axios.put(`${API_URL}/products/${id}`, data);
};

export const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/products/${id}`);
};

// Lấy tất cả danh mục
export const fetchCategories = async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
};

// Lấy danh mục theo ID
export const fetchCategoryById = async (id) => {
    const response = await axios.get(`${API_URL}/categories/${id}`);
    return response.data;
};

// Tạo danh mục mới
export const createCategory = async (data) => {
    await axios.post(`${API_URL}/categories`, data);
};

// Cập nhật danh mục
export const updateCategory = async (id, data) => {
    await axios.put(`${API_URL}/categories/${id}`, data);
};

// Xóa danh mục
export const deleteCategory = async (id) => {
    await axios.delete(`${API_URL}/categories/${id}`);
};

// Lấy tất cả sản phẩm trong giỏ hàng
export const getCartItems = async () => {
    const response = await axios.get(`${API_URL}/cart`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Thêm token vào header nếu cần thiết
        },
    });
    return response.data;
};

// Xóa sản phẩm khỏi giỏ hàng
export const deleteCartItem = async (id) => {
    await axios.delete(`${API_URL}/cart/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Thêm token vào header nếu cần thiết
        },
    });
};

// Lấy tất cả đơn hàng
export const fetchOrders = async () => {
    const response = await axios.get(`${API_URL}/orders`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Thêm token vào header nếu cần thiết
        },
    });
    return response.data;
};

// Xóa đơn hàng
export const deleteOrder = async (id) => {
    await axios.delete(`${API_URL}/orders/${id}`);
};