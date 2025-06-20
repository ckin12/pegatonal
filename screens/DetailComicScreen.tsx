import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { ScreenProps } from '../navigation/types';

const { width } = Dimensions.get('window');

export default function DetailComicScreen() {
  const { params } = useRoute<ScreenProps<'DetailComic'>['route']>();
  const navigation = useNavigation<ScreenProps<'DetailComic'>['navigation']>();
  
  const { 
    user = { id: '', username: 'Khách', email: undefined }, 
    comic = { 
      id: '', 
      title: 'Truyện chưa có tên', 
      image: require('../assets/default-comic.png'),
      author: undefined,
      chapters: undefined
    } 
  } = params || {};

  const handleReadNow = () => {
    if (!comic.id || !comic.title) {
      Alert.alert('Lỗi', 'Thiếu thông tin truyện!');
      return;
    }
    
    // Thêm log để debug
    console.log('Navigating to ReadChapter with:', {
      comicId: comic.id,
      comicTitle: comic.title,
      chapterNumber: 1
    });
  
    navigation.navigate('ReadChapter', {
      comicId: comic.id,
      comicTitle: comic.title,
      chapterNumber: 1, // Chapter đầu tiên
      isBookmarked: false // Mặc định chưa bookmark
    });
  };

  return (  
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Image 
          source={typeof comic.image === 'string' ? { uri: comic.image } : comic.image} 
          style={styles.banner} 
          defaultSource={require('../assets/default-comic.png')}
        />
        
        <TouchableOpacity
          style={styles.readButton}
          onPress={handleReadNow}
          activeOpacity={0.8}
        > 
          <Text style={styles.readButtonText}>ĐỌC NGAY</Text>
          
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{comic.title}</Text>
        
        <View style={styles.statsRow}>
          <Icon name="book-open-outline" size={18} color="#ccc" />
          <Text style={styles.statText}>24.8K lượt xem</Text>
        </View>

        {/* Hiển thị tác giả nếu có */}
        {comic.author && (
          <Text style={styles.label}>
            Tác giả: <Text style={styles.highlight}>{comic.author}</Text>
          </Text>
        )}
        
        <Text style={styles.label}>
          👤 Người dùng: <Text style={styles.highlight}>{user.username}</Text>
        </Text>
        
        <Text style={styles.label}>
          📖 Mã truyện: <Text style={styles.highlight}>{comic.id}</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

// Giữ nguyên phần styles
const styles = StyleSheet.create({
  container: { backgroundColor: '#000', flex: 1 },
  header: { position: 'relative' },
  banner: { width: width, height: (width * 9) / 16, resizeMode: 'cover' },
  readButton: {
    
    position: 'absolute',
    bottom: 12,
    right: 20,
    backgroundColor: '#ff5b2d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  readButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  content: { padding: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 12, lineHeight: 28 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  statText: { color: '#ccc', fontSize: 14, marginLeft: 8 },
  label: { color: '#ccc', fontSize: 15, marginBottom: 8, lineHeight: 22 },
  highlight: { color: '#ff7a00', fontWeight: '500' },
});