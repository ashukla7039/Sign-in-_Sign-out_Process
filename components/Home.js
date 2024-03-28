import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Calenders from "./Calenders";
export default function HomePage({ route }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [swipeModalVisible, setSwipeModalVisible] = useState(false);
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [durationVisible, setDurationVisible] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [markedDates, setMarkedDates] = useState({});
  const [allSwipes, setAllSwipes] = useState([]);

  const image = require("../assets/ait.png");
  const buildingImg = require("../assets/b1.png");

  const currentDate = new Date();
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const daysOptions = { weekday: "long" };
  const formattedDay = currentDate.toLocaleDateString("en-GB", daysOptions);
  const formattedDate = currentDate.toLocaleDateString("en-GB", options);
  const today = new Date();
  const date = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    separator: "/",
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const day = new Date().toLocaleString("default", { day: "2-digit" });
  const month = new Date().toLocaleString("default", { month: "2-digit" });
  const year = new Date().toLocaleString("default", { year: "numeric" });

  const isoDate = year + "-" + month + "-" + day;
  const updateMarkedDates = async (timestamp, color, text) => {
    const day = timestamp.toLocaleString("default", { day: "2-digit" });
    const month = timestamp.toLocaleString("default", { month: "2-digit" });
    const year = timestamp.toLocaleString("default", { year: "numeric" });

    const isoDate = year + "-" + month + "-" + day;

    setMarkedDates((prevMarkedDates) => ({
      ...prevMarkedDates,
      [isoDate]: {
        selected: true,
        selectedColor: color,
        text: text,
      },
    }));
    console.log(markedDates, "markedDates");
    await AsyncStorage.setItem("markedDates", JSON.stringify(markedDates));
  };
  useEffect(() => {
    const fetchSwipes = async () => {
      try {
        const LoggedIn = await AsyncStorage.getItem("loggedInStatus");
        const swipes = await AsyncStorage.getItem("swipes");
        const markedDates = await AsyncStorage.getItem("markedDates");
        const swipesArr = JSON.parse(swipes);
        console.log(swipesArr[0].date, "swipesArr");
        const swipe = await AsyncStorage.getItem("swipes");

        if (swipe) {
          setAllSwipes(JSON.parse(swipe));
        }

        if (LoggedIn === "true") {
          setLoggedIn(true);
        }
        if (markedDates) {
          setMarkedDates(JSON.parse(markedDates));
        }
      } catch (error) {
        console.error("Error fetching swipes", error);
      }
    };
    fetchSwipes();
  }, []);

  const handleLogin = async () => {
    setSignInModalVisible(false);
    const now = new Date().getTime();
    setDurationVisible(false);

    try {
      setLoggedIn(true);
      const currentDate = new Date().toDateString();
      const swipes = await AsyncStorage.getItem("swipes");

      if (swipes === null) {
        await AsyncStorage.setItem(
          "swipes",
          JSON.stringify([{ signIn: now, date: currentDate }])
        );
        await AsyncStorage.setItem(
          "duration",
          JSON.stringify({ hours: 0, minutes: 0, seconds: 0 })
        );
      } else {
        const swipesArray = JSON.parse(swipes);

        const existingIndex = swipesArray.lastIndexOf(
          (item) => item.date === currentDate
        );

        swipesArray.push({ signIn: now, date: currentDate });
        await AsyncStorage.setItem(
          "duration",
          JSON.stringify({ hours: 0, minutes: 0, seconds: 0 })
        );

        const previousDateIndex = swipesArray.lastIndexOf(
          (item) => item.date !== currentDate
        );
        if (previousDateIndex !== -1) {
          swipesArray.splice(0, previousDateIndex + 1);
        }

        await AsyncStorage.setItem("swipes", JSON.stringify(swipesArray));
        setAllSwipes(swipesArray);

        const signInTime =
          swipesArray[
            allSwipes.map((e) => e.date).indexOf(new Date().toDateString())
          ]?.signIn;
        const signOutTime = swipesArray[swipesArray.length - 1].signOut;
        const durationMilliseconds = signOutTime - signInTime;

        if (durationMilliseconds >= 28800000) {
          updateMarkedDates(new Date(), "#66ff66", "P");
        } else if (durationMilliseconds <= 10800000) {
          updateMarkedDates(new Date(), "#ff8533", "H");
        } else {
          updateMarkedDates(new Date(), "red", "A");
        }
      }

      await AsyncStorage.setItem("loggedInStatus", "true");
    } catch (error) {
      console.error("Error saving login time:", error);
    }
  };
  console.log(allSwipes, "ghjkl");
  const handleLogout = async () => {
    setModalVisible(false);
    const now = new Date().getTime();
    setDurationVisible(true);

    try {
      setLoggedIn(false);
      const currentDate = new Date().toDateString();
      const swipes = await AsyncStorage.getItem("swipes");

      if (swipes === null) {
        await AsyncStorage.setItem(
          "swipes",
          JSON.stringify([{ signOut: now, date: currentDate }])
        );
      } else {
        let swipesArray = JSON.parse(swipes);
        const existingIndex = swipesArray.lastIndexOf(
          (item) => item.date === currentDate
        );

        if (existingIndex !== -1) {
          swipesArray[existingIndex].signOut = now;
        } else {
          swipesArray[swipesArray.length - 1].signOut = now;
        }

        const previousDateIndex = swipesArray.lastIndexOf(
          (item) => item.date !== currentDate
        );
        if (previousDateIndex !== -1) {
          swipesArray.splice(0, previousDateIndex + 1);
        }

        await AsyncStorage.setItem("swipes", JSON.stringify(swipesArray));
        setAllSwipes(swipesArray);

        const signInTime =
          swipesArray[
            allSwipes.map((e) => e.date).indexOf(new Date().toDateString())
          ]?.signIn;
        const signOutTime = swipesArray[swipesArray.length - 1].signOut;
        const durationMilliseconds = signOutTime - signInTime;

        if (durationMilliseconds >= 28800000) {
          updateMarkedDates(new Date(), "#66ff66", "P");
        } else if (durationMilliseconds <= 10800000) {
          updateMarkedDates(new Date(), "#ff8533", "H");
        } else {
          updateMarkedDates(new Date(), "red", "A");
        }
      }

      await AsyncStorage.setItem("loggedInStatus", "false");
    } catch (error) {
      console.error("Error saving logout time to AsyncStorage:", error);
    }

    calculateDuration();
  };

  const calculateDuration = async () => {
    const swipesArray = await AsyncStorage.getItem("swipes");
    const swipesArr = JSON.parse(swipesArray);
    if (swipesArr.length > 0 && swipesArr[swipesArr.length - 1].date) {
      const signInTime =
        swipesArr[
          allSwipes.map((e) => e.date).indexOf(new Date().toDateString())
        ]?.signIn;
      const signOutTime = swipesArr[swipesArr?.length - 1].signOut;
      console.log(signInTime, "signInTime");
      console.log(signOutTime, "signOutTime");
      const durationMilliseconds = signOutTime - signInTime;

      console.log(durationMilliseconds, "durationMilliseconds");
      console.log(swipesArr[swipesArr.length - 1].date, "swipesArr Date");
      const totalSeconds = Math.floor(durationMilliseconds / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setDuration({ hours, minutes, seconds });
      await AsyncStorage.setItem("duration", JSON.stringify(duration));
    } else {
      setDuration({ hours: 0, minutes: 0, seconds: 0 });
    }
  };
  const handleModal = async () => {
    const swipesArray = await AsyncStorage.getItem("swipes");
    const swipesArr = JSON.parse(swipesArray);
    const signInTime =
      swipesArr[allSwipes.map((e) => e.date).indexOf(new Date().toDateString())]
        ?.signIn;
    const signOutTime = new Date().getTime();

    const durationMilliseconds = signOutTime - signInTime;
    const totalSeconds = Math.floor(durationMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    console.log(
      durationMilliseconds,
      hours,
      "durationMilliseconds hpurssssssdsfhjk"
    );
    if (loggedIn) {
      if (durationMilliseconds >= 28800000) {
        handleLogout();
      } else {
        setModalVisible(true);
      }
      //setModalVisible(true);
    } else if (!loggedIn) {
      setSignInModalVisible(true);
    }
  };
  const closeModal = () => {
    handleLogin();
  };

  const closeSwipeModal = () => {
    setSwipeModalVisible(false);
  };

  const { name } = route.params;
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  const firstName = name.split(" ")[0];

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, marginBottom: 10 }}>
          <View style={styles.card}>
            {/* <View style={styles.dateContainer}>
              <Image source={image} style={styles.image} resizeMode="contain" />
              <View style={styles.avatar}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  {initials}
                </Text>
              </View>
            </View> */}
            <Text style={styles.message}>Hello {firstName} 👋</Text>

            <Image
              source={buildingImg}
              style={styles.buildImage}
              resizeMode="contain"
            />
            <View style={styles.cardContainer}>
              <LinearGradient
                style={styles.container}
                colors={["#e7d2dd", "#fbfbfb"]}
              >
                {/* <Image
                  source={buildingImg}
                  style={styles.buildImage}
                  resizeMode="contain"
                /> */}
                <View style={styles.contentContainer}>
                  <View
                    style={{
                      //marginTop: 10,
                      marginHorizontal: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 8,
                    }}
                  >
                    <LinearGradient
                      style={styles.circle}
                      colors={["#59a94e", "#fff"]}
                      //colors={["#ef7e2d", "#fff", "#59a94e"]}
                    >
                      {/* <View> */}
                      <Text style={styles.time}>{time}</Text>
                      {/* </View> */}
                    </LinearGradient>
                  </View>

                  <View style={styles.headerContainer}>
                    <Text style={styles.shiftDetails}>
                      {formattedDay} | 13:00 To 22:00 Shift 4
                    </Text>
                    <Text style={styles.date}>{formattedDate}</Text>

                    <Pressable onPress={() => setSwipeModalVisible(true)}>
                      <Text style={{ color: "#2779FA" }}>View Swipes</Text>
                    </Pressable>
                  </View>
                </View>

                {durationVisible && (
                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                      }}
                    >
                      Duration: {duration.hours} : {duration.minutes} :
                      {duration.seconds}
                    </Text>
                  </View>
                )}
              </LinearGradient>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                {loggedIn ? (
                  <Text style={styles.date}>
                    Log In Time:{" "}
                    {new Date(
                      allSwipes[
                        allSwipes
                          .map((e) => e.date)
                          .indexOf(new Date().toDateString())
                      ]?.signIn
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </Text>
                ) : (
                  <Text style={styles.date}> </Text>
                )}
                <Pressable onPress={handleModal} style={styles.badge}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      textAlign: "center",
                      color: "white",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      width: 80,
                    }}
                  >
                    {loggedIn ? "Sign-Out" : "Sign-In"}
                  </Text>
                </Pressable>
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalView}>
                  {loggedIn && (
                    <View>
                      <Text style={styles.messageText}>
                        Are you sure? Your working hour is not completed.
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <Pressable onPress={handleLogout}>
                          <Text style={styles.closeIcon}>Yes</Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(false)}>
                          <Text style={styles.closeIcon}>No</Text>
                        </Pressable>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={signInModalVisible}
              onRequestClose={() => setSignInModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalView}>
                  {!loggedIn && (
                    <View>
                      <Text style={styles.messageText}>
                        Hey welcome! You are logged in.
                      </Text>
                      <Pressable
                        onPress={closeModal}
                        style={{
                          direction: "row",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            borderRadius: 10,
                            padding: 8,
                            fontSize: 16,
                            width: 50,
                            color: "#fff",
                            textAlign: "center",
                            backgroundColor: "#1378f1",
                          }}
                        >
                          Ok
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={swipeModalVisible}
              onRequestClose={() => setSwipeModalVisible(false)}
            >
              <View style={styles.swipeModalContent}>
                <View style={styles.modalView}>
                  <View style={styles.swipeHeaderContainer}>
                    <Text style={styles.swipeHeaderText}>Today's Swipes</Text>
                    <Pressable
                      onPress={closeSwipeModal}
                      style={{
                        borderRadius: 10,
                        backgroundColor: "#fff",
                        borderCurve: 5,
                        padding: 5,
                      }}
                    >
                      <MaterialIcons name="close" color="#000" size={25} />
                    </Pressable>
                  </View>
                  <ScrollView>
                    {allSwipes &&
                      allSwipes?.length > 0 &&
                      allSwipes?.map((item, index) => {
                        if (item.date === new Date().toDateString()) {
                          return (
                            <View key={index}>
                              {item?.signIn && (
                                <Text style={styles.swipeContentText}>
                                  Sign-In{" "}
                                  {new Date(item.signIn).toLocaleTimeString()}
                                </Text>
                              )}

                              {item?.signOut && (
                                <Text style={styles.swipeContentText}>
                                  Sign-Out{" "}
                                  {new Date(item.signOut).toLocaleTimeString()}
                                </Text>
                              )}
                            </View>
                          );
                        }
                      })}
                  </ScrollView>
                </View>
              </View>
            </Modal>
            <Calenders markedDates={markedDates} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
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
  calenderCard: {
    padding: 15,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  container: {
    alignItems: "flex-end",
    borderRadius: 10,
    padding: 20,
    paddingHorizontal: 10,
  },
  cardContainer: {
    backgroundColor: "#EBE1F0",
    borderRadius: 8,
    padding: 10,
  },
  contentContainer: {
    flexDirection: "row",
    padding: 5,
  },
  circle: {
    width: 90,
    height: 90,
    position: "fixed",
    borderRadius: 75,
    // backgroundColor: "#1378f1",
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
  headerContainer: {
    alignItems: "flex-end",
    marginTop: 20,
  },

  shiftDetails: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    padding: 5,
  },
  date: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
  },

  message: {
    fontSize: 32,
    fontWeight: "bold",
    flexDirection: "row",
    paddingBottom: 10,
    marginLeft: 10,
  },
  image: {
    height: 50,
    borderRadius: 50,
    marginBottom: 16,
  },
  buildImage: {
    height: 150,
    width: "100%",
    borderRadius: 50,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  badge: {
    padding: 10,
    marginTop: 5,
    backgroundColor: "#59a94e",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    borderCurve: "10",
  },
  modalContent: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  messageText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  swipeModalContent: {
    flex: 2,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    //backgroundColor: "#469486",
  },
  swipeHeaderText: {
    fontSize: 22,
    //backgroundColor: "#1378f1",
    display: "flex",
    margin: "10",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,

    fontWeight: "500",
    color: "#fff",
  },
  swipeHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    // backgroundColor: "#E4E4E4",
    borderBottomColor: "#000",
    backgroundColor: "#1378f1",

    borderRadius: 10,
    padding: 5,
    marginBottom: 5,
  },
  swipeContentText: {
    fontSize: 18,
    fontWeight: "400",
    borderWidth: 1,
    borderColor: "#9E9FA0",
    borderRadius: 5,
    padding: 5,
    margin: 2,
    backgroundColor: "#F0F3F4",
    marginBottom: 5,
    color: "#000",
  },
  closeIcon: {
    borderRadius: 10,
    padding: 8,
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#1378f1",
    color: "#fff",
    width: 60,
  },

  avatar: {
    height: 50,
    width: 50,
    marginRight: 15,
    backgroundColor: " ",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#ff8533",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    padding: 15,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  accordionContainer: {
    backgroundColor: "#fff",
    marginTop: 10,

    borderRadius: 14,
    borderWidth: 1,
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
    marginBottom: 15,
    //backgroundColor: "#D6E1F0",
  },
  circleStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
