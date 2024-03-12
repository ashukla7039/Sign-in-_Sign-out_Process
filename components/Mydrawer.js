import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaView, View } from "react-native";
import Home from "./Home";
import Hello from "./Hello";
import DrawerContent from "./DrawerContent";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SignOutModal from "./SignOutModal";
const Drawer = createDrawerNavigator();

const Mydrawer = ({ route }) => {
  const navigate = useNavigation();
  const [isSignOutModalVisible, setIsSignOutModalVisible] = useState(false);

  const handleSignOut = () => {
    setIsSignOutModalVisible(true);
  };

  const confirmSignOut = () => {
    navigate.navigate("Login");
  };

  const cancelSignOut = () => {
    setIsSignOutModalVisible(false);
  };
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            width: 300,
          },
        }}
        initialRouteName="Home"
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          initialParams={{ name: route.params.name }}
          options={{
            drawerLabel: "Home",
            title: "Home",
            backgroundColor: "#000",
            drawerIcon: ({ focused, color, size }) =>
              /// <MaterialIcons name={"home"} size={24} color={"#000"} />

              focused ? (
                <FontAwesome5 name="home" size={24} color="black" />
              ) : (
                <Feather name="home" size={24} color="black" />
              ),
          }}
          component={Home}
        />

        <Drawer.Screen
          name="Hello"
          options={{
            drawerLabel: "Hello",
            title: "Hello",

            drawerIcon: ({ focused }) => (
              <MaterialIcons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={"#000"}
              />
            ),
          }}
          component={Hello}
        />
        <Drawer.Screen
          name="SignOut"
          options={{
            drawerLabel: "Sign Out",
            title: "Sign Out",
            drawerIcon: ({ focused, color, size }) => (
              <MaterialIcons name="exit-to-app" size={size} color={color} />
            ),
            drawerPress: handleSignOut,
          }}
          component={SignOutModal}
        />
      </Drawer.Navigator>
      {/* <SignOutModal
        visible={isSignOutModalVisible}
        onConfirm={confirmSignOut}
        onCancel={cancelSignOut}
      /> */}
    </>
  );
};

export default Mydrawer;
