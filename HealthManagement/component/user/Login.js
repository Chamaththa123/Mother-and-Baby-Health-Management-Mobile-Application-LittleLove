import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MyImage from "../../assets/logo.png";
const Login = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginPress = () => {
    navigation.navigate("Homepage2");
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={MyImage} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.redText}>Little </Text>
        <Text style={styles.blueText}> Love</Text>
      </View>
      <View style={styles.textContainer}>
      <Text style={styles.welcome}>Welcome to </Text>
        <Text style={styles.redText1}>Little </Text>
        <Text style={styles.blueText1}> Love</Text>
      <Text style={styles.welcome}> ! </Text>

      </View>
      
      <Text style={styles.log}>Sign In</Text>
      <Text style={styles.inputDetails}>Enter Email</Text>
      <TextInput placeholder="Enter User Email" style={styles.textBoxes} />
      <Text style={styles.inputDetails}>Enter Password</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? "eye" : "eye-slash"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    width: "30%",
    height: "16%",
    alignSelf: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1%",
    alignSelf: "center",
  },
  welcome: {
    color: "#57ADF8",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 40,
    textAlign:'center'
  },
  log: {
    color: "#57ADF8",
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 30,
    textAlign:'center'
  },
  redText: {
    color: "#57ADF8",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  blueText: {
    color: "#FF25A9",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  redText1: {
    color: "#57ADF8",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop:40
  },
  blueText1: {
    color: "#FF25A9",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop:40
  },
  inputDetails: {
    fontSize: 15,
    marginLeft: 20,
    marginBottom: "-3%",
  },
  textBoxes: {
    width: "90%",
    fontSize: 16,
    padding: 12,
    borderColor: "#FF25A9",
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    marginLeft: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  passwordInputContainer: {
    width: "90%",
    flexDirection: "row",
    borderColor: "#FF25A9",
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    marginLeft: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    padding: 12,
  },
  eyeIcon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  forgotPassword: {
    marginLeft: 20,
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontSize: 15,
    fontWeight: "600",
  },
  buttonStyle: {
    backgroundColor: "#FF25A9",
    padding: 13,
    borderRadius: 10,
    width: "90%",
    height: 50,
    margin: 10,
    marginLeft: 20,
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
export default Login;
