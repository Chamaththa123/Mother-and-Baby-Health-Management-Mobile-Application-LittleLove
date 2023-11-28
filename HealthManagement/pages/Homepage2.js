import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

const headerImage = require("../assets/logo.png"); // Replace with your image path
const Midwife = require("../assets/nurse.png"); // Replace with your image path

const Homepage2 = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackVisible: false,
      headerTitle: () => (
        <View style={{ flexDirection: "row" }}>
          <Image
            source={headerImage}
            style={{
              width: 60,
              height: 60,
              marginLeft: 10,
              marginTop: 15,
              marginBottom: 15,
            }}
          />
          <Text
            style={{
              fontWeight: "bold",
              color: "#57ADF8",
              fontSize: 23,
              marginTop: 30,
              marginLeft: 20,
            }}
          >
            Little
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "#FF25A9",
              fontSize: 23,
              marginTop: 30,
            }}
          >
            {" "}
            Love
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      ListHeaderComponent={() => (
        <View>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.headerWelcome}>Welcome</Text>
              <Image source={Midwife} style={styles.midwifeImage} />
            </View>
            <Text style={styles.headerName}>Chamaththa Shamod MAdhumlakS</Text>
          </View>
        </View>
      )}
      ListFooterComponent={() => (
        <>
          <Text style={styles.text1}>Manage Mothers & Babies</Text>
          <View style={styles.row2}>
            <TouchableOpacity
              style={styles.menucard}
              onPress={() => navigation.navigate("AddMother")}
            >
              <Text style={styles.cardText}>Create Mother Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menucard}
              onPress={() => navigation.navigate("MotherList")}
            >
              <Text style={styles.cardText}>All Mothers</Text>
            </TouchableOpacity>
            <View style={styles.menucard}>
              <Text style={styles.cardText}>Scan Mother QR</Text>
            </View>
          </View>
          <Text style={styles.text1}>Manage Midwives & Nurses</Text>
          <View style={styles.row2}>
            <View style={styles.menucard}>
              <Text style={styles.cardText}>
                Create Midwife & Nurse Profile
              </Text>
            </View>
            <View style={styles.menucard}>
              <Text style={styles.cardText}>All Midwives & Nurses</Text>
            </View>
            <View style={{ marginLeft: 100 }}>
              <Text style={styles.cardText}></Text>
            </View>
          </View>
          <Text style={styles.text1}>
            Manage Special Medical Events & Notices
          </Text>
          <View style={styles.row2}>
            <View style={styles.menucard}>
              <Text style={styles.cardText}>
                Add Special Medical Events & Notices
              </Text>
            </View>
            <View style={styles.menucard}>
              <Text style={styles.cardText}>
                All Special Medical Events & Notices
              </Text>
            </View>
            <View style={{ marginLeft: 100 }}>
              <Text style={styles.cardText}></Text>
            </View>
          </View>
          {/* <Text style={styles.text}>All Data from Firebase</Text>
          <Button title='Add Mother' onPress={() => navigation.navigate('AddMother')} />
          <Button title='Mother List' onPress={() => navigation.navigate('MotherList')} /> */}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#0268C2",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerImage: {
    marginTop: "10%",
    width: 70,
    height: 70,
  },
  midwifeImage: {
    // marginTop: '10%',
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  headerWelcome: {
    fontSize: 19,
    color: "white",
    fontWeight: "bold",
  },
  text1: {
    fontSize: 16,
    // color: 'white',
    fontWeight: "900",
    marginLeft: 20,
    marginTop: 30,
  },
  headerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: "-4.9%",
  },
  card: {
    backgroundColor: "#FF25A9",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: "94%",
    margin: 10,
  },
  menucard: {
    backgroundColor: "white",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    width: 100,
    borderWidth: 1,
    borderColor: "#57ADF8",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#616161",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Homepage2;
