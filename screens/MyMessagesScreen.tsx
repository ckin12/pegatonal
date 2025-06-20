import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const tabs = [
  { title: 'Bình luận', icon: 'chatbubble-outline', color: '#33CCFF' },
  { title: 'Lượt thích', icon: 'thumbs-up-outline', color: '#FF5E57' },
  { title: 'Được gắn tag', icon: 'search-outline', color: '#FFD43B' },
  { title: 'Theo dõi +', icon: 'person-outline', color: '#FF66CC' },
];

const MessageScreen = () => {
  const [activeSubTab, setActiveSubTab] = useState<'Trò chuyện' | 'Thông báo'>('Trò chuyện');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tin nhắn của tôi</Text>
        <View style={{ width: 24 }} /> {/* Placeholder to balance layout */}
      </View>

      {/* Top Tabs */}
      <View style={styles.topTabs}>
        {tabs.map((tab, idx) => (
          <TouchableOpacity key={idx} style={styles.tabItem}>
            <View style={[styles.iconCircle, { backgroundColor: tab.color }]}>
              <Icon name={tab.icon} size={20} color="#fff" />
            </View>
            <Text style={styles.tabLabel}>{tab.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sub Tabs */}
      <View style={styles.subTabBar}>
        <TouchableOpacity onPress={() => setActiveSubTab('Trò chuyện')} style={styles.subTab}>
          <Text style={[styles.subTabText, activeSubTab === 'Trò chuyện' && styles.activeTabText]}>
            Trò chuyện
          </Text>
          {activeSubTab === 'Trò chuyện' && <View style={styles.activeLine} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveSubTab('Thông báo')} style={styles.subTab}>
          <Text style={[styles.subTabText, activeSubTab === 'Thông báo' && styles.activeTabText]}>
            Thông báo
          </Text>
          {activeSubTab === 'Thông báo' && <View style={styles.activeLine} />}
        </TouchableOpacity>
      </View>

      {/* Empty State */}
      <View style={styles.emptyState}>
        <Image
          source={require('../assets/news1.png')} // thay bằng hình icon astronaut hoặc icon phù hợp
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyText}>Dữ liệu trống</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  topTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  tabItem: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tabLabel: {
    color: '#fff',
    fontSize: 12,
  },
  subTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  subTab: {
    alignItems: 'center',
    paddingVertical: 12,
    flex: 1,
  },
  subTabText: {
    color: '#aaa',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeLine: {
    width: 24,
    height: 2,
    backgroundColor: '#FF3B5C',
    marginTop: 6,
    borderRadius: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    width: 80,
    height: 80,
    marginBottom: 10,
    tintColor: '#666', // nếu ảnh là PNG 1 màu
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
});


export default MessageScreen;
