import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Button, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase/config';
import { off } from 'firebase/database';

const backgroundImage = require('../../../assets/bg.png');

const MotherList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const usersRef = ref(db, 'mother');

    // Attach an event listener to get real-time updates
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const dataArray = [];

        for (const key in userData) {
          if (userData.hasOwnProperty(key)) {
            dataArray.push({
              id: key,
              name: userData[key].name,
              email: userData[key].email,
              address: userData[key].address,
              occupation: userData[key].occupation,
              registeredNo: userData[key].registeredNo,
              DDSH: userData[key].DDSH,
              PHM: userData[key].PHM,
            });
          }
        }

        // Update the state with the fetched data
        setData(dataArray);
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      // Remove the event listener
      off(usersRef);
    };
  }, []);

  const handleItemPress = (item) => {
    navigation.navigate('MotherDetails', { item });
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#5bf6db',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color:'#5bf6db'
      },
      headerShown: true,
      title: "",
    });
  }, []);

  // Filter data based on searchText
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.text}>All Mothers List</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Mother"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <View style={styles.card}>
                {/* Card Content */}
                <View style={styles.cardContent}>
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                  <View style={styles.registeredNoContainer}>
                    <Text style={styles.registeredNo}>{item.registeredNo}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
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
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 30,
    borderWidth: 1, // Add border width
    borderColor: '#555', // Add border color
    marginBottom:30
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    height: 55,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  registeredNoContainer: {
    backgroundColor: '#5bf6db',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registeredNo: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default MotherList;
