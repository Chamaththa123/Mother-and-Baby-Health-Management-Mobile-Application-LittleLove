import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const MotherList = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#57ADF8",
        fontSize: 20,
      },
      headerTintColor: "#57ADF8",
      headerShown: true,
      title: "All Mothers List",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const [mothersList, setMothersList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getMothersList = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .where("role", "==", 0)
        .get();

      const mothers = [];
      snapshot.forEach((doc) => {
        mothers.push({ id: doc.id, ...doc.data() });
      });

      setMothersList(mothers);
    } catch (error) {
      console.log("Error getting mothers list:", error);
    }
  };

  useEffect(() => {
    getMothersList();
  }, []);

  const filterMothersByRegisterNo = () => {
    return mothersList.filter((mother) =>
      mother.register_No.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleMotherClick = (motherId) => {
    navigation.navigate("MotherDetails", { motherId });
  };

  const renderMothers = () => {
    const filteredMothers = filterMothersByRegisterNo();
    return filteredMothers.map((mother) => (
      <TouchableOpacity
        key={mother.id}
        style={styles.motherItem}
        onPress={() => handleMotherClick(mother.id)}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.card}>
            <Text>{mother.register_No}</Text>
          </View>
          <Text style={styles.motherName}>{mother.name}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Registered No."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <Icon
        name="search"
        size={30}
        color="#57ADF8"
        style={{
          alignSelf: "flex-end",
          marginRight: "7%",
          marginTop: -75,
          marginBottom: 20,
        }}
      />
      <ScrollView style={styles.scrollView}>{renderMothers()}</ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  scrollView: {
    width: "95%",
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FF25A9",
    padding: 5,
    paddingLeft: 10,
    borderRadius: 10,
    width: 70,
    alignSelf: "center",
  },
  motherItem: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#FF25A9",
  },
  motherName: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 20,
  },
  searchInput: {
    width: "95%",
    borderWidth: 1,
    borderColor: "#57ADF8",
    borderRadius: 38,
    padding: 10,
    marginTop: 20,
    marginBottom: 35,
  },
});

export default MotherList;
