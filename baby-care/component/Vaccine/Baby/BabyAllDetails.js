import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

const Tab1Screen = () => (
  <View style={styles.scene}>
    <Text>Tab 1 Content</Text>
  </View>
);

const Tab2Screen = () => (
  <View style={styles.scene}>
    <Text>Tab 2 Content</Text>
  </View>
);

const initialRoutes = [
  { key: 'tab1', title: 'Tab 1' },
  { key: 'tab2', title: 'Tab 2' },
];

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(initialRoutes);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'tab1':
        return <Tab1Screen />;
      case 'tab2':
        return <Tab2Screen />;
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'blue' }}
          style={{ backgroundColor: 'white' }}
          labelStyle={{ color: 'black' }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
