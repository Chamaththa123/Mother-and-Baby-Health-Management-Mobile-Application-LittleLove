import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, get, onValue } from 'firebase/database';
import { db } from '../../../firebase/config';

const ClinicDetails = ({ data }) => {
  const navigation = useNavigation();

  // const getBPStatus = (bp) => {
  //   if (bp < 90) {
  //     return "Low Blood Pressure";
  //   } else if (bp >= 90 && bp < 120) {
  //     return "Normal Blood Pressure";
  //   } else if (bp >= 120 && bp < 130) {
  //     return "Elevated Blood Pressure";
  //   } else if (bp >= 130 && bp < 140) {
  //     return "High Blood Pressure (Stage 1)";
  //   } else {
  //     return "High Blood Pressure (Stage 2)";
  //   }
  // };

  // const getBPStatusStyle = (bp) => {
  //   const status = getBPStatus(bp);
  //   switch (status) {
  //     case "Low Blood Pressure":
  //       return { backgroundColor: '#FFA67F', fontWeight: "bold" };
  //     case "Normal Blood Pressure":
  //       return { backgroundColor: '#2BBF00', fontWeight: "bold" };
  //     case "Elevated Blood Pressure":
  //       return { backgroundColor: '#CFFF1B', fontWeight: "bold" };
  //     case "High Blood Pressure (Stage 1)":
  //       return { backgroundColor: '#FF5500', fontWeight: "bold" };
  //     case "High Blood Pressure (Stage 2)":
  //       return { backgroundColor: '#D30303', fontWeight: "bold" };
  //     default:
  //       return {};
  //   }
  // };


  // useEffect(() => {
  //   const clinicRef = ref(db, 'Clinic');
  //   const userClinicQuery = query(
  //     clinicRef,
  //     orderByChild('motherId'),
  //     equalTo(data.id)
  //   );

  //   const unsubscribe = onValue(userClinicQuery, (snapshot) => {
  //     if (snapshot.exists()) {
  //       const clinicData = snapshot.val();
  //       const clinicArray = Object.values(clinicData);
  //       clinicArray.reverse();
  //       setClinicData(clinicArray);
  //     } else {
  //       setClinicData([]);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [data.id]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('AddBabyClinic', { data });
            }}
          >
            <Text style={styles.buttonText}>Add Details</Text>
          </TouchableOpacity>
        </View>

        {/* {clinicData.map((item, index) => (
          <View style={styles.card} key={index}>
            <Text style={styles.cardText}>
              <Text style={styles.cardHeader}>Mother Gestational Duration  :</Text> {item.week} Week
            </Text><Text style={styles.cardText}>
              <Text style={styles.cardHeader}>Maternal Weight:</Text> {item.weight} Kg
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.cardHeader}>Fundal Height:</Text> {item.F_height} cm
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.cardHeader}>Blood Pressure:</Text> {item.bp} mm Hg
            </Text>

            <View style={[styles.card2, getBPStatusStyle(item.bp)]} key={index}>
              <Text style={[styles.cardStatus, getBPStatusStyle(item.bp)]}>
                {getBPStatus(item.bp)}
              </Text>
            </View>

          </View>
        ))}
        {clinicData.length === 0 && (
          <Text>No clinic data available for this user.</Text>
        )} */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  card: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 1.5,
  },
  card2: {
    marginVertical: 5,
    padding: 6,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 1.5,
  },
  cardText: {
    fontSize: 16,
  },
  cardStatus: {
    fontSize: 16,
    textAlign: 'center'
  },
  cardHeader: {
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 13,
    borderRadius: 10,
    height: 50,
    width: 130,
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});


export default ClinicDetails;
