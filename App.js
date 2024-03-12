import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./components/Login";
import Home from "./components/Home";
import Mydrawer from "./components/Mydrawer";
import Hello from "./components/Hello";
import Signup from "./components/Signup";
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
        {/* <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        /> */}

        <Stack.Screen
          name="Mydrawer"
          component={Mydrawer}
          initialParams={{ name: "" }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          initialParams={{ name: "" }}
          options={{
            drawerLabel: "Home",
            title: "Home",
          }}
          component={Home}
        />

        <Stack.Screen
          name="Hello"
          options={{
            drawerLabel: "Hello",
            title: "Hello",
          }}
          component={Hello}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
