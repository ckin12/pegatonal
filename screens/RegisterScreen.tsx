import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';


export default function RegisterScreen() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    console.log("✅ Bắt đầu đăng ký...");
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("✅ Tạo tài khoản thành công");
        Alert.alert('Thành công', 'Tạo tài khoản thành công!');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log("❌ Đăng ký thất bại");
        console.log("Error message:", error?.message);
        console.log("Error name:", error?.name);
        Alert.alert('Lỗi', error?.message || 'Đăng ký thất bại, vui lòng thử lại');
      });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <Text style={styles.subtitle}>
        Tạo tài khoản mới hoặc bạn có thể đăng nhập bằng tài khoản Pegatoon.
      </Text>

      <View style={styles.socialContainer}>
        <FontAwesome name="facebook" size={32} color="#3b5998" />
        <FontAwesome name="google" size={32} color="#DB4437" />
      </View>

      <Text style={styles.orText}>hoặc tiếp tục với</Text>

      <TextInput
        placeholder="Nhập email hoặc số điện thoại"
        style={styles.input}
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Mật khẩu"
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Xác nhận mật khẩu"
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>ĐĂNG KÝ</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        Bằng cách chọn Đăng ký, bạn đồng ý với{' '}
        <Text style={styles.linkText}>Điều khoản sử dụng</Text> và{' '}
        <Text style={styles.linkText}>Chính sách riêng tư</Text> của Pegatoon.
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Đã có tài khoản? <Text style={{ color: 'red' }}>Đăng nhập</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginVertical: 10,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  socialContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  orText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#888',
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#f5533d',
    height: 48,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#007AFF',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});
