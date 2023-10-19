import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';

const backgroundImage = require('../../../assets/bg.png');
const localImage = require('../../../assets/girl.png');
const BabyDetails = ({ route,navigation }) => {
  const { baby } = route.params;

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
      title: baby.babyname,
    });
  }, []);

  const handleBabyPress = (baby) => {
    navigation.navigate('BabyAllDetails', { baby }); // Navigate to BabyDetails and pass the baby data
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
<ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <Image source={localImage} style={styles.imageStyle} />
            <Text style={styles.name}>{baby.babyname}</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.text1}>BirthDay:</Text>
              <Text style={styles.text2}>{baby.bday}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>Time of Birth:</Text>
              <Text style={styles.text2}>{baby.bday}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>Gender:</Text>
              <Text style={styles.text2}>{baby.gender}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>Birth Weight:</Text>
              <Text style={styles.text2}>{baby.bweight}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>Length aty Birth:</Text>
              <Text style={styles.text2}>{baby.blength}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                handleBabyPress(baby);
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 50,
        marginLeft: 20,
        width: 260,
      },
      item: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        margin: 10,
        marginTop:40,
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
        marginTop: 30,
      },
      row: {
        flexDirection: 'row',
        marginBottom: 20,
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
        borderRadius: 10,
        height: 50,
        margin: 10,
        borderColor: 'gray',
        borderWidth: 0.5,
    
      },
      buttonContainer: {
        marginBottom: 30,
      },
      buttonContainer2: {
        marginBottom: 20,
        width: 140,
        marginLeft: -17,
      },
      buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      }, 
});

export default BabyDetails;
