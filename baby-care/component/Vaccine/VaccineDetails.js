import React from 'react';
import { View, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { Table, Row } from 'react-native-table-component';

const MyTable = () => {
  const tableHead = ['Header 1', 'Header 2', 'Header 3','Header 4'];
  const tableData = [
    ['Data 1', 'Data 2', 'Data 3','Data 4'],
    ['Data 4', 'Data 5', 'Data 6','Data 4'],
    ['Data 7', 'Data 8', 'Data 9','Data 4'],
  ];

  const textStyle = {
    margin: 6,
    // Add any other text styles you want here
  };

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
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row data={tableHead} style={styles.head} textStyle={textStyle} />
        {tableData.map((rowData, index) => (
          <Row
            key={index}
            data={rowData}
            style={styles.row}
            textStyle={textStyle}
          />
        ))}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#95fce9'},
  row: { height: 40 }, buttonStyle: {
    backgroundColor: '#5bf6db',
    padding: 13,
    borderRadius: 35,
    width: 150,
    height: 50,
  },buttonContainer: {
marginBottom: 30
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center'
  },
});

export default MyTable;
