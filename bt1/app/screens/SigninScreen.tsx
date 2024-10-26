import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { register } from '../api/apiService'; // Import hàm register từ apiService

const SignupScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== password_confirmation) {
      Alert.alert('Mật khẩu không khớp', 'Vui lòng xác nhận lại mật khẩu.');
      return;
    }
  
    const registerData = {
      username: username.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: password,
      password_confirmation: password_confirmation,
    };
  
    console.log('Dữ liệu gửi đi:', registerData);
  
    try {
      const response = await register(registerData); // Gọi API đăng ký
  
      // Kiểm tra xem phản hồi có thành công hay không
      if (response && response.data && response.data.success) {
        // Kiểm tra nếu response.data.message có tồn tại không
        const errorMessage = response?.data?.message || 'Có lỗi xảy ra khi đăng ký.';
        Alert.alert('Đăng ký thất bại', errorMessage);
       
      } else {
        Alert.alert('Đăng ký thành công!', 'Bạn đã tạo tài khoản thành công.');
        navigation.navigate('Login'); // Chuyển đến trang đăng nhập
      }
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình đăng ký.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Sign Up</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          placeholderTextColor="#aaa"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor="#aaa"
          value={password_confirmation}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  signUpButton: {
    backgroundColor: '#6b4226',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
