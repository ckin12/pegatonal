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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId: '562906844234-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
});

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6 && password.length <= 20 && /^[A-Za-z0-9]+$/.test(password);
  };

  const handleLogin = () => {
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

    if (!valid) return;

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Thành công', 'Đăng nhập thành công!');
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('Lỗi đăng nhập', error.message);
      });
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      Alert.alert('Thành công', 'Đăng nhập Google thành công!');
    } catch (error: any) {
      Alert.alert('Lỗi Google', error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) throw 'Hủy đăng nhập Facebook';

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) throw 'Không lấy được access token';

      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      await auth().signInWithCredential(facebookCredential);
      Alert.alert('Thành công', 'Đăng nhập Facebook thành công!');
    } catch (error: any) {
      Alert.alert('Lỗi Facebook', error.message || String(error));
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.subtitle}>Bạn có thể đăng nhập với tài khoản Pegatoon.</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity onPress={handleFacebookLogin}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/733/733547.png' }}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoogleLogin}>
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
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', paddingRight: 12 }]}>
          <TextInput
            placeholder="Mật khẩu"
            style={{ flex: 1 }}
            secureTextEntry={!showPassword}
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#888" />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Quên mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.loginTexts}>
            Chưa có tài khoản? <Text style={{ color: 'red' }}>Đăng ký</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
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
    marginVertical: 10,
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
  socialContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  orText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#888',
    fontSize: 13,
  },
  input: {
    width: '100%',
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
  loginButton: {
    width: '100%',
    backgroundColor: '#f5533d',
    height: 44,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginTexts: {
    textAlign: 'center',
    marginTop: 14,
    fontSize: 13,
  },
  forgotText: {
    color: '#f5533d',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 13,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
