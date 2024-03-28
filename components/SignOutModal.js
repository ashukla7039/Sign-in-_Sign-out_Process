import React from "react";
import { Modal, View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const SignOutModal = ({ visible, onConfirm, onCancel, message }) => {
  warningImage = require("../assets/warning.png");
  return (
    <Modal visible={visible} transparent style={{ margin: 5 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              flexDirection: "row",
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#FDC307",
            }}
          >
            {/* <AntDesign
              name="warning"
              size={24}
              color="black"
              style={{
                display: "flex",
                alignSelf: "center",
              }}
            /> */}
            Logout !
            {/* <MaterialIcons name="warning" color="yellow" size={25} /> */}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>
            {/* <Text style={{ color: "red", fontWeight: "bold" }}>
              {" "}
              {message}{" "}
            </Text> */}
            Are you sure you want to log out?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={{ marginRight: 20 }} onPress={onConfirm}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  backgroundColor: "#1378f1",
                  borderRadius: 10,
                  padding: 10,
                  width: 60,
                  textAlign: "center",
                }}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={{ marginRight: 20 }}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  backgroundColor: "#1378f1",
                  borderRadius: 10,
                  padding: 10,
                  width: 60,
                  textAlign: "center",
                }}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SignOutModal;
