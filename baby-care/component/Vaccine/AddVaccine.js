import React from 'react';
import { View, Text } from 'react-native';

const OtherPage = ({ route }) => {
  const { data } = route.params;

  return (
    <View>
      <Text>Received Data</Text>
      <Text>ID: {data.id}</Text>
      <Text>Name: {data.name}</Text>
      <Text>Name: {data.email}</Text>
      {/* Access other properties of the data object */}
    </View>
  );
};

export default OtherPage;
