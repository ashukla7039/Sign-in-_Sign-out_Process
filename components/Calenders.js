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

const Calenders = ({ value }) => {
  const [open, setOpen] = useState(false);
  const heightValue = useSharedValue(0);
  const progress = useDerivedValue(() =>
    open ? withTiming(1) : withTiming(0)
  );

  const toggleAccordion = () => {
    setOpen(!open);
    heightValue.value = open ? withTiming(0) : withTiming(400);
  };

  const heightStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));
  const animatedStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));
  return (
    <View style={styles.container}>
      <Pressable onPress={toggleAccordion} style={styles.titleContainer}>
        <Text style={styles.textTitle}> {value.title}</Text>
        <Chevron progress={progress} />
      </Pressable>

      {open && (
        <Animated.View style={[styles.content, animatedStyle]}>
          <Calendar />
          {/* <ABCD /> */}
        </Animated.View>
      )}
    </View>
  );
};

export default Calenders;

const styles = StyleSheet.create({
  container: {
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
