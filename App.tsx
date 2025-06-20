import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import các màn hình
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import DetailComicScreen from './screens/DetailComicScreen';
import ReadChapterScreen from './screens/ReadChapterScreen';
import MyMessagesScreen from './screens/MyMessagesScreen';
import ProfileScreen from './Profile/profile';
import Account from './Profile/Account';
import Tintuc from './Tintuc/Tintuc';
import NewsDetail from './Tintuc/NewDetail';
import search from './Search/search';
import Bookshelf from './Profile/Bookshelf'; 
import ChapterSelectScreen from './Profile/ChapterSelectScreen';
// Định nghĩa type
export type RootStackParamList = {
  Home: undefined;
  MyMessages: undefined;
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MainTabs: undefined;
  profile: undefined;
  Acc: undefined;
  tin: undefined;
  timkiem: undefined;
  SelectChapter: undefined;
  DetailComic: {
    user: {
      id: string;
      username: string;
      email?: string;
    };
    comic: {
      id: string;
      title: string;
      image: string | number;
      author?: string;
      chapters?: number;
    };
  };
  ReadChapter: {
    comicId: string;
    comicTitle: string;
    chapterNumber: number;
    isBookmarked?: boolean;
  };
  NewsDetail: {
    newsItem: {
      id: number | string;
      title: string;
      time: string;
      content?: string;
      source: string;
      image?: any;
      images?: any[];
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function TintucStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tin" component={Tintuc} />
      <Stack.Screen name="NewsDetail" component={NewsDetail} />
    </Stack.Navigator>
  );
}

// ✅ Sửa phần tab navigator để thêm Bookshelf
function HomeWithTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff5e57',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Trang Chủ"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tủ sách"
        component={Bookshelf}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookshelf" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tin Tức"
        component={TintucStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="newspaper-variant-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tin nhắn"
        component={MyMessagesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="message-text" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tài khoản"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          {/* Các màn hình không có Bottom Tab */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Acc" component={Account} />
          <Stack.Screen name="profile" component={ProfileScreen} />
          <Stack.Screen name="timkiem" component={search} />
          <Stack.Screen name="SelectChapter" component={ChapterSelectScreen} />

          {/* Màn hình có Bottom Tabs */}
          <Stack.Screen name="Home" component={HomeWithTabs} />

          {/* Màn hình toàn màn hình khác */}
          <Stack.Screen name="DetailComic" component={DetailComicScreen} />
          <Stack.Screen name="ReadChapter" component={ReadChapterScreen} />
          <Stack.Screen name="MyMessages" component={MyMessagesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
