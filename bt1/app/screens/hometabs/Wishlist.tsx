import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';

const WishlistScreen = () => {
  // Dữ liệu mẫu cho danh sách sản phẩm yêu thích
  const wishlistItems = [
    { id: '1', name: 'Cappuccino Latte', price: 'Rp. 50.000', image: 'https://img.lovepik.com/free-png/20211215/lovepik-cappuccino-png-image_401647765_wh1200.png' },
    { id: '2', name: 'Creamy Latte', price: 'Rp. 40.000', image: 'https://png.pngtree.com/png-vector/20240203/ourlarge/pngtree-matcha-latte-milk-tea-drink-watercolor-png-image_11601509.png' },
    { id: '3', name: 'Cappuccino Latte', price: 'Rp. 50.000', image: 'https://img.lovepik.com/free-png/20211215/lovepik-cappuccino-png-image_401647765_wh1200.png' },
    { id: '4', name: 'Creamy Latte', price: 'Rp. 40.000', image: 'https://png.pngtree.com/png-vector/20240203/ourlarge/pngtree-matcha-latte-milk-tea-drink-watercolor-png-image_11601509.png' },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.cardContent}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Wishlist</Text>
      <FlatList
        data={wishlistItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center', // Canh giữa tiêu đề
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    marginBottom: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#6b4226',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  removeButton: {
    backgroundColor: '#d17842',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
