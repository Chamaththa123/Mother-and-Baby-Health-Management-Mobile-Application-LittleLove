import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ImageBackground, Image } from 'react-native';

const headerImage = require('../assets/logo.png'); // Replace with your image path
const Midwife = require('../assets/nurse.png'); // Replace with your image path

const Home = ({ navigation }) => {
  
    useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
  return (
    
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={headerImage} style={styles.headerImage} />
          <Text style={styles.headerText}>Little Love</Text>
          <View style={styles.card}>
            <View style={styles.row}>
            <Text style={styles.headerWelcome}>Welcome</Text>
            <Image source={Midwife} style={styles.midwifeImage} />
            </View>
            
            <Text style={styles.headerName}>Chamaththa Shamod MAdhumlakS</Text>
            
          </View>
        </View>
        <Text style={styles.text1}>Manager Mothers & Children</Text>
        <View style={styles.row2}>
        <View style={styles.menucard}>
            <Text style={styles.cardText}>Create Mother Profile</Text>
            
          </View>
          <View style={styles.menucard}>
            <Text style={styles.cardText}>All Mothers</Text>
            
          </View><View style={styles.menucard}>
            <Text style={styles.cardText}>Scan Mother Qr</Text>
            
          </View>
            </View>

            <Text style={styles.text1}>Manager Mothers & Children</Text>
        <View style={styles.row2}>
        <View style={styles.menucard}>
            <Text style={styles.cardText}>Create Mother Profile</Text>
            
          </View>
          <View style={styles.menucard}>
            <Text style={styles.cardText}>All Mothers</Text>
            
          </View><View style={styles.menucard}>
            <Text style={styles.cardText}>Scan Mother Qr</Text>
            
          </View>
            </View>
        
        <Text style={styles.text}>All Data from Firebase</Text>
        <Button title='Add Mother' onPress={() => navigation.navigate('AddMother')} />
        <Button title='Mother List' onPress={() => navigation.navigate('MotherList')} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',backgroundColor:'white'
  },
  header: {
    backgroundColor: '#0268C2',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15
  },
  headerImage: {
    marginTop: '10%',
    width: 70,
    height: 70,
  },
  midwifeImage: {
    // marginTop: '10%',
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  headerWelcome: {
    fontSize: 18,
    // color: 'white',
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 16,
    // color: 'white',
 fontWeight:"900",
    marginLeft:20,
    marginTop:30
  },
  headerName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop:'-4.9%'
  },
  card: {
    backgroundColor: 'white',
    marginTop: 40,
    padding: 10,
    borderRadius: 10,
    width:'100%'
  },
  menucard: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    width:100,
    borderWidth:1,
    borderColor:'#0268C2',
    height:100,        justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 13,
    fontWeight: 'bold',color:'gray',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  row:{
    flexDirection: 'row',justifyContent: 'space-between'
  },
  row2:{
    flexDirection: 'row',justifyContent: 'space-between',marginLeft:20,marginRight:20
  }
});

export default Home;
