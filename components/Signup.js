import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignupForm = () => {
  const image = require("../assets/ait.png");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter your password"),
  });
  const navigate = useNavigation();
  const handleSubmit = (values, actions) => {
    console.log(values);
    // actions.resetForm();
    navigate.navigate("Login");
  };

  return (
    <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <SafeAreaView style={styles.container}>
            <View style={styles.form}>
              {/* <Text style={styles.heading}>Register Here</Text> */}
              <Image source={image} style={styles.image} resizeMode="contain" />
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  placeholder="Name"
                  name="name"
                  placeholderTextColor={"#000"}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  style={[
                    styles.input,
                    styles.passwordInput,
                    errors.name && touched.name && styles.errorInput,
                  ]}
                />
                {errors.name && touched.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="Email"
                  name="email"
                  placeholderTextColor={"#000"}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={[
                    styles.input,
                    styles.passwordInput,
                    errors.email && touched.email && styles.errorInput,
                  ]}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholder="Password"
                  name="password"
                  onChangeText={handleChange("password")}
                  placeholderTextColor={"#000"}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={true}
                  style={[
                    styles.input,
                    styles.passwordInput,
                    errors.password && touched.password && styles.errorInput,
                  ]}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
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
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <Button
                title="Register"
                onPress={handleSubmit}
                style={styles.button}
              /> */}
            </View>
          </SafeAreaView>
        )}
      </Formik>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 30,
    padding: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#008cba",
    color: "white",
    padding: 15,
    borderRadius: 5,
  },
  form: {
    //backgroundColor: "#d1d5db",
    backgroundColor: "#EAECEE",

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
  loginBtn: {
    width: "80%",
    // backgroundColor: "#3f51b5",
    backgroundColor: "#469486",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  passwordInput: {
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    height: 70,
    width: "100%",
    borderRadius: 50,
    margin: 10,
  },
});
