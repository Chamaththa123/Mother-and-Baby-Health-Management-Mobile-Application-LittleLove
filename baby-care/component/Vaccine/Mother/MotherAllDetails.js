import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import VaccineDetails from './MotherVaccine';
import AllClinic from './MotherAllClinic';

const initialRoutes = [
  { key: 'tab1', title: 'Vaccination' },
  { key: 'tab2', title: 'Clinic' },
];

const All = ({ route, navigation }) => {
  const { item } = route.params;

  useEffect(() => {
    // Set navigation options
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#5bf6db',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerShown: true,
      title: item.name,
    });
  }, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState(initialRoutes);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'tab1':
        return <VaccineDetails data={item} />;
      case 'tab2':
        return <AllClinic data={item} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
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
  buttonContainer: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 30,
  },
  buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 13,
    borderRadius: 10,
    width: 150,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5, 
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: '#5bf6db',
  },
});

export default All;
