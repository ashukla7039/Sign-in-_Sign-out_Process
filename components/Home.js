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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Chevron from "./Chevron";
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
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [swipeModalVisible, setSwipeModalVisible] = useState(false);
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [totalDuration, setTotalDuration] = useState(0);
  const [durationVisible, setDurationVisible] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [markedDates, setMarkedDates] = useState({});
  const [open, setOpen] = useState(false);
  const [allSwipes, setAllSwipes] = useState([]);
  const heightValue = useSharedValue(0);

  const progress = useDerivedValue(() =>
    open ? withTiming(1) : withTiming(0)
  );

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
  const updateMarkedDates = async (timestamp, color, text) => {
    const date = new Date(timestamp);
    console.log(date, "dategfhjkhgfghj");
    const isoDate = date.toISOString().split("T")[0];
    const swipes = await AsyncStorage.getItem("swipes");
    const swipesArr = JSON.parse(swipes);
    const now = new Date().getTime();
    const markedDates = await AsyncStorage.getItem("markedDates");
    let updateMarkedDates = {};
    if (swipesArr != null && swipesArr.length > 0 && swipesArr[0].signIn) {
      if (now - swipesArr[0].signIn >= 28800000) {
        if (Object.keys(markedDates).length > 0) {
          updateMarkedDates = {
            ...markedDates,
            [isoDate]: {
              selected: true,
              selectedColor: "green",
            },
          };
        }
      } else {
        if (Object.keys(markedDates).length > 0) {
          updateMarkedDates = {
            ...markedDates,
            [isoDate]: {
              selected: true,
              selectedColor: "red",
            },
          };
        }
      }
    }
    // setMarkedDates((prevMarkedDates) => ({
    //   ...prevMarkedDates,
    //   [isoDate]: {
    //     selected: true,
    //     selectedColor: color,
    //     text: text,
    //   },
    // }));
    setMarkedDates(updateMarkedDates);
    await AsyncStorage.removeItem("markedDates");
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

        if (swipes) {
          setAllSwipes(JSON.parse(swipes));
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
    //setModalVisible(true);
    setSignInModalVisible(false);
    const now = new Date().getTime();
    console.log(allSwipes[allSwipes.length - 1]?.signIn, "dates");
    setDurationVisible(false);

    try {
      setLoggedIn(true);
      const swipes = await AsyncStorage.getItem("swipes");
      if (swipes === null) {
        await AsyncStorage.setItem("swipes", JSON.stringify([]));
      } else {
        const swipesArray = JSON.parse(swipes);

        swipesArray.push({ signIn: now, date: date });

        await AsyncStorage.removeItem("swipes");
        await AsyncStorage.setItem("swipes", JSON.stringify(swipesArray));
        setAllSwipes(swipesArray);
        console.log(swipesArray, "swipesArray In login");
      }
      await AsyncStorage.setItem("loggedInStatus", "true");
    } catch (error) {
      console.error("Error saving login time:", error);
    }

    updateMarkedDates(now, "green", "P");
  };

  const handleLogout = async () => {
    setModalVisible(false);
    const now = new Date().getTime();
    setDurationVisible(true);

    try {
      setLoggedIn(false);
      const swipes = await AsyncStorage.getItem("swipes");
      if (swipes === null) {
        await AsyncStorage.removeItem("swipes");

        await AsyncStorage.setItem("swipes", JSON.stringify([]));
      } else {
        const swipesArray = JSON.parse(swipes);
        swipesArray[swipesArray.length - 1].signOut = now;
        const signInTime = swipesArray[0].signIn;
        const signOutTime = swipesArray[swipesArray?.length - 1].signOut;

        await AsyncStorage.removeItem("swipes");
        await AsyncStorage.setItem("swipes", JSON.stringify(swipesArray));
        console.log(swipesArray, "swipesArray");
        setAllSwipes(swipesArray);
      }
      await AsyncStorage.setItem("loggedInStatus", "false");
    } catch (error) {
      console.error("Error saving logout time to AsyncStorage:", error);
    }

    updateMarkedDates(now, totalDuration >= 8 ? "green" : "red", "A");
    calculateDuration();
  };

  const calculateDuration = async () => {
    const swipesArray = await AsyncStorage.getItem("swipes");
    const swipesArr = JSON.parse(swipesArray);
    if (swipesArr.length > 0) {
      const signInTime = swipesArr[0].signIn;
      const signOutTime = swipesArr[swipesArr?.length - 1].signOut;
      console.log(signInTime, "signInTime");
      console.log(signOutTime, "signOutTime");
      const durationMilliseconds = signOutTime - signInTime;

      console.log(durationMilliseconds, "durationMilliseconds");
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

  const handleModal = () => {
    if (loggedIn) {
      setModalVisible(true);
    } else if (!loggedIn) {
      setSignInModalVisible(true);
    }
  };
  const closeModal = () => {
    // setModalVisible(false);

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
  const now = new Date().getTime();
  const firstName = name.split(" ")[0];
  const toggleAccordion = () => {
    setOpen(!open);
    heightValue.value = open ? withTiming(0) : withTiming(400);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.card}>
            <View style={styles.dateContainer}>
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

                    {allSwipes?.length > 0 && (
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
                {loggedIn ? (
                  <Text style={styles.date}>
                    Sign-In Time:{" "}
                    {new Date(allSwipes[0]?.signIn).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </Text>
                ) : (
                  <Text style={styles.date}> </Text>
                )}

                {/* {loggedIn && ( */}
                <Pressable onPress={handleModal} style={styles.badge}>
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
                    {loggedIn ? "Sign Out" : "Sign In"}
                  </Text>
                </Pressable>
                {/* )} */}
                {/* {!loggedIn && (
                  <Pressable onPress={openModal} style={styles.badge}>
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
                )} */}
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
                        Are you sure? Your working hour is remaining .
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Pressable onPress={() => setModalVisible(false)}>
                          <Text style={styles.closeIcon}>No</Text>
                        </Pressable>
                        <Pressable onPress={handleLogout}>
                          <Text style={styles.closeIcon}>Yes</Text>
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
                    {allSwipes &&
                      allSwipes?.length > 0 &&
                      allSwipes?.map((item, index) => (
                        <View key={index}>
                          {item.signIn && (
                            <Text style={styles.swipeContentText}>
                              Sign-In{" "}
                              {new Date(item.signIn).toLocaleTimeString()}
                            </Text>
                          )}

                          {item.signOut && (
                            <Text style={styles.swipeContentText}>
                              Sign-Out{" "}
                              {new Date(item.signOut).toLocaleTimeString()}
                            </Text>
                          )}

                          {/* <Text style={styles.swipeContentText}>
                            Sign-In {new Date(item).toLocaleTimeString()}
                          </Text>
                          {index < logoutTime.length && (
                            <Text style={styles.swipeContentText}>
                              Sign-Out{" "}
                              {new Date(logoutTime[index]).toLocaleTimeString()}
                            </Text>
                          )} */}
                        </View>
                      ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
            <View style={styles.accordionContainer}>
              <Pressable
                onPress={toggleAccordion}
                style={styles.titleContainer}
              >
                <Text style={styles.textTitle}> Attendance Info</Text>
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
    margin: 5,
  },
  circle: {
    width: "25%",
    aspectRatio: 1,
    //borderRadius: "50%",
    borderRadius: 75,
    backgroundColor: "#fce5c0",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginRight: 7,
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
  accordionContainer: {
    backgroundColor: "#f5f5f5",
    marginTop: 10,
    //minHeight: "auto",
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
    margin: 15,
    //backgroundColor: "#D6E1F0",
  },
  circleStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  attendenceText: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
{
  /* <Calenders
            title={"Attedence Info"}
            loginTimes={loginTime}
            logoutTimes={logoutTime}
            markedEvents={markEventInCalendar}
          /> */
}
// useEffect(() => {
//   const checkSignInStatus = async () => {
//       try {
//           // Check if the user is signed in based on the stored value
//           const storedSignedIn = await AsyncStorage.getItem('signedIn');
//           if (storedSignedIn === 'true') {
//               setSignedIn(true);
//               const loginTime = await AsyncStorage.getItem('loginTime');
//               console.warn('User is signed in. Login time:', loginTime);
//               setFirstSignInTime(loginTime);
//               setHasRecordedFirstSignIn(true);
//               //   await AsyncStorage.removeItem('tableData', tableData)
//               const storedTableData = await AsyncStorage.getItem('tableData');
//               if (storedTableData) {
//                   const parsedTableData = JSON.parse(storedTableData);
//                   console.warn('parsedTableData::', parsedTableData)
//                   setTableData(parsedTableData);
//               }
//           } else {
//               setSignedIn(false);
//               console.warn('User is signed out.');
//           }
//       } catch (error) {
//           console.error('Error checking sign-in status:', error);
//       }
//   };
//   checkSignInStatus();
// }, [signIn, signOut]);

// =========================
// const signIn = async () => {
//   const currentTime = new Date().toLocaleTimeString();
//   const currentDate = new Date().toLocaleDateString();
//   console.log('currentDate:', currentDate);
//   const storedDate = await AsyncStorage.getItem('storedDate');
//   console.log('storedDate:', storedDate);
//   if (storedDate !== currentDate) {
//       setHasRecordedFirstSignIn(false);
//       await AsyncStorage.setItem('storedDate', currentDate);
//   }

//   setSignedIn(true);
//   if (!hasRecordedFirstSignIn) {
//       const loginTime = new Date().toLocaleTimeString();
//       setFirstSignInTime(loginTime);
//       // async loginTime
//       await AsyncStorage.setItem('loginTime', loginTime);
//       await AsyncStorage.setItem('hasRecordedFirstSignIn', 'true')
//       setHasRecordedFirstSignIn(true);
//       const newData = {
//           loginTime: loginTime,
//       };
//       setTableData(prevData => [...prevData, newData]);
//       await AsyncStorage.setItem('tableData', JSON.stringify(tableData));
//       console.log("TableData1:", newData)
//   }
//   else {
//       const newData = {
//           loginTime: currentTime,
//       };
//       setTableData(prevData => [...prevData, newData]);
//       await AsyncStorage.setItem('tableData', JSON.stringify([...tableData, newData]));
//       // console.log("RAMMMMM:",([...tableData, newData]) )
//   }

//   if (!hasSignedInToday) {
//       setHasSignedInToday(true);
//   }

//   await AsyncStorage.removeItem('signedIn')
//   await AsyncStorage.setItem('signedIn', 'true');
//   // await AsyncStorage.setItem('tableData', JSON.stringify(tableData));
// }
