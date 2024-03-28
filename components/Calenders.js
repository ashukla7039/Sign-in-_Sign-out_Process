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

const Calenders = ({ markedDates }) => {
  const [open, setOpen] = useState(false);
  const heightValue = useSharedValue(0);
  const progress = useDerivedValue(() =>
    open ? withTiming(1) : withTiming(0)
  );

  const toggleAccordion = () => {
    setOpen(!open);
    heightValue.value = open ? withTiming(0) : withTiming(400);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, marginBottom: 50 }}>
      <View style={styles.accordionContainer}>
        <Pressable onPress={toggleAccordion} style={styles.titleContainer}>
          <Text style={styles.textTitle}> Attendance Info</Text>
          <Chevron progress={progress} />
        </Pressable>

        {open && (
          <Animated.View style={[styles.content, animatedStyle]}>
            <Calendar
              markedDates={markedDates}
              theme={{
                backgroundColor: "#ffffff",

                textSectionTitleColor: "#b6c1cd",
                selectedDayBackgroundColor: "#00adf5",
                textDayFontSize: 12,
                textMonthFontSize: 16,
                textDayStyle: {
                  color: "black",
                  fontWeight: "bold",
                },
                textDayHeaderFontSize: 14,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <View
                style={[styles.circleStyle, { backgroundColor: "green" }]}
              />
              <Text style={styles.textStyle}>Present</Text>
              <View style={[styles.circleStyle, { backgroundColor: "red" }]} />
              <Text style={styles.textStyle}>Absent</Text>
              <View
                style={[styles.circleStyle, { backgroundColor: "yellow" }]}
              />
              <Text style={styles.textStyle}>Half Day</Text>
              {/* <View
                style={[styles.circleStyle, { backgroundColor: "skyblue" }]}
              />
              <Text>Holiday</Text> */}
            </View>
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );
};

export default Calenders;

const styles = StyleSheet.create({
  accordionContainer: {
    backgroundColor: "transparent",
    marginTop: 10,

    borderRadius: 14,
    borderWidth: 0.2,
    borderColor: "#000",
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
    marginBottom: 10,
    //backgroundColor: "#D6E1F0",
  },
  circleStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
