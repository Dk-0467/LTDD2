import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const IntroScreen = ({ navigation }: { navigation: any }) => {
  const handleGetStarted = () => {
    // Điều hướng đến màn hình chính
    navigation.replace('Signin');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://i.pinimg.com/originals/30/29/3a/30293ae12e9f0d684ece998b3d4d21e1.png' }}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>Enjoy</Text>
      <Text style={styles.subtitle}>Your Coffee</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8e4e33',
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginBottom: 50, // Khoảng cách lớn hơn giữa ảnh và chữ
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300, // Kích thước hình ảnh
    height: 300,
    borderRadius: 200, // Làm tròn hình ảnh theo đường kính (width/height ÷ 2)
    resizeMode: 'cover', // Để hình ảnh bao phủ khung hình tròn
    borderWidth: 5, // Thêm viền nếu muốn (tuỳ chọn)
    borderColor: '#fff', // Màu viền trắng
  },
  title: {
    fontSize: 40, // Tăng kích thước tiêu đề
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15, // Thêm khoảng cách giữa tiêu đề và phụ đề
  },
  subtitle: {
    fontSize: 30, // Tăng kích thước phụ đề
    color: '#fff',
    marginBottom: 60, // Khoảng cách lớn hơn giữa phụ đề và nút
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 50, // Tăng kích thước nút
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#8e4e33',
    fontSize: 18, // Tăng kích thước chữ trong nút
    fontWeight: 'bold',
  },
});
