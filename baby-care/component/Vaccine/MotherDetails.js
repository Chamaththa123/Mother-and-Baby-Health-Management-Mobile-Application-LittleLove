import React, { useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image ,TouchableOpacity} from 'react-native';
import { ref, query, orderByChild, equalTo, push, onValue, set } from 'firebase/database';
import { db } from '../../firebase/config';

const backgroundImage = require('../../assets/bg.png');
const localImage = require('../../assets/user.png');

const MotherDetails = ({ route, navigation }) => {
  const { item } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.userImage}>
          <Image source={localImage} style={styles.imageStyle} />
          </View>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.item}>
            <View style={styles.row}>
            <Text style={styles.text1}>Name:</Text><Text style={styles.text2}>{item.name}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.text1}>Occupation:</Text><Text style={styles.text2}>{item.occupation}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.text1}>Registered No:</Text><Text style={styles.text2}>{item.registeredNo}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.text1}>DDSH Division:</Text><Text style={styles.text2}>{item.DDSH}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.text1}>PHM Area:</Text><Text style={styles.text2}>{item.PHM}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.row}>
            <Text style={styles.text1}>Name:</Text><Text style={styles.text2}>{item.name}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.text1}>Occupation:</Text><Text style={styles.text2}>{item.occupation}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.text1}>Registered No:</Text><Text style={styles.text2}>{item.registeredNo}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.text1}>DDSH Division:</Text><Text style={styles.text2}>{item.DDSH}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.text1}>PHM Area:</Text><Text style={styles.text2}>{item.PHM}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            // Handle button press
          }}
        >
          <Text style={styles.buttonText}>View Mother Clinic & Vaccination Details</Text>
        </TouchableOpacity>
      </View>

      
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
 userImage: {
    alignItems: 'center',
    marginTop:100

  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
    marginTop:30
  },
  item: {
    padding: 20,
    marginBottom: 5,
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
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    resizeMode: 'cover',
  },text1:{

  },row:{
    flexDirection: 'row',
marginBottom:20
  },text1:{
    fontSize:17,
    fontWeight:'900',
    marginLeft:0,
color:'#323232'
  },text2:{
    fontSize:17,
    marginLeft:20,
    marginRight:20,color:'#323232'
  } , buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 13,
    borderRadius: 35,
    height: 50,
    margin:10
  },
  buttonContainer: {
    marginBottom: 30,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MotherDetails;
