import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cấu hình Axios với baseURL là địa chỉ API của bạn
const api = axios.create({
  baseURL: 'http://192.168.102.104:8000/api', // Đảm bảo đây là URL API chính xác
  timeout: 5000, // Thời gian chờ nếu không phản hồi
});

// Kiểm tra tính hợp lệ của token
export const validateToken = async (token) => {
  try {
    const response = await api.get('/validate-token', {
      headers: {
        Authorization: `Bearer ${token}`, // Đưa token vào header
      },
    });
    return response.data.valid; // Giả sử API trả về { valid: true } hoặc { valid: false }
  } catch (error) {
    console.error('Lỗi khi kiểm tra token:', error);
    return false; // Nếu có lỗi, coi như token không hợp lệ
  }
};

// Lấy danh sách danh mục
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi lấy danh mục:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

// Lấy danh sách sản phẩm
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

// Hàm đăng nhập
export const login = async (loginData) => {
  try {
    const response = await api.post('/login', loginData); // Gửi loginData
    return response.data; // Trả về thông tin người dùng sau khi đăng nhập
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

// Hàm đăng ký
export const register = async (registerData) => {
  try {
    const response = await api.post('/register', registerData); // Gửi registerData
    return response.data; // Trả về thông tin người dùng sau khi đăng ký
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

// Lấy người dùng theo ID
export const getUserById = async (id) => {
  const url = `/users/show/${id}`;
  console.log('Fetching user from URL:', url); // Thêm dòng này để kiểm tra URL
  try {
    const response = await api.get(url);
    return response.data; // Trả về dữ liệu người dùng
  } catch (error) {
    console.error('Lỗi khi lấy người dùng:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

// Hàm thêm sản phẩm vào giỏ hàng
export const addToCart = async (cartData) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
    const response = await api.post('/cartadd', cartData, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return response.data; // Trả về thông báo thành công
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

// Hàm lấy danh sách sản phẩm trong giỏ hàng
export const getCartItems = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
    const response = await api.get('/cart', {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return response.data; // Trả về dữ liệu giỏ hàng
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm trong giỏ hàng:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

// Hàm xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (cartItemId) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
    const response = await api.delete(`/cart/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return response.data; // Trả về thông báo thành công
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

// Lấy thông tin đơn hàng theo ID
export const getOrderById = async (id) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
    const response = await api.get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return response.data; // Trả về dữ liệu đơn hàng
  } catch (error) {
    console.error('Lỗi khi lấy thông tin đơn hàng:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};


// Hàm thanh toán giỏ hàng
export const payCart = async (data) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
    const response = await api.post('/orderspay', data, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return response.data; // Trả về thông báo thành công
  } catch (error) {
    console.error('Lỗi khi thanh toán giỏ hàng:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

// Lấy danh sách order items theo userId
export const getOrderItemsByUserId = async (userId) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
    const response = await api.get(`/order-items/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return response.data; // Trả về danh sách order items
  } catch (error) {
    console.error('Lỗi khi lấy order items:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

// Xóa đơn hàng theo id và userId
export const deleteOrderByIdAndUserId = async (id, userId) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
    const response = await api.delete(`/order-items/${id}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return response.data; // Trả về thông báo thành công
  } catch (error) {
    console.error('Lỗi khi xóa đơn hàng:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

// Lấy danh mục và sản phẩm theo ID danh mục
export const getCategoryWithProductsById = async (categoryId) => {
  const url = `/categories/${categoryId}`; // Đường dẫn API để lấy danh mục và sản phẩm
  console.log('Fetching category and products from URL:', url); // Kiểm tra URL
  try {
    const response = await api.get(url);
    return response.data; // Trả về danh mục và sản phẩm
  } catch (error) {
    console.error('Lỗi khi lấy danh mục và sản phẩm:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};




