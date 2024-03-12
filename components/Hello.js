import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";

const Hello = () => {
  return (
    <View style={{ flex: 1 }}>
      <Calendar />
    </View>
  );
};

export default Hello;

const styles = StyleSheet.create({});
