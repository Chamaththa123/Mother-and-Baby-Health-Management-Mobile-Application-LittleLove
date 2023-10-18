import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import BabyVaccine from './BabyVaccine';

const backgroundImage = require('../../../assets/bg.png');
const localImage = require('../../../assets/mother.png');

const Tab1Screen = ({baby}) => (
  <View style={styles.scene}>
    <BabyVaccine data={baby}/>
  </View>
);

const Tab2Screen = () => (
  <View style={styles.scene}>
    <Text>Tab 2 Content</Text>
  </View>
);

const initialRoutes = [
  { key: 'tab1', title: 'Vaccination' },
  { key: 'tab2', title: 'Tab 2' },
];

const BabyAllDetails = ({ route, navigation }) => {

  const { baby } = route.params;

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
        return <Tab1Screen baby={baby}/>;
      case 'tab2':
        return <Tab2Screen  baby={baby}/>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
          <Image source={localImage} style={styles.imageStyle} />
          <Text style={styles.text}>{baby.babyname}</Text>
        </View>
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
    </View>
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
    marginRight: 90
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 50,
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
    width: 70,
    height: 70,
    resizeMode: 'cover',
  },
  scene: {
    flex: 1,

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
export default BabyAllDetails;
