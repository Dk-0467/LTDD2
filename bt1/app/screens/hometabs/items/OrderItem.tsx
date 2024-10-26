import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const OrderCard = ({ item, onDelete }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.product.image }} 
        style={styles.productImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{item.product.name}</Text>
        <View style={styles.row}>
          <FontAwesome5 name="coffee" size={18} color="#8B4513" />
          <Text style={styles.text}>Price: ${item.product.price}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="production-quantity-limits" size={18} color="#8B4513" />
          <Text style={styles.text}>Quantity: {item.quantity}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesome5 name="tshirt" size={18} color="#8B4513" />
          <Text style={styles.text}>Size: {item.size}</Text>
        </View>
        <Button
          title="Cancel Order"
          color="#8B4513"
          onPress={() => onDelete(item.id)}
        />
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF8E1',
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#8B4513',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#D2B48C',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  infoContainer: {
    marginTop: 15,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4E342E',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: '#4E342E',
  },
});
