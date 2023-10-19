// Import React and necessary components and modules
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from 'firebase/database';
import { db } from '../../../firebase/config';

// Import background and image assets
import backgroundImage from '../../../assets/bg.png';
import localImage from '../../../assets/mother.png';
import localImage2 from '../../../assets/girl.png';

const MotherDetails = ({ route, navigation }) => {
  // Destructure the 'item' from the route parameters
  const { item } = route.params;

  // State to store the baby data
  const [baby, setBaby] = useState([]);

  // Effect to fetch baby data related to this mother
  useEffect(() => {
    // Create a reference to the 'Baby' data in Firebase
    const babyRef = ref(db, 'Baby');
    const motherBabyQuery = query(babyRef, orderByChild('motherId'), equalTo(item.id));

    // Listen for changes to the baby data and update the state
    const unsubscribe = onValue(motherBabyQuery, (snapshot) => {
      if (snapshot.exists()) {
        const babyData = snapshot.val();
        const babyArray = Object.entries(babyData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setBaby(babyArray);
      } else {
        // If no babies found for the user, set an empty array
        setBaby([]);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [item.id]);

  // Effect to hide the header on this screen
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#5bf6db',
      },
      headerTitleStyle: {
        color:'#5bf6db'
      },
      headerShown: true,
      headerTitle: null, // Set headerTitle to null to hide the default title
    });
  }, []);
  
  

  // Handler for 'Add Baby' button press
  const handleItemPress = () => {
    navigation.navigate('AddBaby', { item });
  };

  // Handler for 'View Mother Clinic & Vaccination Details' button press
  const handlePress = () => {
    navigation.navigate('AllVaccine', { item });
  };

  // Handler for individual baby press, navigate to baby details
  const handleBabyPress = (babyItem) => {
    navigation.navigate('BabyDetails', { baby: babyItem });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <Image source={localImage} style={styles.imageStyle} />
            <Text style={styles.name}>{item.name}</Text>
          </View>

          {/* Mother's Information */}
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

          {/* 'Add Baby' Button */}
          <View style={styles.item}>
            <View style={styles.buttonContainer2}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleItemPress}
              >
                <Text style={styles.buttonText}>Add Baby</Text>
              </TouchableOpacity>
            </View>

            {/* List of Babies */}
            <View>
              {baby.map((babyItem, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() => handleBabyPress(babyItem)}
                >
                  <View style={styles.row2}>
                    <Image source={localImage2} style={styles.babyImage} />
                    <Text style={{ marginTop: "3.1%", marginLeft: "3.1%" }}>
                      {babyItem.babyname}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 'View Mother Clinic & Vaccination Details' Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonStyle2}
              onPress={handlePress}
            >
              <Text style={styles.buttonText}>View Mother Clinic & Vaccination Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

// Styles for components
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
    marginTop: "10%",
    marginLeft: "4%",
    width: '74%',
  },
  item: {
    padding: '3%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: '2.3%',
    borderWidth: 2,
    borderColor: '#5bf6db',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginLeft: '4%',
    marginTop: '5%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: '4%',
  },
  row2: {
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
    padding: "10%",
    borderRadius: 5,
    height: 50,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  buttonStyle2: {
    backgroundColor: '#5bf6db',
    padding: "3.7%",
    borderRadius: 5,
    height: 50,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  buttonContainer: {
    marginBottom: "2%",
  },
  buttonContainer2: {
    marginBottom: "3%",
    width: 140,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  babyImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    marginLeft: 0,
    marginTop: 0,
  },
});

export default MotherDetails;
