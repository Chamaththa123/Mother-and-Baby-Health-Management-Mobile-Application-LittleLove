import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

const VaccineInfo = ({ pregnancyId }) => {
  const a = 12;

  const renderTextWithColor = (index) => {
    if (index < a) {
      return <View style={styles.card2}></View>;
    } else {
      return <View style={styles.card3}></View>;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.progress}>Current Vaccine Progress</Text>
        <View style={styles.row}>
          {[...Array(20).keys()].map((index) => (
            <React.Fragment key={index}>
              {renderTextWithColor(index)}
            </React.Fragment>
          ))}
          <Text style={styles.progress}>12%</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#fff",
    padding: 10,
  },
  progress: {
    fontSize: 16,
    marginBottom: "-3%",
  },
  card2: {
    backgroundColor: "#00FF00",
    borderWidth: 1,
    borderColor: "#00FF00",
    borderRadius: 10,
    width: 8,
    height: 15,
    alignSelf: "center",
    marginLeft: -8,
  },
  card3: {
    backgroundColor: "#CCCCCC",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    width: 8,
    height: 15,
    alignSelf: "center",
    marginLeft: -8,
  },
  buttonStyle: {
    backgroundColor: "#FF25A9",
    padding: 13,
    borderRadius: 10,
    width: 60,
    height: 50,
    margin: 10,
    marginLeft: 20,
    marginBottom: 20,
    borderColor: "#FF25A9",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "10%",
  },
  coloredText: {
    marginRight: 10,
    color: "red", // Change this to your preferred color
  },
  defaultText: {
    marginRight: 10,
    color: "black", // Change this to your default color
  },
});

export default VaccineInfo;
