import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

const videoTags = [
  "demon slayer mùa 2", "dragon quest", "One Piece", "oddtaxi", "doraemon s10",
  "Naruto Shippuden", "detective conan", "cherry magic", "boruto"
];

const comicTags = [
  "Đóa Hoa Đổi Lấy Một Đời", "Ác nữ khi yêu", "Ăn thế hoa tộc", "BL",
  "Soái phủ thời loạn", "Mami Chạy Đi Papa Tới Rồi", "Kiếp Văn Phòng"
];

const SearchScreen = () => {
  const renderTag = (tag: string) => (
    <TouchableOpacity key={tag} style={styles.tag}>
      <Text style={styles.tagText}>{tag}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <TextInput
        style={styles.searchInput}
        placeholder="Tên phim, anime, comic, diễn viên, ngh..."
        placeholderTextColor="#aaa"
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <Text style={styles.categoryTitle}>Comic</Text>
        <View style={styles.tagsContainer}>
          {comicTags.map(renderTag)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  searchInput: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  categoryTitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#333',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default SearchScreen;
