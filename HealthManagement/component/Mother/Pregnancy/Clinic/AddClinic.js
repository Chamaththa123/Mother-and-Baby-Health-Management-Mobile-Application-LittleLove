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

const AddClinic = ({ route }) => {
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
      title: "Add Clinic Information",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const [Details, setDetails] = useState({
    date: "",
    week: "",
    oedema: "",
    bp: "",
    f_weight: "",
    fm: "",
    fhs: "",
    weight: "",
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

  const resetFields = () => {
    setDetails({
      date: "",
      week: "",
      oedema: "",
      bp: "",
      f_weight: "",
      fm: "",
      fhs: "",
      weight: "",
    });
    setAddedDetails(null);
  };

  const handleSaveDetails = () => {
    if (!addedDetails) {
      firebase
        .firestore()
        .collection("clinic")
        .add({
          pregnancyId: pregnancyId,
          date: Details.date,
          week: Details.week,
          oedema: Details.oedema,
          bp: Details.bp,
          f_weight: Details.f_weight,
          fm: Details.fm,
          fhs: Details.fhs,
          weight: Details.weight,
        })
        .then(() => {
          Alert.alert("Information Added Successfully!");
          setAddedDetails({
            pregnancyId,
            date: Details.date,
            week: Details.week,
            oedema: Details.oedema,
            bp: Details.bp,
            f_weight: Details.f_weight,
            fm: Details.fm,
            fhs: Details.fhs,
            weight: Details.weight,
          });

          resetFields();
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
          <Text style={styles.detailText}>Date of clinic</Text>
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
        <View style={{ marginTop: 10 }}>
          <Text style={styles.detailText}>Oedema</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.oedema === "1" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, oedema: "1" })}
            >
              <Text style={{ textAlign: "center" }}>Positive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.oedema === "0" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, oedema: "0" })}
            >
              <Text style={{ textAlign: "center" }}>Negative</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={[styles.detailText, { marginTop: 40 }]}>
            Blood Pressure (Hgmm)
          </Text>
          <TextInput
            placeholder=""
            style={[styles.textBoxes, { marginTop: 25, width: "39%" }]}
            value={Details.bp}
            keyboardType="numeric"
            onChangeText={(text) => setDetails({ ...Details, bp: text })}
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.detailText, { marginTop: 40 }]}>
            Fundal Height (cm)
          </Text>
          <TextInput
            placeholder=""
            style={[styles.textBoxes, { marginTop: 25, width: "39%" }]}
            value={Details.f_weight}
            keyboardType="numeric"
            onChangeText={(text) => setDetails({ ...Details, f_weight: text })}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.detailText}>Fetal Movements</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.fm === "1" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, fm: "1" })}
            >
              <Text style={{ textAlign: "center" }}>Positive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.fm === "0" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, fm: "0" })}
            >
              <Text style={{ textAlign: "center" }}>Negative</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.detailText}>Fetal Heart Sounds</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.fhs === "1" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, fhs: "1" })}
            >
              <Text style={{ textAlign: "center" }}>Positive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.fhs === "0" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, fhs: "0" })}
            >
              <Text style={{ textAlign: "center" }}>Negative</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={[styles.detailText, { marginTop: 40 }]}>
            Maternal Weight (Kg)
          </Text>
          <TextInput
            placeholder=""
            style={[styles.textBoxes, { marginTop: 25, width: "39%" }]}
            value={Details.weight}
            keyboardType="numeric"
            onChangeText={(text) => setDetails({ ...Details, weight: text })}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleSaveDetails}
        >
          <Text style={styles.buttonText}>Add Clinic Details</Text>
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

export default AddClinic;
