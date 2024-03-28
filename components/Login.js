import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ onLogin }) => {
  const image = require("../assets/ait.png");
  const [visible, setVisible] = React.useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const loginBg = require("../assets/loginBlueBg.jpg");
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigation();
  const validateForm = () => {
    let errors = {};

    if (!username) errors.username = "Enter Valid Username  ";
    if (!password) errors.password = " Enter Valid Password  ";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // useEffect(() => {
  //   async function checkLogin() {
  //     try {
  //       const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
  //       const username = await AsyncStorage.getItem("username");

  //       if (isLoggedIn === "true") {
  //         navigate.navigate("Mydrawer", { name: username });
  //       } else {
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   checkLogin();
  // }, []);

  // useEffect(() => {
  //   async function checkLogin() {
  //     try {
  //       const isLoggedIn = await SecureStore.getItemAsync('isLoggedIn');
  //       const username = await SecureStore.getItemAsync('username');

  //       if (isLoggedIn === 'true') {
  //         navigate.navigate("Mydrawer", { name: username });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   checkLogin();
  // }, []);

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
    } catch {
      console.log("Error saving data");
    }
    if (validateForm()) {
      const nameParts = username.split(" ");
      const initials =
        nameParts.length > 1
          ? `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`
          : nameParts[0].charAt(0);
      setUsername("");
      setPassword("");
      setErrors("");
      setVisible(true);
      //navigate.navigate("Home", { name: username });
      //navigate.navigate("Welcome", { name: username });
      navigate.navigate("Mydrawer", { name: username });

      // Snackbar.show("Hey Hi, Welcome! You are logged in.");
    }
  };
  const handleSignUp = () => {
    navigate.navigate("SignupForm");
  };
  return (
    <ImageBackground
      source={loginBg}
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Image source={image} style={styles.image} resizeMode="contain" />
          <Text style={styles.message}>Hello AIT'ians 👋</Text>
          {errors.username ? (
            <Text style={styles.error}>{errors.username}</Text>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f3f3f3",
              borderRadius: 25,
              borderColor: "#000",
              borderWidth: 1,
              paddingHorizontal: 14,
              marginBottom: 15,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                color: "#333",

                padding: 10,
                fontWeight: "bold",
                fontSize: 18,
              }}
              placeholder="Enter Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setErrors({ ...errors, username: "" });
              }}
            />
          </View>
          {errors.password ? (
            <Text style={styles.error}>{errors.password}</Text>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f3f3f3",
              borderRadius: 25,
              borderColor: "#000",
              borderWidth: 1,
              paddingHorizontal: 14,
              marginBottom: 15,
            }}
          >
            <TextInput
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors({ ...errors, password: "" });
              }}
              style={{
                flex: 1,
                color: "#333",
                fontWeight: "bold",
                padding: 10,
                fontSize: 18,
              }}
              placeholder="Enter Password"
              placeholderTextColor="#aaa"
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
              style={styles.icon}
              onPress={toggleShowPassword}
            />
          </View>
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

            {/* {isLoggedIn && (
              <Text style={styles.successMessage}>You are logged in!</Text>
            )} */}
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
              <Text style={{ color: "#469486" }}> Sign-up</Text>
            </TouchableOpacity>
          </View>
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={Snackbar.DURATION_LONG}
            style={{ backgroundColor: "green" }}
          >
            Login Successful!
          </Snackbar>
        </View>
      </SafeAreaView>
    </ImageBackground>
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
    backgroundColor: "#EAECEE",
    padding: 20,
    borderRadius: 20,
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
    //backgroundColor: "#3f51b5",
    backgroundColor: "#1378F1",
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    paddingBottom: 10,
  },
  successMessage: {
    marginTop: 10,
    color: "green",
    fontSize: 18,
  },
});
export default LoginScreen;
