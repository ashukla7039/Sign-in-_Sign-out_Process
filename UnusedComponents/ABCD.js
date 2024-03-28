import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Calendars = ({ selectedDate, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (num) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + num, 1)
    );
  };

  const onPressDate = (date) => {
    onDateChange(date);
    setCurrentDate(date);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <Text>{currentDate.toLocaleString("default", { month: "long" })}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDays = () => {
    const days = [];
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <Text key={i} style={styles.emptyDate}>
          {""}
        </Text>
      );
    }

    const totalDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      days.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.date,
            selectedDate &&
              selectedDate.toDateString() === date.toDateString() &&
              styles.selectedDate,
          ]}
          onPress={() => onPressDate(date)}
        >
          <Text>{i}</Text>
        </TouchableOpacity>
      );
    }

    const remainingCells = 42 - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push(
        <Text key={i + totalDays} style={styles.emptyDate}>
          {""}
        </Text>
      );
    }

    return <View style={styles.daysContainer}>{days}</View>;
  };

  return (
    <View style={styles.calendar}>
      {renderHeader()}
      {renderDays()}
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  date: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 2,
  },
  selectedDate: {
    backgroundColor: "blue",
  },
  emptyDate: {
    width: 40,
    height: 40,
  },
});

export default Calendars;
