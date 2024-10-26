import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const CartItem = ({ item }) => {
  // Lấy thông tin sản phẩm và số lượng từ item
  const { product, quantity,size } = item;

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>Price: ${parseFloat(product.price).toFixed(2)}</Text>
        <Text style={styles.productQuantity}>Quantity: {quantity}</Text>
        <Text style={styles.productSize}>Size: {size}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#6b4226',
  },
  productQuantity: {
    fontSize: 14,
    color: '#6b4226',
  }, 
  productSize: {
    fontSize: 14,
    color: '#6b4226',
  },
});

export default CartItem;
