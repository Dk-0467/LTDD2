import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import CartItem from './items/CartItem';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { getCartItems, removeFromCart, payCart } from '../../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }: { navigation: any }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchCartItems = async () => {
    try {
      const items = await getCartItems();
      setCartItems(items);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to load cart items.');
    }
  };

  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
    } catch (error) {
      console.error('Failed to fetch userId:', error);
    }
  };

  // Sử dụng useFocusEffect để tự động tải lại dữ liệu khi màn hình được hiển thị
  useFocusEffect(
    React.useCallback(() => {
      fetchCartItems();
      fetchUserId();
      
      // Tự động làm mới giỏ hàng mỗi 5 giây
      const intervalId = setInterval(fetchCartItems, 5000); // 5000ms = 5s

      // Xóa interval khi component bị hủy
      return () => clearInterval(intervalId);
    }, [])
  );

  const removeItemFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      const updatedCart = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedCart);
      Alert.alert('Success', 'Item removed from cart.');
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      Alert.alert('Error', 'Failed to remove item from cart.');
    }
  };

  const calculateTotal = () => {
    if (cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => {
      const itemTotal = item.product.price * item.quantity;
      return total + itemTotal;
    }, 0).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <CartItem item={item} />
  );

  const renderHiddenItem = ({ item }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => removeItemFromCart(item.id)}>
        <Icon name="trash" size={20} color="#fff" />
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = async () => {
    if (!userId) {
      Alert.alert('Error', 'User not logged in. Please log in to checkout.');
      return;
    }

    try {
      const totalAmount = calculateTotal();
      console.log('Checkout initiated with total amount:', totalAmount);

      const orderData = {
        user_id: userId,
        items: cartItems.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          size: item.size,
        })),
        total: totalAmount,
      };

      const response = await payCart(orderData);
      if (response.success) {
        Alert.alert('Success', 'Checkout successful!', [
          {
            text: 'OK',
            onPress: () => {
              // Làm mới giỏ hàng sau khi thanh toán thành công
              fetchCartItems(); // Gọi lại hàm fetchCartItems để cập nhật danh sách giỏ hàng
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      Alert.alert('Error', 'Failed to checkout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Your Cart</Text>
      {cartItems.length > 0 ? (
        <>
          <SwipeListView
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={0}
            rightOpenValue={-100}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={300}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  cartTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6b4226',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6b4226',
  },
  checkoutButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#6b4226',
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ff4d4f',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20,
    position: 'absolute',
    right: 0,
    height: '80%',
    width: 100,
    borderRadius: 10,
    opacity: 0.9,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default CartScreen;
