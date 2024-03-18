import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaView, View } from "react-native";
import Home from "./Home";
import Hello from "./Hello";
import Sidebar from "./Sidebar";
import DrawerContent from "./DrawerContent";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const Mydrawer = ({ route }) => {
  const navigate = useNavigation();
  const image = require("../assets/nira.png");
  const [isSignOutModalVisible, setIsSignOutModalVisible] = useState(false);
  const handleConfirmLogout = () => {
    navigate.navigate("Login");
  };

  const handleCancelLogout = () => {
    setIsSignOutModalVisible(false);
  };

  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          // headerLeftContainerStyle: { display: "none" },
          // headerRight: () => {
          //   return (
          //     <TouchableOpacity
          //       //onPress={() => console.log("Button is Pressed!")}
          //       onPress={() => navigate.dispatch(DrawerActions.openDrawer())}
          //     >
          //       <Text style={{ color: "blue" }}>PRESS ME</Text>
          //     </TouchableOpacity>
          //   );
          // },
          drawerStyle: {
            width: 300,
          },
          headerBackground: () => <View style={{ backgroundColor: " " }} />,

          drawerType: "slide",

          //drawerPosition: "right",
        }}
        initialRouteName="Home"
        drawerContent={(props) => (
          // <DrawerContent {...props} message={"Amit "} />
          <View style={{ flex: 1 }}>
            <DrawerContentScrollView
              {...props}
              contentContainerStyle={{
                //backgroundColor: "#9288F9",
                //backgroundColor: "#000",
                marginTop: 5,
                zIndex: 20,
              }}
            >
              <View
                style={{
                  height: 200,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomColor: "#f4f4f4",
                  borderBottomWidth: 1,
                }}
              >
                <Image
                  source={image}
                  resizeMode="contain"
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 65,
                    alignItems: "center",
                    borderColor: "#f4d345",
                    borderWidth: 1,
                  }}
                />
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#111",
                  }}
                >
                  {route.params.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000",
                  }}
                >
                  Mobile Developer
                </Text>
              </View>
              <SafeAreaView>
                <View
                  style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}
                >
                  <DrawerItemList {...props} />
                  {/* <DrawerItem /> */}
                </View>
              </SafeAreaView>
            </DrawerContentScrollView>

            <DrawerItem
              style={{ bottom: 0 }}
              label="Log Out"
              onPress={() => setIsSignOutModalVisible(true)}
              icon={() => <MaterialCommunityIcons name="logout" size={24} />}
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
            drawerLabel: "Home",

            title: "Home",
            backgroundColor: "#000",

            drawerAllowFontScaling: true,
            drawerLabelStyle: {
              fontWeight: "bold",
              fontSize: 18,
            },
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
          name="Sidebar"
          options={{
            drawerLabel: "Welcome",
            title: "Sidebar-UI",
            drawerLabelStyle: {
              fontWeight: "bold",
              fontSize: 18,
            },
            drawerIcon: ({ focused }) => (
              <MaterialIcons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={"#000"}
              />
            ),
          }}
          component={Sidebar}
        />
      </Drawer.Navigator>
    </>
  );
};

export default Mydrawer;
