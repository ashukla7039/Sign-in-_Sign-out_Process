import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

const SignOutModal = ({ visible, onConfirm, onCancel, message }) => {
  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#f4d345",
            }}
          >
            Logout !
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              {" "}
              {message}{" "}
            </Text>
            ,are you sure you want to log out?
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{ marginRight: 20 }} onPress={onConfirm}>
              <Text style={{ color: "blue", fontWeight: "bold" }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel}>
              <Text style={{ color: "blue", fontWeight: "bold" }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SignOutModal;
