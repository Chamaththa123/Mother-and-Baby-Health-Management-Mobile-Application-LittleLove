import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { db } from '../../../firebase/config';
import ProgressBar from 'react-native-progress/Bar';

const VaccineDetails = ({ data }) => {
  const navigation = useNavigation();
  const [vaccineData, setVaccineData] = useState([]);
  const [vaccineCount, setVaccineCount] = useState(0);

  useEffect(() => {
    const vaccineRef = ref(db, 'Vaccine');
    const userVaccineQuery = query(
      vaccineRef,
      orderByChild('motherId'),
      equalTo(data.id)
    );

    const unsubscribe = onValue(userVaccineQuery, (snapshot) => {
      if (snapshot.exists()) {
        const vaccineData = snapshot.val();
        const vaccineArray = Object.values(vaccineData);
        setVaccineData(vaccineArray);
        setVaccineCount(vaccineArray.length);
      } else {
        setVaccineData([]);
        setVaccineCount(0);
      }
    });

    return () => unsubscribe();
  }, [data.id]);

  const totalVaccineDoses = 5;
  const vaccinePercentage = (vaccineCount / totalVaccineDoses) * 100;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('AddVaccine', { data })}>
            <Text style={styles.buttonText}>Add Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressBarContainer}>
          {/* Progress bar and related information */}
          <View style={styles.progressBarText}>
            <View style={styles.redDot} />
            <Text style={styles.vaccineCountText}>
              {vaccinePercentage}% of the mother's vaccination process is complete.
            </Text>
          </View>
          <ProgressBar
            progress={vaccinePercentage / 100}
            width={null}
            height={15}
            color="#1DC4FE"
            style={{ marginBottom: 20, borderRadius: 30 }}
          />

          {/* Number of vaccine information */}
          <View style={styles.progressBarText}>
            <View style={styles.redDot} />
            <Text style={styles.vaccineCountText}>
              Number of vaccine to be given: {totalVaccineDoses}
            </Text>
          </View>

          {/* Number of injections received information */}
          <View style={styles.progressBarText}>
            <View style={styles.redDot} />
            <Text style={styles.vaccineCountText}>
              Number of vaccine received: {vaccineCount}
            </Text>
          </View>
        </View>

        {vaccineData.map((item, index) => (
          <View style={styles.card} key={index}>
            <Text style={styles.cardText}>
              <Text style={styles.cardHeader}>Mother Gestational Duration (Weeks):</Text> {item.age} Week
            </Text>
            <Text style={styles.cardText2}>
              <Text style={styles.cardHeader}>Type of Vaccine:</Text> {item.type}
            </Text>
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={styles.cardText}>
                  <Text style={styles.cardHeader}>Date:</Text> {item.date}
                </Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.cardText2}>
                  <Text style={styles.cardHeader}>Batch No:</Text> {item.batch}
                </Text>
              </View>
            </View>
          </View>
        ))}
        {vaccineData.length === 0 && <Text>No vaccine data available for this user.</Text>}
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
  cardText: {
    fontSize: 16,
  },
  cardText2: {
    fontSize: 16,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  cardHeader: {
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 15,
    borderRadius: 10,
    height: 50,
    width: 130,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  buttonContainer: {
    marginTop: 10,
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
  progressBarContainer: {
    marginTop: 20,
  },
  progressBarText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redDot: {
    width: 10,
    height: 10,
    backgroundColor: '#1DC4FE',
    borderRadius: 5,
    marginRight: 10,
    marginTop: -20,
  },
  vaccineCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '90%',
    marginBottom: 20,
  },
});

export default VaccineDetails;
