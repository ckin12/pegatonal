import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

// ⚙️ Google Sign-in config
GoogleSignin.configure({
  webClientId: '562906844234-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com', // thay cái này
});

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Email/Password login
  const handleLogin = () => {
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

  // Google login
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

  // Facebook login
  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        throw 'Hủy đăng nhập Facebook';
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Không lấy được access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      await auth().signInWithCredential(facebookCredential);
      Alert.alert('Thành công', 'Đăng nhập Facebook thành công!');
    } catch (error: any) {
      Alert.alert('Lỗi Facebook', error.message || String(error));
    }
  };

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>Quên mật khẩu</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        Bằng cách chọn Đăng nhập, bạn đồng ý với{' '}
        <Text style={styles.linkText}>Điều khoản sử dụng</Text> và{' '}
        <Text style={styles.linkText}>Chính sách riêng tư</Text> của Pegatoon.
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.loginTexts}>
          Chưa có tài khoản? <Text style={{ color: 'red' }}>Đăng ký</Text>
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
  },
  socialContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  loginButton: {
    width: '100%',
    backgroundColor: '#f5533d',
    height: 48,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginTexts: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  forgotText: {
    color: '#f5533d',
    textAlign: 'center',
    marginVertical: 10,
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
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});
