import React, { useState, ReactElement } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';

const HistoryRoute = () => (
  <View style={styles.content}>
    <Text style={styles.text}>Lịch sử đọc truyện</Text>
  </View>
);

const FollowRoute = () => (
  <View style={styles.content}>
    <Text style={styles.text}>Truyện đang theo dõi</Text>
  </View>
);

const DownloadRoute = () => (
  <View style={styles.content}>
    <Text style={styles.text}>Truyện đã tải xuống</Text>
  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

type Route = {
  key: string;
  title: string;
};

const BookshelfScreen = (): ReactElement => {
  const [index, setIndex] = useState(0);
  const [routes] = useState<Route[]>([
    { key: 'history', title: 'Lịch sử' },
    { key: 'follow', title: 'Theo dõi' },
    { key: 'download', title: 'Tải xuống' },
  ]);

  const renderScene = SceneMap({
    history: HistoryRoute,
    follow: FollowRoute,
    download: DownloadRoute,
  });

  const renderCustomTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<Route> }
  ): ReactElement => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: '#121212' }}
        renderLabel={({ route, focused }: { route: Route; focused: boolean }): ReactElement => (
          <Text
            style={{
              color: focused ? 'white' : '#888',
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            {route.title}
          </Text>
        )}
      />
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderCustomTabBar}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default BookshelfScreen;
