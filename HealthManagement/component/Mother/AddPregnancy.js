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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../firebase/config";
import MyImage from "../../assets/logo.png";

const AddPregnancy = ({ route }) => {
  const { motherId } = route.params || { motherId: null };
  const navigation = useNavigation();
  const [motherDetails, setMotherDetails] = useState(null);

  const [Details, setDetails] = useState({
    menstrual: "",
    delivery: "",
    movement: "",
    weeks: "",
    abortions: "",
    Gestational: "",
    Antepartum: "",
    Multiple: "",
    Casual: "",
    POthers: "",
    Diabetes: "",
    malaria: "",
    Heart: "",
    Renal: "",
    OOthers: "",
  });
  const [addedDetails, setAddedDetails] = useState(null);

  useEffect(() => {
    if (motherDetails) {
      navigation.setOptions({
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#57ADF8",
          fontSize: 20,
        },
        headerTintColor: "#57ADF8",
        headerShown: true,
        title: `Add Pregnancy Details`,
        headerTitleAlign: "center",
      });
    } else {
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [motherDetails, navigation]);

  const handleSaveDetails = () => {
    if (!addedDetails) {
      firebase
        .firestore()
        .collection("pregnancy")
        .add({
          motherId: motherId,
          menstrual: Details.menstrual,
          delivery: Details.delivery,
          movement: Details.movement,
          weeks: Details.weeks,
          abortions: Details.abortions,
          Gestational: Details.Gestational,
          Antepartum: Details.Antepartum,
          Multiple: Details.Multiple,
          Casual: Details.Casual,
          POthers: Details.POthers,
          Diabetes: Details.Diabetes,
          malaria: Details.malaria,
          Heart: Details.Heart,
          Renal: Details.Renal,
          OOthers: Details.OOthers,
        })
        .then(() => {
          Alert.alert("Information Added Successfully!");
          setAddedDetails({
            motherId,
            menstrual: Details.menstrual,
            delivery: Details.delivery,
            movement: Details.movement,
            weeks: Details.weeks,
            abortions: Details.abortions,
            Gestational: Details.Gestational,
            Antepartum: Details.Antepartum,
            Multiple: Details.Multiple,
            Casual: Details.Casual,
            POthers: Details.POthers,
            Diabetes: Details.Diabetes,
            malaria: Details.malaria,
            Heart: Details.Heart,
            Renal: Details.Renal,
            OOthers: Details.OOthers,
          });
        })
        .catch((error) => {
          console.error("Error adding details: ", error);
        });
    } else {
      Alert.alert(" details already added");
    }
  };

  useEffect(() => {
    const fetchMotherDetails = async () => {
      try {
        if (motherId) {
          const doc = await firebase
            .firestore()
            .collection("users")
            .doc(motherId)
            .get();
          if (doc.exists) {
            setMotherDetails(doc.data());
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.log("Error getting mother details:", error);
      }
    };

    fetchMotherDetails();
  }, [motherId]);

  if (!motherDetails) {
    return (
      <View style={styles.Lcontainer}>
        <Image source={MyImage} style={styles.Limage} />
        <View style={styles.LtextContainer}>
          <Text style={styles.LredText}>Little </Text>
          <Text style={styles.LblueText}> Love</Text>
        </View>
        <Text style={styles.Ltext}>Loading</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Obstetric History</Text>
        <View>
          <Text style={styles.detailText}>
            01. Date of last menstrual period
          </Text>
          <TextInput
            placeholder="DD-MM-YYYY"
            style={styles.textBoxes}
            value={Details.menstrual}
            onChangeText={(text) => setDetails({ ...Details, menstrual: text })}
          />
        </View>
        <View>
          <Text style={styles.detailText}>02. Expected period of delivery</Text>
          <TextInput
            placeholder="DD-MM-YYYY"
            style={styles.textBoxes}
            value={Details.delivery}
            onChangeText={(text) => setDetails({ ...Details, delivery: text })}
          />
        </View>
        <View>
          <Text style={styles.detailText}>
            03. The date of the first felt fetal movement
          </Text>
          <TextInput
            placeholder="DD-MM-YYYY"
            style={styles.textBoxes}
            value={Details.movement}
            onChangeText={(text) => setDetails({ ...Details, movement: text })}
          />
        </View>
        <View>
          <Text style={styles.detailText}>
            04. Number of gestational weeks at registration
          </Text>
          <TextInput
            placeholder="DD-MM-YYYY"
            style={styles.textBoxes}
            value={Details.weeks}
            onChangeText={(text) => setDetails({ ...Details, weeks: text })}
          />
        </View>
        <Text style={styles.header}>Risk Conditions</Text>
        <Text style={styles.header2}>Previous Pregnancies</Text>
        <View>
          <Text style={styles.detailText}>01. Previous abortions</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.abortions === "1" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, abortions: "1" })}
            >
              <Text style={{ textAlign: "center" }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.abortions === "0" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, abortions: "0" })}
            >
              <Text style={{ textAlign: "center" }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.detailText}>02. Gestational diseases</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Gestational === "1" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Gestational: "1" })}
            >
              <Text style={{ textAlign: "center" }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Gestational === "0" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Gestational: "0" })}
            >
              <Text style={{ textAlign: "center" }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.header2}>Presnet Pregnancy</Text>
        <View>
          <Text style={styles.detailText}>01. Antepartum vaginal bleeding</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Antepartum === "1" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Antepartum: "1" })}
            >
              <Text style={{ textAlign: "center" }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Antepartum === "0" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Antepartum: "0" })}
            >
              <Text style={{ textAlign: "center" }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.detailText}>02. Multiple pregnancy</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Multiple === "1" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Multiple: "1" })}
            >
              <Text style={{ textAlign: "center" }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Multiple === "0" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Multiple: "0" })}
            >
              <Text style={{ textAlign: "center" }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.detailText}>03. Casual position</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Casual === "1" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Casual: "1" })}
            >
              <Text style={{ textAlign: "center" }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Casual === "0" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Casual: "0" })}
            >
              <Text style={{ textAlign: "center" }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.detailText}>04. Others(specify)</Text>
          <TextInput
            placeholder="DD-MM-YYYY"
            style={styles.textBoxes}
            value={Details.POthers}
            onChangeText={(text) => setDetails({ ...Details, POthers: text })}
          />
        </View>
        <Text style={styles.header2}>Other Maternal Conditions</Text>
        <View>
          <Text style={styles.detailText}>01. Diabetes</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Diabetes === "1" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Diabetes: "1" })}
            >
              <Text style={{ textAlign: "center" }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Diabetes === "0" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Diabetes: "0" })}
            >
              <Text style={{ textAlign: "center" }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.detailText}>02. malaria</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.malaria === "1" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, malaria: "1" })}
            >
              <Text style={{ textAlign: "center" }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.malaria === "0" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, malaria: "0" })}
            >
              <Text style={{ textAlign: "center" }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.detailText}>03. Heart Disease</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Heart === "1" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Heart: "1" })}
            >
              <Text style={{ textAlign: "center" }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Heart === "0" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Heart: "0" })}
            >
              <Text style={{ textAlign: "center" }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.detailText}>04. Renal Disease</Text>
          <View style={styles.radioButtons}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Renal === "1" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Renal: "1" })}
            >
              <Text style={{ textAlign: "center" }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                Details.Renal === "0" && styles.selectedRadioButton,
              ]}
              onPress={() => setDetails({ ...Details, Renal: "0" })}
            >
              <Text style={{ textAlign: "center" }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.detailText}>05. Others(specify)</Text>
          <TextInput
            placeholder="DD-MM-YYYY"
            style={styles.textBoxes}
            value={Details.OOthers}
            onChangeText={(text) => setDetails({ ...Details, OOthers: text })}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleSaveDetails}
        >
          <Text style={styles.buttonText}>Add Pregnancy Details</Text>
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
    padding: 15,
  },
  Lcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  Limage: {
    width: "30%",
    height: "16%",
  },
  LtextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1%",
  },
  LredText: {
    color: "#57ADF8",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  LblueText: {
    color: "#FF25A9",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  Ltext: {
    fontSize: 22,
    color: "#FF25A9",
    margin: 30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  detailText: {
    fontSize: 14,
    marginBottom: 10,
  },
  detailText2: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 30,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF25A9",
  },
  header2: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#57ADF8",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 200,
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
    justifyContent: "flex-start",
  },
  buttonStyle: {
    backgroundColor: "#FF25A9",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    height: 50,
    marginBottom: 20,
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
    marginTop: 5,
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

export default AddPregnancy;
