import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import VaccineDetails from './VaccineDetails';

const backgroundImage = require('../../assets/bg.png');
const localImage = require('../../assets/user.png');

const Tab1Screen = () => (
  <View >
    <VaccineDetails/>
  </View>
);

const Tab2Screen = () => (
  <View style={styles.scene}>
    <Text>Tab 2 Content</Text>
  </View>
);

// Change the tab names here
const initialRoutes = [
  { key: 'tab1', title: 'Vaccination' }, // Change 'Tab 1' to 'Clinic'
  { key: 'tab2', title: 'Clinic' }, // Change 'Tab 2' to 'Vaccination'
];

const All = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Image source={localImage} style={styles.imageStyle} />
          <Text style={styles.text}>Aruni Balasooriya</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              // Handle button press
            }}
          >
            <Text style={styles.buttonText}>Clinic Schedules</Text>
          </TouchableOpacity>
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => (
            <View style={styles.tabBarContainer}>
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: 'blue' }}
                style={styles.tabBar}
                labelStyle={{ color: 'black' }}
              />
            </View>
          )}
          // Reduce the marginTop here to adjust the gap
          style={{ marginTop: 20 }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 70,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 80,
  },
  buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 13,
    borderRadius: 35,
    width: 150,
    height: 50,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarContainer: {
    backgroundColor: 'white',
    overflow: 'hidden',
    margin: 5,
  },
  tabBar: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor:'#5bf6db'
  },
});

export default All;
