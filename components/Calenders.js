import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Chevron from "./Chevron";
import { Calendar } from "react-native-calendars";
import ABCD from "./ABCD";

const Calenders = ({ title, loginTimes, logoutTimes, markedEvents }) => {
  const [open, setOpen] = useState(false);
  const heightValue = useSharedValue(0);
  const progress = useDerivedValue(() =>
    open ? withTiming(1) : withTiming(0)
  );

  // const createMarker = (timestamp, type) => {
  //   const formattedDate = new Date(timestamp).toLocaleDateString("en-US");
  //   return {
  //     date: formattedDate,
  //     dotColor: type === "login" ? "green" : "red",
  //     markingType: "dot",
  //     text: type.toUpperCase(),
  //   };
  // };
  const createMarker = (timestamp, type) => {
    const formattedDate = new Date(timestamp).toLocaleDateString("en-US");
    return {
      date: formattedDate,
      dotColor: type === "login" ? "green" : "red",
      markingType: "dot",
      text: type === "login" ? "P" : type.toUpperCase(), // Set text to "P" for login
    };
  };

  const toggleAccordion = () => {
    setOpen(!open);
    heightValue.value = open ? withTiming(0) : withTiming(400);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));
  return (
    <View style={styles.accordionContainer}>
      <Pressable onPress={toggleAccordion} style={styles.titleContainer}>
        <Text style={styles.textTitle}> {title}</Text>
        <Chevron progress={progress} />
      </Pressable>

      {open && (
        <Animated.View style={[styles.content, animatedStyle]}>
          <Calendar
            markingType="custom"
            style={{ height: "100%", width: "100%" }}
            // markedDates={markedEvents.reduce((acc, event) => {
            //   acc[event.date] = { ...event, markingType };
            //   return acc;
            // }, {})}
            // markedDates={createMarker}
            marking={() => createMarker()}
            onDayPress={(day) => {
              console.log("selected day", day);
            }}
          />
          {/* <ABCD /> */}
        </Animated.View>
      )}
    </View>
  );
};

export default Calenders;

const styles = StyleSheet.create({
  accordionContainer: {
    backgroundColor: "#E3EDFB",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#0F56B3",
    overflow: "hidden",
  },
  textTitle: {
    fontSize: 18,
    color: "black",
    fontWeight: "500",
  },
  titleContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    padding: 10,
    backgroundColor: "#D6E1F0",
  },
});
