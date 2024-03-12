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
  Touchable,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ route }) {
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

  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [loginTime, setLoginTime] = useState([]);
  const [logoutTime, setLogoutTime] = useState([]);
  const [durationVisible, setDurationVisible] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    calculateDuration();
  }, [loginTime, logoutTime]);

  // const handleLogin = () => {
  //   setLoggedIn(true);
  //   setLoginTime(Date.now());
  //   setDurationVisible(false);
  // };
  // const handleLogin = () => {
  //   setLoggedIn(true);
  //   setLoginTime([...loginTime, Date.now()]);
  //   setDurationVisible(false);
  // };
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
  // const handleLogout = () => {
  //   setLoggedIn(false);
  //   setModalVisible(true);
  //   setLogoutTime(Date.now());
  //   setDurationVisible(true);
  // };
  const handleLogout = () => {
    setLoggedIn(false);
    setModalVisible(true);
    setLogoutTime([...logoutTime, Date.now()]);
    setDurationVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const closeSwipeModal = () => {
    setSwipeModalVisible(false);
  };

  // const calculateDuration = () => {
  //   if (!loggedIn && logoutTime !== 0) {
  //     const consumedMilliseconds = logoutTime - loginTime;
  //     const consumedSeconds = Math.floor(consumedMilliseconds / 1000);
  //     const hours = Math.floor(consumedSeconds / 3600);
  //     const minutes = Math.floor((consumedSeconds % 3600) / 60);
  //     const seconds = consumedSeconds % 60;
  //     setDuration({ hours, minutes, seconds });
  //   }
  // };
  // const calculateDuration = () => {
  //   if (logoutTime.length > 0) {
  //     const lastLogoutTime = logoutTime[logoutTime.length - 1];
  //     const lastLoginTime = loginTime[loginTime.length - 1];
  //     const consumedMilliseconds = lastLogoutTime - lastLoginTime;
  //     const consumedSeconds = Math.floor(consumedMilliseconds / 1000);
  //     const hours = Math.floor(consumedSeconds / 3600);
  //     const minutes = Math.floor((consumedSeconds % 3600) / 60);
  //     const seconds = consumedSeconds % 60;
  //     setDuration({ hours, minutes, seconds });
  //   }
  // };

  const calculateDuration = () => {
    let totalMilliseconds = 0;
    for (let i = 0; i < loginTime.length; i++) {
      const login = loginTime[i];
      const logout = logoutTime[i];
      if (logout) {
        totalMilliseconds += logout - login;
      } else {
        totalMilliseconds += Date.now() - login;
      }
    }

    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    setTotalDuration(totalMilliseconds);
    setDuration({ hours, minutes, seconds });
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
            </View>
          </View>
          <View>
            <Pressable onPress={() => setSwipeModalVisible(true)}>
              <Text>Swipes</Text>
            </Pressable>
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

          {loggedIn ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: 5,
              }}
            >
              <Pressable onPress={handleLogout} style={styles.badge}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Sign out
                </Text>
              </Pressable>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Pressable onPress={handleLogin} style={styles.badge}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Sign In
                </Text>
              </Pressable>
            </View>
          )}
        </LinearGradient>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalView}>
              {!loggedIn ? (
                <Text style={styles.messageText}>
                  Are you sure? Your working hour is remaining .
                </Text>
              ) : (
                <Text style={styles.messageText}>
                  Hey welcome! You are logged in.
                </Text>
              )}

              <Pressable onPress={closeModal}>
                <Text style={styles.closeIcon}>Ok </Text>
              </Pressable>
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
            <Text style={styles.swipeTextMessage}>
              Swipe to view your working hours.
            </Text>

            {/* <Text>Sign In Time</Text>
              <Text>Sign Out Time</Text>
              <Text>Sign In Time</Text>
              <Text>Sign Out Time</Text>
              <Text>Sign In Time</Text>
              <Text>Sign Out Time</Text>
              <Text>Sign In Time</Text>
              <Text>Sign Out Time</Text>
              <Text>Sign In Time</Text>
              <Text>Sign Out Time</Text>
              <Text>Sign In Time</Text>
              <Text>Sign Out Time</Text>
              <Text>Sign In Time</Text> */}
            <View style={styles.swipeModalView}>
              <ScrollView>
                {loginTime.map((time, index) => (
                  <View key={index}>
                    <Text style={{ fontWeight: "bold" }}>
                      Sign In Time: {new Date(time).toLocaleTimeString()}
                    </Text>
                    {index < logoutTime.length && (
                      <Text>
                        Sign Out Time:{" "}
                        {new Date(logoutTime[index]).toLocaleTimeString()}
                      </Text>
                    )}
                  </View>
                ))}
              </ScrollView>
              <Pressable onPress={closeSwipeModal}>
                <Text style={styles.closeIcon}>Ok </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
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
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  container: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
  },
  contentContainer: {
    flexDirection: "row",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 75,
    backgroundColor: "#fce5c0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    marginLeft: 20,
    marginTop: 20,
  },
  time: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  headerContainer: {
    alignItems: "flex-end",
    marginTop: 20,
  },

  shiftDetails: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  date: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
    justifyContent: "flex-end",
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
    backgroundColor: "#59a94e",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  modalContent: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
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
  },
  swipeModalContent: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 1, 0, 0.5)",
  },
  swipeModalView: {
    flex: 2 / 5,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  swipeTextMessage: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  closeIcon: {
    borderRadius: 10,
    textAlign: "right",
    width: 60,
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
