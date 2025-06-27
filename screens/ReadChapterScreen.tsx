import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

const dummyChapters = [
  {
    title: 'Chap 1',
    images: [
      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00000.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00001.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00002.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00003.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00004.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00005.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00006.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00007.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00008.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00009.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00010.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00011.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00012.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00013.jpg?v=3.50',

    ],
    
  },
  {
    title: 'Chap 2',
    images: [

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00014.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00015.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00016.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00017.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00018.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00019.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00020.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00021.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00022.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00023.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00024.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00025.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00026.jpg?v=3.50',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00027.jpg?v=3.50',
    
    ],
  },
];

type Comment = {
  id: string;
  userName: string;
  avatar: string;
  text: string;
  time: string;
  parentId?: string;
};

const ReadChapterScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const params = route?.params as {
    comicId?: string;
    comicTitle?: string;
    chapterNumber?: number;
  };

  const [currentChapter, setCurrentChapter] = useState((params?.chapterNumber ?? 1) - 1);
  const [comments, setComments] = useState<Comment[][]>(dummyChapters.map(() => []));
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [likesCount, setLikesCount] = useState(156);
  const [loading, setLoading] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editCommentText, setEditCommentText] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const lastOffset = useRef(0);

  const comicId = params?.comicId ?? '';
  const comicTitle = params?.comicTitle ?? '';
  const chapter = dummyChapters[currentChapter];

  useEffect(() => {
    if (!comicId || !comicTitle || currentChapter < 0) {
      Alert.alert('Lỗi', 'Thiếu thông tin truyện. Quay về trang trước.');
      navigation.goBack();
    }
  }, [comicId, comicTitle, currentChapter]);
  
  

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const goingDown = currentOffset > lastOffset.current;
    Animated.timing(fadeAnim, {
      toValue: goingDown ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    lastOffset.current = currentOffset;
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    const updated = [...comments];
    updated[currentChapter].push({
      id: Date.now().toString(),
      userName: 'Bạn',
      avatar: `https://i.pravatar.cc/40?u=${Date.now()}`,
      text: newComment.trim(),
      time: new Date().toLocaleTimeString(),
      parentId: replyTo ?? undefined,
    });
    setComments(updated);
    setNewComment('');
    setReplyTo(null);
  };

  const handleChangeChapter = (newIndex: number) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentChapter(newIndex);
      setLoading(false);
    }, 400);
  };

  const renderComments = (parentId?: string) => {
    return comments[currentChapter]
      .filter((c) => c.parentId === parentId)
      .map((c) => (
        <View key={c.id} style={{ marginLeft: parentId ? 20 : 0 }}>
          <View style={styles.commentItem}>
            <Image source={{ uri: c.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.userName}>{c.userName}</Text>
                  {c.userName === 'Bạn' && (
                    <View style={styles.memberTag}>
                      <Text style={styles.memberTagText}>Thành viên</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity onPress={() => setSelectedCommentId(c.id)}>
                  <Icon name="ellipsis-vertical" size={16} color="#555" />
                </TouchableOpacity>
              </View>
              <Text style={styles.commentText}>{c.text}</Text>
              <Text style={styles.commentTime}>{c.time}</Text>
              {selectedCommentId === c.id && (
                <View style={styles.menuOverlay}>
                  <TouchableOpacity
                    onPress={() => {
                      setEditCommentText(c.text);
                      setSelectedCommentId(c.id);
                      setEditModalVisible(true);
                    }}
                    style={styles.menuItem}
                  >
                    <Text style={styles.menuItemText}>Sửa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      const updated = [...comments];
                      updated[currentChapter] = updated[currentChapter].filter((x) => x.id !== c.id);
                      setComments(updated);
                      setSelectedCommentId(null);
                    }}
                    style={styles.menuItem}
                  >
                    <Text style={styles.menuItemText}>Xóa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setReplyTo(c.id);
                      setCommentModalVisible(true);
                      setSelectedCommentId(null);
                    }}
                    style={styles.menuItem}
                  >
                    <Text style={styles.menuItemText}>Trả lời</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          {renderComments(c.id)}
        </View>
      ));
  };

  return (
    
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}

      <Animated.View style={[styles.floatingHeader, { opacity: fadeAnim }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailComic', { comicId, comicTitle })}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{comicTitle}</Text>
        <View style={styles.likes}>
          <Text style={styles.likeText}>{likesCount}</Text>
          <FontAwesome name="thumbs-up" size={14} color="#fff" />
        </View>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}>
        {chapter.images.map((url, i) => (
          <Image key={i} source={{ uri: url }} style={styles.chapterImage} resizeMode="contain" />
        ))}
      </ScrollView>

      <View style={styles.chapterNavBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.chapterNavButton}>
          <Icon name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>
        {currentChapter > 0 && (
          <TouchableOpacity onPress={() => handleChangeChapter(currentChapter - 1)} style={styles.chapterNavButton}>
            <Icon name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <View style={styles.chapterPickerWrapper}>
          <Picker
            selectedValue={currentChapter}
            onValueChange={handleChangeChapter}
            style={styles.chapterPicker}
            dropdownIconColor="#fff"
          >
            {dummyChapters.map((_, i) => (
              <Picker.Item key={i} label={`Chap ${i + 1}`} value={i} />
            ))}
          </Picker>
        </View>
        {currentChapter < dummyChapters.length - 1 && (
          <TouchableOpacity onPress={() => handleChangeChapter(currentChapter + 1)} style={styles.chapterNavButton}>
            <Icon name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setCommentModalVisible(true)} style={styles.chapterNavButton}>
          <Icon name="chatbox-ellipses-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={commentModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bình luận</Text>
            <ScrollView style={{ maxHeight: 200 }}>
              {comments[currentChapter].map((c) => (
                <View key={c.id} style={styles.commentItem}>
                  <Image source={{ uri: c.avatar }} style={styles.avatar} />
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
  <Text style={styles.userName}>{c.userName}</Text>
  {c.userName === 'Bạn' && (
    <View style={styles.memberTag}>
      <Text style={styles.memberTagText}>Thành viên</Text>
    </View>
  )}
</View>

<TouchableOpacity onPress={() => setSelectedCommentId(c.id)}>
  <Icon name="ellipsis-vertical" size={16} color="#555" />
</TouchableOpacity>

{selectedCommentId === c.id && (
  <View style={styles.menuOverlay}>
    <TouchableOpacity
  onPress={() => {
    setEditCommentText(c.text);
    setSelectedCommentId(c.id); // Không set null ở đây
    setEditModalVisible(true);
  }}
  style={styles.menuItem}
>
  <Text style={styles.menuItemText}>Sửa</Text>
</TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        const updated = [...comments];
        updated[currentChapter] = updated[currentChapter].filter((x) => x.id !== c.id);
        setComments(updated);
        setSelectedCommentId(null);
      }}
      style={styles.menuItem}
    >
      <Text style={styles.menuItemText}>Xóa</Text>
    </TouchableOpacity>
  </View>
)}


                    </View>
                    <Text style={styles.commentText}>
                      {c.text.split(' ').map((word, i) =>
                        word.startsWith('@') ? (
                          <Text key={i} style={{ color: '#007AFF' }}>{word} </Text>
                        ) : (
                          word + ' '
                        )
                      )}
                    </Text>
                    <Text style={styles.commentTime}>{c.time}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
              <TextInput
                style={styles.commentInput}
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Nhập bình luận..."
              />
              <TouchableOpacity onPress={handleCommentSubmit} style={styles.commentButton}>
                <Text style={{ color: '#fff' }}>Gửi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
  visible={editModalVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setEditModalVisible(false)}
>
  <View style={styles.editModalBackdrop}>
    <View style={styles.editModalContent}>
      <Text style={styles.modalTitle}>Sửa bình luận</Text>
      <TextInput
        style={styles.editCommentInput}
        value={editCommentText}
        onChangeText={setEditCommentText}
        placeholder="Nhập bình luận mới..."
        placeholderTextColor="#999"
      />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => setEditModalVisible(false)}
          style={[styles.commentButton, { backgroundColor: '#888', marginRight: 8 }]}
        >
          <Text style={{ color: '#fff' }}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity
  onPress={() => {
    if (!selectedCommentId) return;

    const updated = [...comments];
    const chapterComments = updated[currentChapter];
    const index = chapterComments.findIndex((x) => x.id === selectedCommentId);

    if (index !== -1) {
      chapterComments[index] = {
        ...chapterComments[index],
        text: editCommentText.trim(),
      };
      updated[currentChapter] = [...chapterComments];
      setComments(updated);
    }

    setEditModalVisible(false);
    setEditCommentText('');
    setSelectedCommentId(null);
  }}
  style={styles.commentButton}
>
  <Text style={{ color: '#fff' }}>Lưu</Text>
</TouchableOpacity>

      </View>
    </View>
  </View>
</Modal>

    </View>
    
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fefefe' },
  floatingHeader: {
    position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: '#111', height: 56, zIndex: 10,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, justifyContent: 'space-between',
  },
  backButton: { padding: 6 },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', flex: 1, marginLeft: 12 },
  likes: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  likeText: { color: '#fff', fontSize: 14 },
  chapterImage: {
    width: '100%', height: 400, marginBottom: 12, backgroundColor: '#eaeaea', marginTop: 56,
  },
  loadingOverlay: {
    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center', alignItems: 'center', zIndex: 20,
  },
  chapterNavBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#111', paddingVertical: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12,
    zIndex: 100, opacity: 0.98, borderTopWidth: 1, borderTopColor: '#ddd',
  },
  chapterNavButton: {
    padding: 10, backgroundColor: '#F25C05', borderRadius: 30,
  },
  chapterPickerWrapper: {
    flex: 1, marginHorizontal: 10, borderRadius: 6, overflow: 'hidden', backgroundColor: '#F25C05', justifyContent: 'center',
  },
  chapterPicker: { color: '#000', height: 55, width: '100%' },
  commentInput: {
    flex: 1, borderWidth: 1, borderColor: '#bbb', borderRadius: 8, paddingHorizontal: 10,
    paddingVertical: 6, backgroundColor: '#fff', color: '#000',
  },
  commentButton: {
    backgroundColor: '#007AFF', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, marginLeft: 8,
  },
  commentItem: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 14,
  },
  editCommentInput: {
    width: '100%',
    minHeight: 40,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 14,
  },
  
  avatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#ccc',
  },
  userName: {
    fontWeight: 'bold', color: '#000',
  },
  commentText: { color: '#000', fontSize: 14 },
  commentTime: { fontSize: 12, color: '#888' },
  modalBackground: {
    flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)', padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff', borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#000' },
  memberTag: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  memberTagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  menuOverlay: {
    position: 'absolute',
    top: 20,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100,
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menuItemText: {
    color: '#000',
    fontSize: 14,
  },
  editModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    elevation: 10,
  },
  
});

export default ReadChapterScreen;