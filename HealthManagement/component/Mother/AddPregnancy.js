import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../firebase/config";

const AddPregnancy = ({ route }) => {
  const { motherId } = route.params || { motherId: null };
  const navigation = useNavigation();
  const [motherDetails, setMotherDetails] = useState(null);

  const [menstrual, setmenstrual] = useState("");
  const [delivery, setdelivery] = useState("");
  const [movement, setmovement] = useState("");
  const [weeks, setweeks] = useState("");

  const [abortions, setabortions] = useState("");
  const [Gestational, setGestational] = useState("");

  const [Antepartum, setAntepartum] = useState("");
  const [Multiple, setMultiple] = useState("");
  const [Casual, setCasual] = useState("");
  const [POthers, setPOthers] = useState("");

  const [Diabetes, setDiabetes] = useState("");
  const [malaria, setmalaria] = useState("");
  const [Heart, setHeart] = useState("");
  const [Renal, setRenal] = useState("");
  const [OOthers, setOOthers] = useState("");

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
        title: `Add ${motherDetails?.name}'s Pregnancy`,
        headerTitleAlign: "center",
      });
    }
  }, [motherDetails, navigation]);

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

  const handleAddPregnancy = async () => {
    try {
      if (motherId) {
        await firebase.firestore().collection("pregnancy").add({
          motherId: motherId,
          menstrual: menstrual,
          delivery: delivery,
          movement: movement,
          weeks: weeks,
          abortions: abortions,
          Gestational: Gestational,
          Antepartum: Antepartum,
          Multiple: Multiple,
          Casual: Casual,
          POthers: POthers,
          Diabetes: Diabetes,
          malaria: malaria,
          Heart: Heart,
          Renal: Renal,
          OOthers: OOthers,
        });

        // Show an alert after adding the baby details
        Alert.alert(
          "Success",
          "Baby details added successfully",
          [
            {
              text: "OK",
              onPress: () => {
                setmenstrual(""); // Clearing input fields
                setdelivery("");
                setmovement("");
                setweeks("");
                setabortions("");
                setGestational("");
                setAntepartum("");
                setMultiple("");
                setCasual("");
                setPOthers("");
                setDiabetes("");
                setmalaria("");
                setHeart("");
                setRenal("");
                setOOthers("");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        console.error("Invalid data provided");
      }
    } catch (error) {
      console.error("Error adding baby: ", error);
    }
  };

  if (!motherDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
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
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(menstrual) => setmenstrual(menstrual)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.detailText}>02. Expected period of delivery</Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(delivery) => setdelivery(delivery)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.detailText}>
            03. The date of the first felt fetal movement
          </Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(movement) => setmovement(movement)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.detailText}>
            04. Number of gestational weeks at registration
          </Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(weeks) => setweeks(weeks)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <Text style={styles.header}>Risk Conditions</Text>
          <Text style={styles.header2}>Previous Pregnancies</Text>
          <View>
          <Text style={styles.detailText}>
            01. Previous abortions
          </Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(abortions) => setabortions(abortions)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.detailText}>
            02. Gestational diseases
          </Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(Gestational) => setGestational(Gestational)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <Text style={styles.header2}>Presnet Pregnancy</Text>
        <View>
          <Text style={styles.detailText}>
            01. Antepartum vaginal bleeding
          </Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(Antepartum) => setAntepartum(Antepartum)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.detailText}>
            02. Multiple pregnancy
          </Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(Multiple) => setMultiple(Multiple)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.detailText}>
            03. Casual position
          </Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(Casual) => setCasual(Casual)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.detailText}>
            04. Others(specify)
          </Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(POthers) => setPOthers(POthers)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <Text style={styles.header2}>Other Maternal Conditions</Text>
        <View>
          <Text style={styles.detailText}>
            01. Diabetes
          </Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(Diabetes) => setDiabetes(Diabetes)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.detailText}>
            02. malaria
          </Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(malaria) => setmalaria(malaria)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.detailText}>
            03. Heart Disease
          </Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(Heart) => setHeart(Heart)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.detailText}>
            04. Renal Disease
          </Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(Renal) => setRenal(Renal)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text style={styles.detailText}>
            05. Others(specify)
          </Text>
          <TextInput
            placeholder="Enter Email"
            style={styles.textBoxes}
            onChangeText={(OOthers) => setOOthers(OOthers)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={handleAddPregnancy}
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailText2: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 30,
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  header2: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
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
    padding: 12,
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
    padding: 13,
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
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default AddPregnancy;
