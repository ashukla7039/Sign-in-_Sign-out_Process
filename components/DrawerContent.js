import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from "react-native";
import SignOutModal from "./SignOutModal";

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const DrawerContent = ({ props }) => {
  const image = require("../assets/nira.png");
  const [isSignOutModalVisible, setIsSignOutModalVisible] = useState(false);
  const handleConfirmLogout = () => {
    props.navigation.navigate("Login");
  };

  const handleCancelLogout = () => {
    setIsSignOutModalVisible(false);
  };
  return (
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
            {props}
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
          <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
            <DrawerItemList {...props} />
            {/* <DrawerItem /> */}
          </View>

          {/* <DrawerItem
            style={{ bottom: 0 }}
            label="Sign Out"
            onPress={() => props.navigation.navigate("Login")}
            icon={() => (
              <MaterialCommunityIcons name="logout" size={30} color="white" />
            )}
            labelStyle={{ color: "white", fontSize: 20 }}
          /> */}
        </SafeAreaView>
      </DrawerContentScrollView>
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 7,
          paddingVertical: 5,
        }}
      >
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor="#f4f3f4"
          style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
        />
        <Text
          style={{
            fontSize: 15,
          }}
        >
          Dark Theme
        </Text>
      </View> */}
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
      />
    </View>
  );
};

export default DrawerContent;
