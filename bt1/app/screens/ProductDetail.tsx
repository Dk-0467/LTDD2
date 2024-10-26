import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToCart, validateToken } from '../api/apiService'; 
import Icon from 'react-native-vector-icons/Ionicons';

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null); 

  const handleAddToCart = async () => {
    if (!selectedSize) {
        Alert.alert('Error', 'Please select a size.');
        return;
    }

    if (quantity < 1) {
        Alert.alert('Error', 'Quantity must be at least 1.');
        return;
    }

    try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
        console.log('User ID:', userId);
        console.log('Token:', token);

        if (!userId || !token) {
            Alert.alert('Error', 'Please log in to add products to the cart.');
            navigation.navigate('Login');
            return;
        }

        const cartData = {
            user_id: userId,  // Thêm user_id vào dữ liệu giỏ hàng
            product_id: product.id,
            quantity: quantity,
            size: selectedSize,
        };
        console.log('Cart Data:', cartData);

        const response = await addToCart(cartData);
        Alert.alert('Success', `${quantity} ${product.name}(s) of size ${selectedSize} have been added to your cart.`);
        navigation.navigate('Cart');

    } catch (error) {
        console.log('Error when adding to cart:', error);
        const message = error.response?.data?.message || 'Failed to add product to cart.';
        Alert.alert('Error', message);
    }
};



  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{product.name}</Text>

        <View style={styles.sizeContainer}>
          <Text style={styles.sizeLabel}>Size:</Text>
          <View style={styles.sizeOptions}>
            {['S', 'M', 'L'].map(size => (
              <TouchableOpacity 
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton 
                ]}
                onPress={() => handleSizeSelect(size)}
              >
                <Text style={selectedSize === size ? styles.selectedSizeText : styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            value={String(quantity)}
            keyboardType="numeric"
            onChangeText={text => setQuantity(Number(text) || 1)}
          />
          <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.productDescription}>Detailed description of the product goes here.</Text>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#6b4226',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b4226',
    marginBottom: 10,
  },
  sizeContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b4226',
    marginBottom: 5,
  },
  sizeOptions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  sizeButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  selectedSizeButton: {
    backgroundColor: '#6b4226', 
  },
  sizeText: {
    color: '#6b4226', 
  },
  selectedSizeText: {
    color: '#fff', 
    fontWeight: 'bold', 
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#6b4226',
    borderRadius: 9,
    padding: 10,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 15,
    color: '#fff',
  },
  quantityInput: {
    borderColor: '#6b4226',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    width: 40,
    marginHorizontal: 10,
    fontSize: 15,
    paddingVertical: 5,
  },
  productPrice: {
    fontSize: 20,
    color: '#6b4226',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#6b4226',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#6b4226',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetail;
