import { View, Text, Platform, Image, SafeAreaView } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Hello from "../components/Hello";
import SignUp from "../components/Signup";
import Home from "../components/Home";
import { Ionicons } from "@expo/vector-icons";
import Sidebar from "../components/Sidebar";
const Tab = createBottomTabNavigator();

const BottomTab = ({ route }) => {
  const home = require("../assets/home.png");
  const homeOutline = require("../assets/home-outline.png");
  const thunderOutline = require("../assets/thunder.png");
  const thunder = require("../assets/thunderFill.png");
  const explore = require("../assets/explore.png");
  const exploreOutline = require("../assets/exploreOutline.png");
  const headerImage = require("../assets/ait.png");

  const { name } = route.params;
  const navigate = useNavigation();
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  return (
    <Tab.Navigator
      screenOptions={{
        //headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: Platform.OS === "ios" ? 90 : 60,
          backgroundColor: "#fff",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarPosition: "bottom",

        animationEnabled: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ name: route.params.name }}
        options={{
          headerTitle: () => {
            return (
              <SafeAreaView>
                <Image
                  source={headerImage}
                  resizeMode="contain"
                  style={{
                    height: 50,
                    borderRadius: 50,
                  }}
                />
              </SafeAreaView>
            );
          },
          headerRight: () => {
            return (
              <SafeAreaView>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    marginRight: 15,
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: "yellow",
                    shadowColor: "#999",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#000",
                    }}
                    onPress={() => navigate.openDrawer()}
                  >
                    {initials}
                  </Text>
                </View>
              </SafeAreaView>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? home : homeOutline}
                resizeMode="contain"
                style={{
                  height: 24,
                  width: 24,
                  tintColor: focused ? "#1378F1" : "#000",
                }}
              />
            );
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? "#1378F1" : "#000",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Home
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Hello"
        component={Hello}
        initialParams={{ name: route.params.name }}
        options={{
          headerShown: true,

          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? "#1378F1" : "#000",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Actions
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? thunder : thunderOutline}
                resizeMode="contain"
                style={{
                  height: 24,
                  width: 24,
                  tintColor: focused ? "#1378F1" : "#000",
                }}
              />
              // <Ionicons
              //   name={focused ? "bookmarks-sharp" : "bookmarks-outline"}
              //   size={24}
              //   color={focused ? "#13678A" : "#000"}
              // />
            );
          },
        }}
      />

      <Tab.Screen
        name="Sidebar"
        component={Sidebar}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? "#1378F1" : "#000",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Explore
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? explore : exploreOutline}
                resizeMode="contain"
                style={{
                  height: 24,
                  width: 24,
                  tintColor: focused ? "#1378F1" : "#000",
                }}
              />
              // <Ionicons
              //   name={focused ? "color-filter" : "color-filter-outline"}
              //   size={24}
              //   color={focused ? "#1378F1" : "#000"}
              // />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
