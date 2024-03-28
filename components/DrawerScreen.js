import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ImageBackground, Platform, SafeAreaView, View } from "react-native";
import Home from "./Home";
import Hello from "../UnusedComponents/Hello";
import Sidebar from "../UnusedComponents/Sidebar";
import DrawerContent from "../UnusedComponents/DrawerContent";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SignOutModal from "./SignOutModal";
import { Text, Image, TouchableOpacity, Switch } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import BottomTab from "../navigation/BottomTab";
import { Ionicons } from "@expo/vector-icons";
const Drawer = createDrawerNavigator();

const DrawerScreen = ({ route }) => {
  const navigate = useNavigation();
  const image = require("../assets/nira.png");
  const userAvtar = require("../assets/userAvtar.png");
  const bg1 = require("../assets/bg1.jpg");
  const headerImage = require("../assets/ait.png");

  const [isSignOutModalVisible, setIsSignOutModalVisible] = useState(false);
  const handleConfirmLogout = async () => {
    //await AsyncStorage.setItem("isLoggedIn", "false");

    // await AsyncStorage.removeItem("username");

    // await AsyncStorage.removeItem("password");
    navigate.navigate("Login");
  };

  const handleCancelLogout = () => {
    setIsSignOutModalVisible(false);
  };
  const { name } = route.params;

  // const initials = name
  //   .split(" ")
  //   .map((word) => word.charAt(0))
  //   .join("")
  //   .toUpperCase();
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          headerLeftContainerStyle: {
            display: "none",
          },
          sceneContainerStyle: {
            //backgroundColor: "#D4E1F4",
            //backgroundColor: "#E4FBF8",
          },
          // headerRight: () => {
          //   return (
          //     <SafeAreaView>
          //       <View
          //         style={{
          //           height: 50,
          //           width: 50,
          //           marginRight: 15,
          //           borderRadius: 25,
          //           borderWidth: 2,
          //           borderColor: "yellow",
          //           shadowColor: "#999",
          //           shadowOffset: { width: 0, height: 8 },
          //           shadowOpacity: 0.3,
          //           shadowRadius: 10,
          //           justifyContent: "center",
          //           alignItems: "center",
          //         }}
          //       >
          //         <Text
          //           style={{
          //             fontSize: 14,
          //             fontWeight: "bold",
          //             color: "#000",
          //           }}
          //           onPress={() =>
          //             navigate.dispatch(DrawerActions.openDrawer())
          //           }
          //         >
          //           {initials}
          //         </Text>
          //       </View>
          //     </SafeAreaView>
          //   );
          // },

          drawerStyle: {
            width: 300,
          },
          drawerType: "slide",
          drawerPosition: "right",
        }}
        initialRouteName="Home"
        drawerContent={(props) => (
          <View style={{ flex: 1 }}>
            <DrawerContentScrollView
              {...props}
              contentContainerStyle={{
                backgroundColor: "#D4E1F4",
                //backgroundColor: "#000",
                marginTop: 5,
                zIndex: 20,
              }}
            >
              <ImageBackground source={bg1}>
                <View
                  style={{
                    height: 150,
                    width: "100%",
                    padding: 10,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    borderBottomColor: "#f4f4f4",
                    borderBottomWidth: 1,
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source={userAvtar}
                    resizeMode="contain"
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: 50,
                      // alignItems: "center",
                      //borderColor: "#000",
                      //borderWidth: 1,
                    }}
                  />
                  <View style={{ marginLeft: 5 }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: "#f9c328",
                        textAlign: "center",
                      }}
                    >
                      {route.params.name}
                    </Text>

                    <Text
                      style={{
                        fontSize: 16,
                        color: "#FBF4D2",
                      }}
                    >
                      Mobile Developer
                    </Text>
                  </View>
                </View>
              </ImageBackground>
              <SafeAreaView>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    paddingTop: 10,
                  }}
                >
                  <DrawerItemList {...props} />
                  {/* <DrawerItem /> */}
                </View>
              </SafeAreaView>
            </DrawerContentScrollView>
            <View style={{ borderBottomWidth: 0.5, opacity: 0.5 }} />
            <DrawerItem
              style={{
                bottom: 0,
                shadowRadius: 3,
                shadowColor: "#000",
                shadowOpacity: 0.5,
                shadowOffset: { width: 1, height: 10 },
              }}
              labelStyle={{
                fontSize: 18,
                fontWeight: "bold",
              }}
              label="Log Out"
              onPress={() => setIsSignOutModalVisible(true)}
              icon={() => (
                <MaterialCommunityIcons
                  name="logout"
                  size={24}
                  color={"#1378f1"}
                />
              )}
              activeTintColor="#1378f1"
              inactiveTintColor="#000"
            />

            <SignOutModal
              visible={isSignOutModalVisible}
              onConfirm={handleConfirmLogout}
              onCancel={handleCancelLogout}
              message={route.params.name.split(" ")[0]}
            />
          </View>
        )}
      >
        <Drawer.Screen
          name="Home"
          initialParams={{ name: route.params.name }}
          options={{
            headerShown: false,
            drawerLabel: "Home",
            headerStyle: {
              //backgroundColor: "#A1F1F1",
              //backgroundColor: "#E4FBF8",
              shadowRadius: 1,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 10 },
              height: 120,
            },

            // headerTitle: () => {
            //   return (
            //     <SafeAreaView>
            //       <Image
            //         source={headerImage}
            //         resizeMode="contain"
            //         style={{
            //           height: 50,
            //           borderRadius: 50,
            //         }}
            //       />
            //     </SafeAreaView>
            //   );
            // },
            backgroundColor: "#000",

            drawerAllowFontScaling: true,
            drawerLabelStyle: {
              fontWeight: "bold",
              fontSize: 18,
            },
            drawerIcon: ({ focused, color, size }) =>
              focused ? (
                <FontAwesome5 name="home" size={24} color="#1378F1" />
              ) : (
                <Feather name="home" size={24} color="#000" />
              ),
          }}
          component={BottomTab}
        />

        <Drawer.Screen
          name="Sidebar"
          options={{
            headerShown: false,
            drawerLabel: "Settings",
            title: "Sidebar-UI",
            drawerLabelStyle: {
              fontWeight: "bold",
              fontSize: 18,
            },
            drawerIcon: ({ focused }) => (
              // <MaterialIcons
              //   name={focused ? "settings" : "settings-outline"}
              //   size={24}
              //   color={"#000"}
              // />
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={24}
                color={focused ? "#1378F1" : "#000"}
              />
            ),
          }}
          component={Sidebar}
        />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerScreen;
