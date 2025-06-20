import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
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

type NewsDetailRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

const NewsDetail = ({ route }: { route: NewsDetailRouteProp }) => {
  const { newsItem } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{newsItem.title}</Text>
      <Text style={styles.source}>{newsItem.source}</Text>
      <Text style={styles.time}>{newsItem.time}</Text>

      {newsItem.image && (
        <Image source={newsItem.image} style={styles.image} />
      )}

      {newsItem.content ? (
        <Text style={styles.content}>{newsItem.content}</Text>
      ) : (
        <Text style={styles.content}>Nội dung đang được cập nhật...</Text>
      )}

      {newsItem.images && (
        <View style={styles.imageRow}>
          {newsItem.images.map((img, idx) => (
            <Image key={idx} source={img} style={styles.subImage} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  source: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    color: '#666',
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  subImage: {
    width: '32%',
    height: 100,
    borderRadius: 4,
  },
});

export default NewsDetail;
