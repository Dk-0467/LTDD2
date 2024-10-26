import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { getOrderItemsByUserId, deleteOrderByIdAndUserId } from '../../../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderCard from '../items/OrderItem'; // Import component OrderCard

const SecondRoute = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm xóa đơn hàng
  const handleDeleteOrder = async (orderId) => {
    try {
      const userId = await AsyncStorage.getItem('userId'); // Lấy userId từ AsyncStorage
      if (userId) {
        await deleteOrderByIdAndUserId(orderId, userId); // Gọi hàm xóa đơn hàng
        Alert.alert('Success', 'Order deleted successfully.');
        fetchOrderItems(); // Gọi lại hàm để cập nhật danh sách đơn hàng
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      Alert.alert('Error', 'Failed to delete order.');
    }
  };

  const fetchOrderItems = async () => {
    setLoading(true); // Thiết lập trạng thái loading khi bắt đầu fetch
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const data = await getOrderItemsByUserId(userId);
        setOrderItems(data);
      }
    } catch (error) {
      console.error('Error fetching order items:', error);
      setError('Failed to load order items.');
    } finally {
      setLoading(false); // Thiết lập trạng thái loading thành false khi hoàn thành fetch
    }
  };

  useEffect(() => {
    fetchOrderItems(); // Gọi hàm fetchOrderItems khi component được mount
    
    // Tự động làm mới đơn hàng mỗi 5 giây
    const intervalId = setInterval(fetchOrderItems, 5000); // 5000ms = 5s

    // Xóa interval khi component bị hủy
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4513" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {orderItems.length > 0 ? (
        orderItems.map((item) => (
          <OrderCard
            key={item.id}
            item={item}
            onDelete={handleDeleteOrder} // Truyền hàm xóa vào OrderCard
          />
        ))
      ) : (
        <Text style={styles.noDataText}>No order items found</Text>
      )}
    </ScrollView>
  );
};

export default SecondRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#6D4C41',
    marginTop: 50,
  },
});
