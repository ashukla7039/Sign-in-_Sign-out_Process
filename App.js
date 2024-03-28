import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./components/Login";
import Home from "./components/Home";
import Mydrawer from "./components/DrawerScreen";
import Hello from "./UnusedComponents/Hello";
import Signup from "./components/Signup";
import SignupForm from "./components/Signup";
import HomeScreen from "./UnusedComponents/Welcome";
import { Text, TouchableOpacity } from "react-native";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Mydrawer"
          component={Mydrawer}
          initialParams={{ name: "" }}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
