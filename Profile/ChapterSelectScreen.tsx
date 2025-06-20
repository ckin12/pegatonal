import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // ✅ Thêm dòng này

const screenWidth = Dimensions.get('window').width;

const ChapterSelectScreen = () => {
  const totalChapters = 447;
  const chaptersPerPage = 30;

  const [selectedChapters, setSelectedChapters] = useState<number[]>([]); // ✅ Khai báo kiểu rõ ràng

  const chapters: number[] = Array.from({ length: chaptersPerPage }, (_, i) => i + 1);

  const toggleSelect = (chapter: number) => {
    if (selectedChapters.includes(chapter)) {
      setSelectedChapters(selectedChapters.filter((c) => c !== chapter));
    } else {
      setSelectedChapters([...selectedChapters, chapter]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedChapters.length === chapters.length) {
      setSelectedChapters([]);
    } else {
      setSelectedChapters(chapters);
    }
  };

  const renderChapter = ({ item }: { item: number }) => (
    <TouchableOpacity
      style={[
        styles.chapterButton,
        selectedChapters.includes(item) && styles.selectedButton,
      ]}
      onPress={() => toggleSelect(item)}
    >
      <Text style={styles.chapterText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn chương tải về</Text>
        <TouchableOpacity>
          <Text style={styles.sortText}>📋 Mới nhất</Text>
        </TouchableOpacity>
      </View>

      {/* Chapter Grid */}
      <FlatList
        data={chapters}
        renderItem={renderChapter}
        keyExtractor={(item) => item.toString()}
        numColumns={3}
        contentContainerStyle={styles.chapterContainer}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Đã chọn {selectedChapters.length} chap
        </Text>
        <View style={styles.footerRight}>
          <TouchableOpacity onPress={toggleSelectAll}>
            <Text style={styles.footerButtonText}>○ Chọn tất cả</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.downloadText}>⬇ Tải Xuống</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChapterSelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121212',
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sortText: {
    color: '#aaa',
    fontSize: 14,
  },
  chapterContainer: {
    paddingHorizontal: 10,
  },
  chapterButton: {
    flex: 1 / 3,
    margin: 5,
    backgroundColor: '#1e1e1e',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#3b82f6',
  },
  chapterText: {
    color: 'white',
    fontSize: 14,
  },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#333',
    backgroundColor: '#121212',
  },
  footerText: {
    color: '#aaa',
    marginBottom: 5,
  },
  footerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#aaa',
  },
  downloadButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  downloadText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
