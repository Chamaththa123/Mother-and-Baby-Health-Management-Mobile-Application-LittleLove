import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VaccineDetails = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Vaccine Details</Text>
      <Text>ID: {data.id}</Text>
      <Text>Name: {data.name}</Text>
      <Text>Email: {data.email}</Text>
      <Text>Address: {data.address}</Text>
      <Text>Occupation: {data.occupation}</Text>
      <Text>Registered No: {data.registeredNo}</Text>
      <Text>DDSH: {data.DDSH}</Text>
      <Text>PHM: {data.PHM}</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddVaccine', { data });
        }}
      >
        <Text>Go to Other Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VaccineDetails;
