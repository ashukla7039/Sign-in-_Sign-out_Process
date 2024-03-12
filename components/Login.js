import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

const LoginScreen = ({ onLogin }) => {
  const image = require("../assets/ait.png");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigation();
  const validateForm = () => {
    let errors = {};

    if (!username) errors.username = "Enter Valid Username  ";
    if (!password) errors.password = " Enter Valid Password  ";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const nameParts = username.split(" ");
      const initials =
        nameParts.length > 1
          ? `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`
          : nameParts[0].charAt(0);
      setUsername("");
      setPassword("");
      setErrors("");
      //navigate.navigate("Home", { name: username });
      //navigate.navigate("Welcome", { name: username });
      navigate.navigate("Mydrawer", { name: username });
    }
  };
  const handleSignUp = () => {
    navigate.navigate("Signup");
  };
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Image source={image} style={styles.image} resizeMode="contain" />
          <Text style={styles.message}>Hello Ait'ians 👋</Text>
          {errors.username ? (
            <Text style={styles.error}>{errors.username}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#7D7B7E"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setErrors({ ...errors, username: "" });
            }}
          />

          {errors.password ? (
            <Text style={styles.error}>{errors.password}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            placeholder="Password"
            placeholderTextColor="#7D7B7E"
            onChangeText={(text) => {
              setPassword(text);
              setErrors({ ...errors, password: "" });
            }}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={styles.loginBtn}>
              <Text
                style={{ color: "#fff", fontSize: 22, fontWeight: "500" }}
                onPress={handleSubmit}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Already have account ? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={{ color: "#064EF8" }}> Sign-up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    // display: "flex",
    //flexDirection: "column",
    // justifyContent: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
  },
  form: {
    backgroundColor: "#d1d5db",
    padding: 20,
    borderRadius: 10,
    borderColor: "#282a36",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputView: {
    flex: 1,
    width: "80%",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#282a36",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 25,
    color: "black",
    fontSize: 18,
    fontWeight: "500",
  },
  inputText: {
    height: 50,
  },

  error: {
    color: "red",
    marginBottom: 10,
  },
  image: {
    height: 70,
    width: "100%",
    borderRadius: 50,
    margin: 10,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#3f51b5",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#064EF8",
    paddingBottom: 10,
  },
});
export default LoginScreen;
