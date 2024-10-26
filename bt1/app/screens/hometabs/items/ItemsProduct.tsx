import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductItem = ({ item, onPress }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <TouchableOpacity onPress={handleLikePress} style={styles.likeButton}>
          <Icon 
            name={isLiked ? "heart" : "heart-outline"} 
            size={20} 
            color={isLiked ? "red" : "#6b4226"} 
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  details: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'column', // Xếp theo cột
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b4226',
  },
  price: {
    fontSize: 16,
    color: '#6b4226',
  },
  likeButton: {
    padding: 5,
  },
});

export default ProductItem;
