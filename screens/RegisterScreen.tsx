import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function RegisterScreen() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return (
      password.length >= 6 &&
      password.length <= 20 &&
      /^[A-Za-z0-9]+$/.test(password)
    );
  };

  const handleRegister = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Email không hợp lệ');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Mật khẩu 6-20 ký tự, không chứa ký tự đặc biệt');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu xác nhận không khớp');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!valid) return;

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Thành công', 'Tạo tài khoản thành công!');
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Lỗi', error?.message || 'Đăng ký thất bại, vui lòng thử lại');
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Đăng ký</Text>
        <Text style={styles.subtitle}>
          Tạo tài khoản mới hoặc bạn có thể đăng nhập bằng tài khoản Pegatoon.
        </Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/733/733547.png' }}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/300/300221.png' }}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>hoặc tiếp tục với</Text>

        <TextInput
          placeholder="Nhập email"
          style={[styles.input, emailError && { borderColor: 'red' }]}
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? (
          <Text style={styles.errorText}>{emailError}</Text>
        ) : null}

        <TextInput
          placeholder="Mật khẩu"
          style={[styles.input, passwordError && { borderColor: 'red' }]}
          secureTextEntry
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <TextInput
          placeholder="Xác nhận mật khẩu"
          style={[styles.input, confirmPasswordError && { borderColor: 'red' }]}
          secureTextEntry
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Bằng cách chọn Đăng ký, bạn đồng ý với{' '}
          <Text style={styles.linkText} onPress={() => setShowTerms(true)}>
            Điều khoản sử dụng
          </Text>{' '}
          và{' '}
          <Text style={styles.linkText} onPress={() => setShowPrivacy(true)}>
            Chính sách riêng tư
          </Text>{' '}
          của Pegatoon.
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Đã có tài khoản? <Text style={{ color: 'red' }}>Đăng nhập</Text>
          </Text>
        </TouchableOpacity>

        {/* Modal điều khoản */}
        <Modal visible={showTerms} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Điều khoản sử dụng</Text>
            <ScrollView style={{ padding: 16 }}>
              <Text style={styles.modalText}>
                Chào mừng bạn đến với Pegatoon. Khi sử dụng ứng dụng, bạn đồng ý không sao chép, tái phân phối nội dung truyện, bình luận không lành mạnh hoặc lạm dụng hệ thống.
                {"\n\n"}Tất cả nội dung đều là tài sản của Pegatoon hoặc các bên cung cấp hợp pháp.
              </Text>
            </ScrollView>
            <TouchableOpacity onPress={() => setShowTerms(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Modal chính sách riêng tư */}
        <Modal visible={showPrivacy} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Chính sách riêng tư</Text>
            <ScrollView style={{ padding: 16 }}>
              <Text style={styles.modalText}>
                Pegatoon thu thập thông tin như email, tên đăng nhập để phục vụ trải nghiệm người dùng. Mọi thông tin được bảo mật và không chia sẻ với bên thứ ba nếu không có sự cho phép.
                {"\n\n"}Bạn có thể yêu cầu xóa tài khoản bất cứ lúc nào qua phần hỗ trợ.
              </Text>
            </ScrollView>
            <TouchableOpacity onPress={() => setShowPrivacy(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginBottom: 12,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  orText: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#888',
    fontSize: 13,
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginBottom: 6,
    marginLeft: 4,
    fontSize: 12,
  },
  registerButton: {
    backgroundColor: '#f5533d',
    height: 44,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  termsText: {
    fontSize: 11,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 14,
    fontSize: 13,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#f5533d',
    padding: 12,
    margin: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
