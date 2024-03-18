import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Chevron from "./Chevron";

const Hello = ({ route }) => {
  const image = require("../assets/ait.png");
  const buildingImg = require("../assets/b1.png");
  const [signedIn, setSignedIn] = useState(false);
  const [signInTime, setSignInTime] = useState(null);
  const [signOutTime, setSignOutTime] = useState(null);
  const [swipes, setSwipes] = useState([]);

  const [duration, setDuration] = useState("00:00:00");

  const [viewSwipesVisible, setViewSwipesVisible] = useState(false);
  const [tableData, setTableData] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const heightValue = useSharedValue(0);

  const handleSignInOut = async () => {
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();
    const now = new Date().getTime();

    if (signedIn) {
      //toggleModal();
      setSignOutTime(currentTime);

      calculateDuration();
      //setViewSwipesVisible(false);

      try {
        await AsyncStorage.setItem("signedIn", "false");
        await AsyncStorage.setItem("signOutTime", currentTime);
        await AsyncStorage.setItem("duration", duration);
        const newData = { signInTime, signOutTime, duration };
        setTableData((prevData) => ({ ...prevData, [currentDate]: newData }));
        await AsyncStorage.setItem("tableData", JSON.stringify(tableData));
      } catch (error) {
        console.error("Error saving sign-out details:", error);
      }
      updateMarkedDates(currentTime, "red");
    } else {
      setSignInTime(currentTime);
      // toggleSignInModal();
      //setViewSwipesVisible(true); // Show view swipes after first sign in
      try {
        await AsyncStorage.setItem("signedIn", "true");
        await AsyncStorage.setItem("signInTime", currentTime);
      } catch (error) {
        console.error("Error saving sign-in details:", error);
      }
      updateMarkedDates(now, "green");
    }
    setSignedIn((prevState) => !prevState);
  };

  useEffect(() => {
    checkSignInStatus();
  }, []);
  useEffect(() => {
    calculateDuration();
  }, [signInTime, signOutTime]);
  const checkSignInStatus = async () => {
    try {
      const storedSignedIn = await AsyncStorage.getItem("signedIn");
      if (storedSignedIn === "true") {
        const storedSignInTime = await AsyncStorage.getItem("signInTime");
        const storedSignOutTime = await AsyncStorage.getItem("signOutTime");
        const storedDuration = await AsyncStorage.getItem("duration");
        setSignedIn(true);
        setSignInTime(storedSignInTime);
        setSignOutTime(storedSignOutTime);
        setDuration(storedDuration);
      } else {
        setSignedIn(false);
        setSignInTime(null);
        setSignOutTime(null);
        setDuration("00:00:00");
      }
    } catch (error) {
      console.error("Error checking sign-in status:", error);
    }
  };

  // const calculateDuration = () => {
  //   if (signInTime && signOutTime) {
  //     // Calculate duration logic
  //     const signInTimestamp = new Date(signInTime).getTime();
  //     const signOutTimestamp = new Date(signOutTime).getTime();
  //     const milliseconds = signOutTimestamp - signInTimestamp;
  //     const hours = milliseconds / (1000 * 60 * 60);
  //     const color = hours >= 8 ? "green" : "red";
  //     updateMarkedDates(currentDate, color);
  //   }
  // };
  // const calculateDuration = () => {
  //   if (signInTime && signOutTime) {
  //     const signInTimestamp = new Date(signInTime).getTime();
  //     const signOutTimestamp = new Date(signOutTime).getTime();
  //     const milliseconds = signOutTimestamp - signInTimestamp;
  //     const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  //     const minutes = Math.floor(
  //       (milliseconds % (1000 * 60 * 60)) / (1000 * 60)
  //     );
  //     const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  //     const formattedDuration = `${hours}:${minutes}:${seconds}`;
  //     setDuration(formattedDuration);
  //   }
  // };
  const calculateDuration = async () => {
    // const firstLogin = loginTime[0];
    // const lastLogout = logoutTime[logoutTime.length - 1];

    if (signInTime && signOutTime) {
      const durationMilliseconds = signOutTime - signInTime;
      const totalSeconds = Math.floor(durationMilliseconds / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const formattedDuration = `${hours}:${minutes}:${seconds}`;
      setDuration(formattedDuration);
      // await AsyncStorage.setItem("duration", duration);
    }
  };

  const toggleModal = () => {
    setModalVisible((prevState) => !prevState);
  };

  const toggleSignInModal = () => {
    setSignInModalVisible((prevState) => !prevState);
  };

  const handleSignOut = async () => {
    // Your sign out logic here
    toggleModal();
  };
  const toggleViewSwipesModal = () => {
    //setViewSwipesModalVisible(!viewSwipesModalVisible);
    setViewSwipesVisible(!viewSwipesVisible);
  };

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // const updateMarkedDates = (date, color) => {
  //   setMarkedDates((prevMarkedDates) => ({
  //     ...prevMarkedDates,
  //     [date]: { selected: true, selectedColor: color },
  //   }));
  // };
  const updateMarkedDates = (timestamp, color, text) => {
    const date = new Date(timestamp);
    const isoDate = date.toISOString().split("T")[0];
    setMarkedDates((prevMarkedDates) => ({
      ...prevMarkedDates,
      [isoDate]: {
        selected: true,
        selectedColor: color,
        text: text,
      },
    }));
  };

  const { name } = route.params;
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  const firstName = name.split(" ")[0];

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
    <>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.card}>
              <View style={styles.dateContainer}>
                <Image
                  source={image}
                  style={styles.image}
                  resizeMode="contain"
                />
                <View style={styles.avatar}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      color: "#000",
                    }}
                  >
                    {initials}
                  </Text>
                </View>
              </View>
              <Text style={styles.message}>Hello {firstName} 👋</Text>

              <Image
                source={buildingImg}
                style={styles.buildImage}
                resizeMode="contain"
              />
              <LinearGradient
                colors={["#e7d2dd", "#fbfbfb"]}
                style={styles.cardContainer}
              >
                <View style={styles.leftContent}>
                  <View style={styles.circle}>
                    <Text style={styles.timeText}>{currentTime}</Text>
                  </View>
                  {signedIn && (
                    <Text style={styles.signInTimeText}>
                      Sign-In Time: {signInTime}
                    </Text>
                  )}
                </View>
                <View style={styles.rightContent}>
                  <View style={styles.shiftContainer}>
                    <Text style={styles.shiftText}>
                      Working Shift: 13:00 to 22:00
                    </Text>
                    <Text style={styles.dateText}>{currentDate}</Text>
                  </View>
                  {signInTime && (
                    <Pressable
                      style={styles.swipesButton}
                      onPress={() => setViewSwipesVisible(true)}
                    >
                      <Text style={styles.buttonText}>View Swipes</Text>
                    </Pressable>
                  )}
                  {!signedIn && (
                    <View style={styles.durationContainer}>
                      <Text style={styles.durationText}>
                        Duration: {duration}
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.signInButton}
                    onPress={handleSignInOut}
                  >
                    <Text style={styles.buttonText}>
                      {signedIn ? "Sign Out" : "Sign In"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={viewSwipesVisible}
                  onRequestClose={() => setViewSwipesVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>View Swipes</Text>
                      {swipes.map((swipe, index) => (
                        <Text key={index} style={styles.swipeText}>
                          {swipe.type} Time: {swipe.time}
                        </Text>
                      ))}
                      <Pressable
                        style={styles.closeButton}
                        onPress={toggleViewSwipesModal}
                      >
                        <Text>Close</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                >
                  <View style={styles.modalContainer}>
                    <Text>Are you sure you want to sign out?</Text>
                    <TouchableOpacity onPress={handleSignOut}>
                      <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleModal}>
                      <Text style={styles.buttonText}>No</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={signInModalVisible}
                >
                  <View style={styles.modalContainer}>
                    <Text>Hey, you are logged in!</Text>
                    <TouchableOpacity onPress={toggleSignInModal}>
                      <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </LinearGradient>
            </View>
            <View style={styles.accordionContainer}>
              <Pressable
                onPress={toggleAccordion}
                style={styles.titleContainer}
              >
                <Text style={styles.textTitle}> Attedence Info</Text>
                <Chevron progress={progress} />
              </Pressable>

              {open && (
                <Animated.View style={[styles.content, animatedStyle]}>
                  <Calendar markedDates={markedDates} />
                  {/* <ABCD /> */}
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <View
                      style={[styles.circleStyle, { backgroundColor: "green" }]}
                    />
                    <Text style={styles.attendenceText}>Present</Text>
                    <View
                      style={[styles.circleStyle, { backgroundColor: "red" }]}
                    />
                    <Text style={styles.attendenceText}>Absent</Text>
                    <View
                      style={[
                        styles.circleStyle,
                        { backgroundColor: "yellow" },
                      ]}
                    />
                    <Text style={styles.attendenceText}>Half Day</Text>
                    <View
                      style={[
                        styles.circleStyle,
                        { backgroundColor: "skyblue" },
                      ]}
                    />
                    <Text style={styles.attendenceText}>Holiday</Text>
                  </View>
                </Animated.View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  image: {
    height: 50,
    borderRadius: 50,
    marginBottom: 16,
  },
  avatar: {
    height: 50,
    width: 50,
    marginRight: 15,
    backgroundColor: " ",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "yellow",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  leftContent: {
    flex: 1,
    // alignItems: "center",
  },
  rightContent: {
    flex: 3,
    alignItems: "flex-end",
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 75,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  timeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  shiftContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  shiftText: {
    fontSize: 18,
  },
  dateText: {
    fontSize: 14,
    justifyContent: "flex-end",
  },
  swipesButton: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: "lightgreen",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accordionContainer: {
    backgroundColor: "#f5f5f5",
    margin: 10,
    //minHeight: "auto",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000",
    overflow: "hidden",
  },
  titleContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 18,
    color: "black",
    fontWeight: "500",
  },
  content: {
    padding: 10,
    margin: 15,
    //backgroundColor: "#D6E1F0",
  },
  circleStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  attendenceText: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});

export default Hello;
