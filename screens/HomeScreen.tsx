import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

const screenWidth = Dimensions.get('window').width;

const newComics = [
  {
    id: '1',
    title: 'Con Trai Út...',
    price: 285,
    image: 'https://example.com/images/tranh1.png',
  },
  {
    id: '2',
    title: 'Anh Hùng...',
    price: 195,
    image: 'https://example.com/images/tranh2.png',
  },
  {
    id: '3',
    title: 'Cuộc Phiêu Lưu...',
    price: 300,
    image: 'https://example.com/images/tranh3.png',
  },
  {
    id: '4',
    title: 'Thế Giới Ma Quái...',
    price: 250,
    image: 'https://example.com/images/tranh4.png',
  },
];

const hotComics = [
  {
    id: '5',
    title: 'Hành Trình Kỳ Diệu...',
    price: 320,
    image: 'https://example.com/images/tranh5.png',
  },
  {
    id: '6',
    title: 'Bí Mật Của Rồng...',
    price: 400,
    image: 'https://example.com/images/tranh6.png',
  },
  {
    id: '7',
    title: 'Chiến Binh Bóng Tối...',
    price: 365,
    image: 'https://example.com/images/tranh7.png',
  },
  {
    id: '8',
    title: 'Vương Quốc Huyền Bí...',
    price: 280,
    image: 'https://example.com/images/tranh8.png',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const currentUser = { id: '123', username: 'nahida_puc' };

  const renderComicItem = ({ item }: { item: typeof newComics[0] }) => (
    <TouchableOpacity
      style={styles.comicItem}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('DetailComic', {
          user: currentUser,
          comic: item,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.comicImage} />
      <Text style={styles.comicTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.comicPrice}>MUA NGAY ⭐</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Trang Chủ</Text>
      </View>

    
      <TouchableOpacity
        onPress={() => navigation.navigate('timkiem')}
        activeOpacity={0.9}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm truyện, anime, diễn viên..."
          placeholderTextColor="#aaa"
          editable={false}
        />
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://i.imgur.com/Yz1NLqM.png' }}
        style={styles.banner}
        resizeMode="cover"
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 Truyện mới cập nhật ✨</Text>
        <FlatList
          data={newComics}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderComicItem}
          contentContainerStyle={styles.comicList}
          showsHorizontalScrollIndicator={false}
          style={{ height: 220 }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 Truyện Hot Nổi Bật 🔥</Text>
        <FlatList
          data={hotComics}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderComicItem}
          contentContainerStyle={styles.comicList}
          showsHorizontalScrollIndicator={false}
          style={{ height: 220 }}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { paddingTop: 50, paddingHorizontal: 20 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  searchInput: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 15,
  },
  banner: { width: screenWidth - 40, height: 200, borderRadius: 10, margin: 20 },
  section: { marginBottom: 30 },
  sectionTitle: {
    color: '#FFA500',
    fontSize: 18,
    marginHorizontal: 20,
    marginBottom: 10,
    fontWeight: '700',
  },
  comicList: { paddingHorizontal: 20 },
  comicItem: {
    marginRight: 15,
    width: 130,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 5,
  },
  comicImage: { width: '100%', height: 160, borderRadius: 8 },
  comicTitle: { color: '#fff', marginTop: 6, fontSize: 13, fontWeight: '600' },
  comicPrice: { color: '#FFA500', fontSize: 12, marginTop: 2 },
});
