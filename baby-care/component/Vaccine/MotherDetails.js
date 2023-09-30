import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { db } from '../../firebase/config';

const backgroundImage = require('../../assets/bg.png');
const localImage = require('../../assets/mother.png');
const localImage2 = require('../../assets/girl.png');

const MotherDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [baby, setBaby] = useState([]);

  useEffect(() => {
    // Create a reference to the babies for the specific mother
    const babyRef = ref(db, 'Baby');
    const motherBabyQuery = query(babyRef, orderByChild('motherId'), equalTo(item.id));

    // Listen for changes to the babies and update the state
    const unsubscribe = onValue(motherBabyQuery, (snapshot) => {
      if (snapshot.exists()) {
        const babyData = snapshot.val();
        const babyArray = Object.values(babyData);
        setBaby(babyArray);
      } else {
        // If no babies found for the user, set an empty array
        setBaby([]);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [item.id]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleItemPress = (item) => {
    navigation.navigate('AddBaby', { item });
  };

  const handlePress = (item) => {
    navigation.navigate('AllVaccine', { item });
  };

  const handleBabyPress = (baby) => {
    navigation.navigate('BabyDetails', { baby }); // Navigate to BabyDetails and pass the baby data
  };

  return (

    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <Image source={localImage} style={styles.imageStyle} />
            <Text style={styles.name}>{item.name}</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.text1}>Name:</Text>
              <Text style={styles.text2}>{item.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>Occupation:</Text>
              <Text style={styles.text2}>{item.occupation}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>Registered No:</Text>
              <Text style={styles.text2}>{item.registeredNo}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>DDSH Division:</Text>
              <Text style={styles.text2}>{item.DDSH}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>PHM Area:</Text>
              <Text style={styles.text2}>{item.PHM}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.buttonContainer2}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  handleItemPress(item);
                }}
              >
                <Text style={styles.buttonText}>Add Baby</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>Baby:</Text>
            </View>

            <View >
              {baby.map((babys, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() => handleBabyPress(babys)}
                >
                  <View style={styles.row2}>
                    <Image source={localImage2} style={styles.babyImage} />
                    <Text style={{ marginTop: 10, marginLeft: 10 }}>
                      {babys.babyname}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                handlePress(item)
              }}
            >
              <Text style={styles.buttonText}>View Mother Clinic & Vaccination Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    padding: 0,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 70,
    marginLeft: 10,
    width: 260,
  },
  item: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 10,
    borderWidth: 2, // Add border width
    borderColor: '#5bf6db', // Add border color
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 80, // Adjust the width as needed
    height: 80, // Adjust the height as needed
    resizeMode: 'cover',
    marginLeft: 20,
    marginTop: 60,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  }, row2: {
    flexDirection: 'row',
  },
  text1: {
    fontSize: 17,
    fontWeight: '900',
    color: '#323232',
  },
  text2: {
    fontSize: 17,
    marginLeft: 20,
    marginRight: 25,
    color: '#323232',
  },
  buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 13,
    borderRadius: 5,
    height: 50,
    margin: 10,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  buttonContainer2: {
    marginBottom: 20,
    width: 140,
    marginLeft: 0,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }, babyImage: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    resizeMode: 'cover',
    marginLeft: 0,
    marginTop: 0,
  },
});

export default MotherDetails;
