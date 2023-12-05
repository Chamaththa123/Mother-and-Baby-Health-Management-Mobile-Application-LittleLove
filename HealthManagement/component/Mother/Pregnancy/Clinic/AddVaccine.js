import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../../../firebase/config";

const AddVaccine = ({ route }) => {
  const { pregnancyId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#57ADF8",
        fontSize: 19,
      },
      headerTintColor: "#57ADF8",
      headerShown: true,
      title: "Add Vaccine Information",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const [Details, setDetails] = useState({
    date: "",
    type: "",
    batch: "",
    week: "",
  });
  const [addedDetails, setAddedDetails] = useState(null);

  const handleDate = (text) => {
    const formattedText = text.replace(/\D/g, "");

    if (formattedText.length <= 2) {
      setDetails({ ...Details, date: formattedText });
    } else if (formattedText.length <= 4) {
      setDetails({
        ...Details,
        date: `${formattedText.slice(0, 2)}-${formattedText.slice(2)}`,
      });
    } else {
      setDetails({
        ...Details,
        date: `${formattedText.slice(0, 2)}-${formattedText.slice(
          2,
          4
        )}-${formattedText.slice(4, 8)}`,
      });
    }
  };

  const handleSaveDetails = () => {
    if (!addedDetails) {
      firebase
        .firestore()
        .collection("vaccine")
        .add({
          pregnancyId: pregnancyId,
          date: Details.date,
          type: Details.type,
          batch: Details.batch,
          week: Details.week,
        })
        .then(() => {
          Alert.alert("Information Added Successfully!");
          setAddedDetails({
            pregnancyId,
            date: Details.date,
            type: Details.type,
            batch: Details.batch,
            week: Details.week,
          });
        })
        .catch((error) => {
          console.error("Error adding details: ", error);
        });
    } else {
      Alert.alert(" details already added");
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.detailText}>Date of Vaccination</Text>
          <TextInput
            placeholder="DD-MM-YYYY"
            style={[styles.textBoxes, { marginTop: -15, width: "39%" }]}
            value={Details.date}
            onChangeText={handleDate}
            keyboardType="numeric"
            maxLength={10}
            onBlur={() => Keyboard.dismiss()}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.detailText}>Type of Vaccine</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.type === "Influenza" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, type: "Influenza" })}
            >
              <Text style={{ textAlign: "center" }}>Influenza</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.type === "Tdap" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, type: "Tdap" })}
            >
              <Text style={{ textAlign: "center" }}>Tdap</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.type === "Rubella" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, type: "Rubella" })}
            >
              <Text style={{ textAlign: "center" }}>Rubella</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.type === "Tet. Toxoid (D1)" &&
                  styles.selectedRadioButton,
              ]}
              onPress={() =>
                setDetails({ ...Details, type: "Tet. Toxoid (D1)" })
              }
            >
              <Text style={{ textAlign: "center" }}>Tet. Toxoid (D1)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.type === "Tet. Toxoid (D2)" &&
                  styles.selectedRadioButton,
              ]}
              onPress={() =>
                setDetails({ ...Details, type: "Tet. Toxoid (D2)" })
              }
            >
              <Text style={{ textAlign: "center" }}>Tet. Toxoid (D2)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.type === "Tet. Toxoid (D3)" &&
                  styles.selectedRadioButton,
              ]}
              onPress={() =>
                setDetails({ ...Details, type: "Tet. Toxoid (D3)" })
              }
            >
              <Text style={{ textAlign: "center" }}>Tet. Toxoid (D3)</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={[styles.detailText, { marginTop: 40 }]}>
            Vaccine Batch No
          </Text>
          <TextInput
            placeholder=""
            style={[styles.textBoxes, { marginTop: 25, width: "39%" }]}
            value={Details.batch}
            onChangeText={(text) => setDetails({ ...Details, batch: text })}
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.detailText, { marginTop: 40 }]}>
            Gestational Duration in Weeks
          </Text>
          <TextInput
            placeholder=""
            style={[styles.textBoxes, { marginTop: 25, width: "39%" }]}
            value={Details.week}
            keyboardType="numeric"
            onChangeText={(text) => setDetails({ ...Details, week: text })}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleSaveDetails}
        >
          <Text style={styles.buttonText}>Add Vaccine Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 15,
    paddingTop: 40,
    justifyContent: "center",
  },
  detailText: {
    fontSize: 14,
    marginBottom: 10,
  },
  textBoxes: {
    width: "100%",
    fontSize: 16,
    padding: 10,
    borderColor: "#FF25A9",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonStyle: {
    backgroundColor: "#FF25A9",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    height: 50,
    marginBottom: 20,
    marginTop: 30,
    borderColor: "#FF25A9",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  radioButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 5,
    marginTop: 35,
    marginBottom: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#FF25A9",
    borderRadius: 5,
    padding: 10,
    width: 100,
  },
  selectedRadioButton: {
    backgroundColor: "#00FF00",
    borderColor: "#00FF00",
  },
});

export default AddVaccine;
