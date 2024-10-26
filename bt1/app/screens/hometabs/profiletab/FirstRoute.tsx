import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserById } from '../../../api/apiService';
import { Ionicons } from '@expo/vector-icons';

const ShowUserScreen = ({ navigation }: { navigation: any }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const userData = await getUserById(userId);
          setUser(userData);
        } else {
          Alert.alert('Error', 'User ID not found.');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        Alert.alert('Error', 'Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    Alert.alert('Success', 'You have logged out successfully.');
    navigation.navigate('Login');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#cad1d8" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <View style={styles.card}>
          <Image
            style={styles.avatar}
            source={{ uri: 'data:image/jpeg;base64,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'  }} // Thay thế bằng URL ảnh người dùng thực tế
          />
          <Text style={styles.name}>{user.username}</Text>
          <Text style={styles.email}><Ionicons name="mail-outline" size={16} /> {user.email}</Text>
          <Text style={styles.phone}><Ionicons name="call-outline" size={16} /> {user.phone}</Text>
          <Text style={styles.createdAt}><Ionicons name="calendar-outline" size={16} /> {user.created_at}</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}><Ionicons name="log-out-outline" size={16} /> Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.text}>User not found.</Text>
      )}
    </ScrollView>
  );
};

export default ShowUserScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Màu nền nhẹ nhàng
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#007bff',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Màu chữ tối
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  phone: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  createdAt: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
  },
  logoutButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#dc3545', // Màu đỏ nổi bật cho nút đăng xuất
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    elevation: 2, // Đổ bóng cho nút
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600', // Chữ đậm cho nút
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});
