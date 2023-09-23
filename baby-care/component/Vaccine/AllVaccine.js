import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ImageBackground } from 'react-native';

const backgroundImage = require('../../assets/bg.png');
const AllVaccine = ({ navigation }) => {
  
    useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.text}>All AllVaccine</Text>
      
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default AllVaccine;
