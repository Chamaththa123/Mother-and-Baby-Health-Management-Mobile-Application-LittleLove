import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import BabyClinic from './BabyClinic';
// import BabyHealthGraphs from './HealthGraphs/BabyHealthGraphs';
// import ClinicDetails from './ClinicDetails';
// import HealthGraphs from './HealthGraphs';


const Tab1Screen = ({ item }) => (
  <View>
    <BabyClinic data={item} />
  </View>
);

const Tab2Screen = ({ item }) => (
  <View>
    {/* <BabyHealthGraphs data={item}/> */}

  </View>
);

const initialRoutes = [
  { key: 'tab1', title: 'Clinic Details' },
  { key: 'tab2', title: 'Health Graphs' },
];

const BabyAllClinic = ({ route, navigation, data }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(initialRoutes);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'tab1':
        return <Tab1Screen item={data} />;
      case 'tab2':
        return <Tab2Screen item={data} />;
      default:
        return null;
    }
  };

  return (

    <View style={styles.container}>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <View style={styles.tabBarContainer}>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: '#0D907E' }}
              style={styles.tabBar}
              labelStyle={{ color: 'black' }}
            />
          </View>
        )}
        style={{ marginTop: 20 }}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  tabBarContainer: {
    backgroundColor: 'white',
    overflow: 'hidden',
    margin: 5,
  },
  tabBar: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#5bf6db',
  },
});

export default BabyAllClinic;
