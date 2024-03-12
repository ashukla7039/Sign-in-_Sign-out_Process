import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "react-native-calendars";
import Accordion from "./Accordian";
import Calenders from "./Calenders";

export default function HomePage({ route }) {
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

  const [loggedIn, setLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [swipeModalVisible, setSwipeModalVisible] = useState(false);
  const [loginTime, setLoginTime] = useState([]);
  const [logoutTime, setLogoutTime] = useState([]);
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [totalDuration, setTotalDuration] = useState(0);
  const [durationVisible, setDurationVisible] = useState(false);

  const [time, setTime] = React.useState();

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

  let interval;
  useEffect(() => {
    if (loggedIn) {
      setModalVisible(true);
    }
    calculateDuration();
    const interval = setInterval(calculateDuration, 1000);

    return () => clearInterval(interval);
  }, [loggedIn]);

  const handleLogin = () => {
    setLoggedIn(true);
    const lastLogoutTime =
      logoutTime.length > 0 ? logoutTime[logoutTime.length - 1] : 0;
    const now = Date.now();
    const consumedMilliseconds = now - lastLogoutTime;
    setLoginTime([...loginTime, now]);
    setDurationVisible(false);
    if (consumedMilliseconds > 24 * 60 * 60 * 1000) {
      setTotalDuration(0);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setModalVisible(true);
    setLogoutTime([...logoutTime, Date.now()]);
    calculateDuration();
    setDurationVisible(true);
  };

  const calculateDuration = () => {
    const firstLogin = loginTime[0];  
    const lastLogout = logoutTime[logoutTime.length - 1];  

    if (firstLogin && lastLogout) {
      const durationMilliseconds = lastLogout - firstLogin;
      const totalSeconds = Math.floor(durationMilliseconds / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setDuration({ hours, minutes, seconds });
    } else {
      setDuration({ hours: 0, minutes: 0, seconds: 0 });  
    }
  };
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const noLoggedIn = () => {
    setModalVisible(false);
    setLoggedIn(false);
  };
  const closeSwipeModal = () => {
    setSwipeModalVisible(false);
  };
  // const calculateDuration = () => {
  //   if (loggedIn) {
  //     const now = new Date().getTime();
  //     const consumedMilliseconds = now - loginTime;
  //     const consumedSeconds = Math.floor(consumedMilliseconds / 1000);
  //     const hours = Math.floor(consumedSeconds / 3600);
  //     const minutes = Math.floor(consumedSeconds / 3600) / 60;
  //     const seconds = consumedSeconds % 60;
  //     setDuration({ hours, minutes, seconds });
  //   }
  // };

  const { name } = route.params;
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  const now = new Date().getTime();
  const firstName = name.split(" ")[0];
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.dateContainer}>
            <Image source={image} style={styles.image} resizeMode="contain" />
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
          <View style={styles.cardContainer}>
            <LinearGradient
              style={styles.container}
              colors={["#e7d2dd", "#fbfbfb"]}
            >
              <View style={styles.contentContainer}>
                <View style={styles.circle}>
                  <Text style={styles.time}>{time}</Text>
                </View>
                <View style={styles.headerContainer}>
                  <Text style={styles.shiftDetails}>
                    {formattedDay} | 13:00 To 22:00 Shift 4
                  </Text>
                  <Text style={styles.date}>{formattedDate}</Text>

                  {loginTime[0] && (
                    <Pressable onPress={() => setSwipeModalVisible(true)}>
                      <Text style={{ color: "blue" }}>View Swipes</Text>
                    </Pressable>
                  )}
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
              {loginTime[0] ? (
                <Text style={styles.date}>
                  Sign-In Time : {new Date(loginTime[0]).toLocaleTimeString()}
                </Text>
              ) : (
                <Text style={styles.date}> </Text>
              )}

              {loggedIn ? (
                <Pressable onPress={handleLogout} style={styles.badge}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      textAlign: "center",
                      color: "white",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    Sign out
                  </Text>
                </Pressable>
              ) : (
                // </View>
                // <View
                //   style={{
                //     flexDirection: "row",
                //     alignItems: "center",
                //     justifyContent: "flex-end",
                //   }}
                // >
                <Pressable onPress={handleLogin} style={styles.badge}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      textAlign: "center",
                      color: "white",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    Sign In
                  </Text>
                </Pressable>
              )}
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
                {!loggedIn ? (
                  <View>
                    <Text style={styles.messageText}>
                      Are you sure? Your working hour is remaining .
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Pressable onPress={closeModal}>
                        <Text style={styles.closeIcon}>No</Text>
                      </Pressable>
                      <Pressable onPress={noLoggedIn}>
                        <Text style={styles.closeIcon}>Yes</Text>
                      </Pressable>
                    </View>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.messageText}>
                      Hey welcome! You are logged in.
                    </Text>
                    <Pressable onPress={closeModal}>
                      <Text
                        style={{
                          borderRadius: 10,
                          padding: 15,
                          width: 50,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#469486",
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
                  <Pressable onPress={closeSwipeModal}>
                    <MaterialIcons name="close" color="#000" size={25} />
                  </Pressable>
                </View>
                <ScrollView>
                  {loginTime.map((time, index) => (
                    <View key={index}>
                      <Text style={styles.swipeContentText}>
                        Sign-In {new Date(time).toLocaleTimeString()}
                      </Text>
                      {index < logoutTime.length && (
                        <Text style={styles.swipeContentText}>
                          Sign-Out{" "}
                          {new Date(logoutTime[index]).toLocaleTimeString()}
                        </Text>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.calenderCard}>
          <Calenders value={{ title: "Attedence Info" }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    padding: 15,
    paddingHorizontal: 10,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
  },
  contentContainer: {
    flexDirection: "row",
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 75,
    backgroundColor: "#fce5c0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
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
  },
  image: {
    height: 50,
    borderRadius: 50,
    marginBottom: 16,
  },
  buildImage: {
    height: 120,
    width: "100%",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
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
    padding: 8,
    marginTop: 2,
    backgroundColor: "#59a94e",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
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
  },
  swipeHeaderText: {
    fontSize: 22,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    color: "#000",
    fontWeight: "500",
  },
  swipeHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E5FBF3",
    borderBottomColor: "#000",
    borderRadius: 10,
    padding: 8,
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
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#469486",
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
});
