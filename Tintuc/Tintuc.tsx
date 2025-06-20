import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Định nghĩa kiểu cho navigation
type RootStackParamList = {
  NewsDetail: { 
    newsItem: {
  id: string | number;
  title: string;
  time: string;
  content?: string;  // <-- sửa lại dấu hỏi
  source: string;
  image?: any;
  images?: any[];
}

  };
};
const screenWidth = Dimensions.get('window').width;

const newsList = [
  {
    id: 1,
    title: 'Quy định về đối tượng, nguyên tắc, chính sách tinh giản biên chế',
    source: 'Nhân Dân',
    time: '1 giờ',
    image: require('../assets/news1.png'),
    content: 'Đây là nội dung mô phỏng chi tiết của bài báo để hiển thị trên trang NewsDetail...',
  },
  {
    id: 2,
    title: 'Sáp thơm phòng hương hoa cao cấp, đánh bay mùi hôi...',
    source: 'Gia dụng Tohani',
    time: 'Tài trợ',
    image: require('../assets/news2.png'),
    content: 'Nội dung bài viết chi tiết...',

  },
  {
    id: 3,
    title: 'Sáp thơm phòng hương hoa cao cấp, đánh bay mùi hôi...',
    source: 'Gia dụng Tohani',
    time: 'Tài trợ',
    image: require('../assets/news2.png'),
    content: 'Nội dung bài viết chi tiết...',

  },
  {
    id: 4,
    title: 'Sáp thơm phòng hương hoa cao cấp, đánh bay mùi hôi...',
    source: 'Gia dụng Tohani',
    time: 'Tài trợ',
    image: require('../assets/news2.png'),
    content: 'Nội dung bài viết chi tiết...',

  },
  {
    id: 5,
    title: 'Vụ xe Jeep tông 3 người thương vong ở TP Hồ Chí Minh có liên quan chủ quán bar?',
    source: 'Công an nhân dân',
    time: '1 giờ',
    images: [
      require('../assets/sub1.png'),
      require('../assets/sub2.png'),
      require('../assets/sub3.png'),
    ],
    content: 'Nội dung bài viết chi tiết...',

  },
  {
    id: 6,
    title: 'Sáp thơm phòng hương hoa cao cấp, đánh bay mùi hôi...',
    source: 'Gia dụng Tohani',
    time: 'Tài trợ',
    image: require('../assets/news2.png'),
    content: 'Nội dung bài viết chi tiết...',

  },
  {
    id: 7,
    title: 'Sáp thơm phòng hương hoa cao cấp, đánh bay mùi hôi...',
    source: 'Gia dụng Tohani',
    time: 'Tài trợ',
    image: require('../assets/news2.png'),
    content: 'Nội dung bài viết chi tiết...',

  },
  {
    id: 8,
    title: 'Sáp thơm phòng hương hoa cao cấp, đánh bay mùi hôi...',
    source: 'Gia dụng Tohani',
    time: 'Tài trợ',
    image: require('../assets/news2.png'),
    content: 'Nội dung bài viết chi tiết...',

  },
   {
    id: 9,
    title: 'Vụ xe Jeep tông 3 người thương vong ở TP Hồ Chí Minh có liên quan chủ quán bar?',
    source: 'Công an nhân dân',
    time: '1 giờ',
    images: [
      require('../assets/sub1.png'),
      require('../assets/sub2.png'),
      require('../assets/sub3.png'),
    ],
    content: 'Nội dung bài viết chi tiết...',

  },
];


const Tintuc = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>

      {/* News list */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {newsList.map((item) => (
  <TouchableOpacity
    key={item.id}
    onPress={() => navigation.navigate('NewsDetail', { newsItem: item })}
    style={styles.card}
  >
    <View style={styles.cardContent}>
      {item.image && <Image source={item.image} style={styles.thumbnail} />}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.metaInfo}>
          <Text style={styles.source}>{item.source}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </View>

    {item.images && (
      <View style={styles.multiImages}>
        {item.images.map((img, idx) => (
          <Image key={idx} source={img} style={styles.subImage} />
        ))}
      </View>
    )}
  </TouchableOpacity>
))}

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <Icon name="newspaper-outline" size={20} color="#008080" />
          <Text style={styles.navLabelActive}>Tin tức</Text>
        </TouchableOpacity>
        {/* Các tab khác giữ nguyên */}
      </View>
    </View>
  );
};


export default Tintuc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, 
  header: {
    flexDirection: 'row',
    backgroundColor: '#008080',
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
  fontSize: 12,
  color: '#999',
},
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    color: '#b3e5e5',
    marginHorizontal: 8,
  },
  tabActive: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  updateBox: {
    alignSelf: 'center',
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  updateText: {
    marginRight: 5,
    fontSize: 12,
    color: '#008080',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  newsItem: {
    marginBottom: 20,
  },
  card: {
  backgroundColor: '#fff',
  borderRadius: 10,
  marginVertical: 8,
  padding: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},
cardContent: {
  flexDirection: 'row',
  marginBottom: 8,
},

 thumbnail: {
  width: 100,
  height: 70,
  borderRadius: 8,
  marginRight: 10,
},
  title: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 4,
},
  source: {
  color: '#E53935',
  fontSize: 12,
  fontWeight: '600',
},
  multiImages: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 8,
},
 subImage: {
  width: (screenWidth - 40) / 3,
  height: 70,
  borderRadius: 6,
},
  bottomNav: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingVertical: 10,
  borderTopWidth: 1,
  borderColor: '#eee',
  backgroundColor: '#fff',
},
  navItem: {
    alignItems: 'center',
  },
navItemActive: {
  alignItems: 'center',
},
  navLabel: {
    fontSize: 12,
    color: '#999',
  },
  navLabelActive: {
  fontSize: 12,
  color: '#008080',
  marginTop: 4,
},
  metaInfo: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
});
