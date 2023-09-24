import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const MyTable = () => {
  return (
    <View style={styles.container}>

<View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            // Handle button press
          }}
        >
          <Text style={styles.buttonText}>Add Details</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.card}>
        {/* Card Content */}
        <Text style={styles.cardTitle}>Card Title</Text>
        <Text style={styles.cardDetails}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, paddingTop: 30, backgroundColor: '#fff' },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDetails: {
    fontSize: 16,
    color: '#555',
  },
  buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 13,
    borderRadius: 35,
    width: 150,
    height: 50,
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

export default MyTable;
