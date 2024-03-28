// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Platform,
//   Image,
//   Pressable,
//   Modal,
//   SafeAreaView,
//   Touchable,
//   ScrollView,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// export default function HomeScreen({ route }) {
//   const image = require("../assets/ait.png");
//   const buildingImg = require("../assets/b1.png");

//   const currentDate = new Date();
//   const options = {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   };
//   const daysOptions = { weekday: "long" };
//   const formattedDay = currentDate.toLocaleDateString("en-GB", daysOptions);
//   const formattedDate = currentDate.toLocaleDateString("en-GB", options);

//   const [loggedIn, setLoggedIn] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [swipeModalVisible, setSwipeModalVisible] = useState(false);

//   const [duration, setDuration] = useState({
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const [loginTime, setLoginTime] = useState([]);
//   const [logoutTime, setLogoutTime] = useState([]);
//   const [durationVisible, setDurationVisible] = useState(false);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [time, setTime] = useState("");

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime(
//         new Date().toLocaleString("en-GB", {
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//         })
//       );
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     calculateDuration();
//   }, [loginTime, logoutTime]);

//   const handleLogin = () => {
//     setLoggedIn(true);
//     const lastLogoutTime =
//       logoutTime.length > 0 ? logoutTime[logoutTime.length - 1] : 0;
//     const now = Date.now();
//     const consumedMilliseconds = now - lastLogoutTime;
//     setLoginTime([...loginTime, now]);
//     setDurationVisible(false);
//     if (consumedMilliseconds > 24 * 60 * 60 * 1000) {
//       setTotalDuration(0);
//     }
//   };

//   const handleLogout = () => {
//     setLoggedIn(false);
//     setModalVisible(true);
//     setLogoutTime([...logoutTime, Date.now()]);
//     setDurationVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };
//   const closeSwipeModal = () => {
//     setSwipeModalVisible(false);
//   };

//   // const calculateDuration = () => {
//   //   if (!loggedIn && logoutTime !== 0) {
//   //     const consumedMilliseconds = logoutTime - loginTime;
//   //     const consumedSeconds = Math.floor(consumedMilliseconds / 1000);
//   //     const hours = Math.floor(consumedSeconds / 3600);
//   //     const minutes = Math.floor((consumedSeconds % 3600) / 60);
//   //     const seconds = consumedSeconds % 60;
//   //     setDuration({ hours, minutes, seconds });
//   //   }
//   // };
//   // const calculateDuration = () => {
//   //   if (logoutTime.length > 0) {
//   //     const lastLogoutTime = logoutTime[logoutTime.length - 1];
//   //     const lastLoginTime = loginTime[loginTime.length - 1];
//   //     const consumedMilliseconds = lastLogoutTime - lastLoginTime;
//   //     const consumedSeconds = Math.floor(consumedMilliseconds / 1000);
//   //     const hours = Math.floor(consumedSeconds / 3600);
//   //     const minutes = Math.floor((consumedSeconds % 3600) / 60);
//   //     const seconds = consumedSeconds % 60;
//   //     setDuration({ hours, minutes, seconds });
//   //   }
//   // };

//   const calculateDuration = () => {
//     let totalMilliseconds = 0;
//     for (let i = 0; i < loginTime.length; i++) {
//       const login = loginTime[i];
//       const logout = logoutTime[i];
//       if (logout) {
//         totalMilliseconds += logout - login;
//       } else {
//         totalMilliseconds += Date.now() - login;
//       }
//     }

//     const totalSeconds = Math.floor(totalMilliseconds / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     setTotalDuration(totalMilliseconds);
//     setDuration({ hours, minutes, seconds });
//   };

//   const { name } = route.params;
//   const initials = name
//     .split(" ")
//     .map((word) => word.charAt(0))
//     .join("")
//     .toUpperCase();
//   const firstName = name.split(" ")[0];

//   return (
//     <SafeAreaView>
//       <View style={styles.card}>
//         <View style={styles.dateContainer}>
//           <Image source={image} style={styles.image} resizeMode="contain" />
//           <View style={styles.avatar}>
//             <Text
//               style={{
//                 fontSize: 14,
//                 fontWeight: "400",
//                 color: "#000",
//               }}
//             >
//               {initials}
//             </Text>
//           </View>
//         </View>
//         <Text style={styles.message}>Hello {firstName} 👋</Text>

//         <Image
//           source={buildingImg}
//           style={styles.buildImage}
//           resizeMode="contain"
//         />

//         <LinearGradient
//           style={styles.container}
//           colors={["#e7d2dd", "#fbfbfb"]}
//         >
//           <View style={styles.contentContainer}>
//             <View style={styles.circle}>
//               <Text style={styles.time}>{time}</Text>
//             </View>
//             <View style={styles.headerContainer}>
//               <Text style={styles.shiftDetails}>
//                 {formattedDay} | 13:00 To 22:00 Shift 4
//               </Text>
//               <Text style={styles.date}>{formattedDate}</Text>
//             </View>
//           </View>
//           <View>
//             <Pressable onPress={() => setSwipeModalVisible(true)}>
//               <Text>Swipes</Text>
//             </Pressable>
//           </View>
//           {durationVisible && (
//             <View style={{}}>
//               <Text
//                 style={{
//                   fontSize: 18,
//                   textAlign: "center",
//                 }}
//               >
//                 Duration: {duration.hours} : {duration.minutes} :
//                 {duration.seconds}
//               </Text>
//             </View>
//           )}

//           {loggedIn ? (
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "flex-end",
//                 marginTop: 5,
//               }}
//             >
//               <Pressable onPress={handleLogout} style={styles.badge}>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     fontWeight: "500",
//                     textAlign: "center",
//                     color: "white",
//                   }}
//                 >
//                   Sign out
//                 </Text>
//               </Pressable>
//             </View>
//           ) : (
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "flex-end",
//               }}
//             >
//               <Pressable onPress={handleLogin} style={styles.badge}>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     fontWeight: "500",
//                     textAlign: "center",
//                     color: "white",
//                   }}
//                 >
//                   Sign In
//                 </Text>
//               </Pressable>
//             </View>
//           )}
//         </LinearGradient>

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContent}>
//             <View style={styles.modalView}>
//               {!loggedIn ? (
//                 <Text style={styles.messageText}>
//                   Are you sure? Your working hour is remaining .
//                 </Text>
//               ) : (
//                 <Text style={styles.messageText}>
//                   Hey welcome! You are logged in.
//                 </Text>
//               )}

//               <Pressable onPress={closeModal}>
//                 <Text style={styles.closeIcon}>Ok </Text>
//               </Pressable>
//             </View>
//           </View>
//         </Modal>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={swipeModalVisible}
//           onRequestClose={() => setSwipeModalVisible(false)}
//         >
//           <View style={styles.swipeModalContent}>
//             <Text style={styles.swipeTextMessage}>
//               Swipe to view your working hours.
//             </Text>

//             {/* <Text>Sign In Time</Text>
//               <Text>Sign Out Time</Text>
//               <Text>Sign In Time</Text>
//               <Text>Sign Out Time</Text>
//               <Text>Sign In Time</Text>
//               <Text>Sign Out Time</Text>
//               <Text>Sign In Time</Text>
//               <Text>Sign Out Time</Text>
//               <Text>Sign In Time</Text>
//               <Text>Sign Out Time</Text>
//               <Text>Sign In Time</Text>
//               <Text>Sign Out Time</Text>
//               <Text>Sign In Time</Text> */}
//             <View style={styles.swipeModalView}>
//               <ScrollView>
//                 {loginTime.map((time, index) => (
//                   <View key={index}>
//                     <Text style={{ fontWeight: "bold" }}>
//                       Sign In Time: {new Date(time).toLocaleTimeString()}
//                     </Text>
//                     {index < logoutTime.length && (
//                       <Text>
//                         Sign Out Time:{" "}
//                         {new Date(logoutTime[index]).toLocaleTimeString()}
//                       </Text>
//                     )}
//                   </View>
//                 ))}
//               </ScrollView>
//               <Pressable onPress={closeSwipeModal}>
//                 <Text style={styles.closeIcon}>Ok </Text>
//               </Pressable>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     padding: 15,
//     ...Platform.select({
//       ios: {
//         shadowOffset: { width: 2, height: 2 },
//         shadowColor: "#333",
//         shadowOpacity: 0.3,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   dateContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//   },
//   container: {
//     justifyContent: "flex-end",
//     alignItems: "flex-end",
//     backgroundColor: "#d1d5db",
//     borderRadius: 10,
//     padding: 12,
//   },
//   contentContainer: {
//     flexDirection: "row",
//   },
//   circle: {
//     width: 100,
//     height: 100,
//     borderRadius: 75,
//     backgroundColor: "#fce5c0",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 15,
//     marginLeft: 20,
//     marginTop: 20,
//   },
//   time: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "black",
//   },
//   headerContainer: {
//     alignItems: "flex-end",
//     marginTop: 20,
//   },

//   shiftDetails: {
//     fontSize: 17,
//     fontWeight: "bold",
//     color: "black",
//   },
//   date: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "black",
//     justifyContent: "flex-end",
//     marginTop: 10,
//   },
//   name: {
//     fontSize: 30,
//     fontWeight: "bold",
//   },

//   message: {
//     fontSize: 32,
//     fontWeight: "bold",
//     flexDirection: "row",
//     paddingBottom: 10,
//   },
//   image: {
//     height: 50,
//     borderRadius: 50,
//     marginBottom: 16,
//   },
//   buildImage: {
//     height: 120,
//     width: "100%",
//     borderRadius: 50,
//   },
//   nameContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   nameText: {
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   badge: {
//     padding: 10,
//     backgroundColor: "#59a94e",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 20,
//   },
//   modalContent: {
//     flex: 3,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },

//   modalView: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   messageText: {
//     fontSize: 18,
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   swipeModalContent: {
//     flex: 3,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 1, 0, 0.5)",
//   },
//   swipeModalView: {
//     flex: 2 / 5,
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   swipeTextMessage: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   closeIcon: {
//     borderRadius: 10,
//     textAlign: "right",
//     width: 60,
//     padding: 15,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#469486",
//   },
//   avatar: {
//     height: 50,
//     width: 50,
//     marginRight: 15,
//     backgroundColor: " ",
//     borderRadius: 25,
//     borderWidth: 2,
//     borderColor: "yellow",
//     shadowColor: "#999",
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   button: {
//     padding: 15,
//     backgroundColor: "green",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Platform,
//   Image,
//   Pressable,
//   Modal,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import Accordion from "./Accordian";
// import Calenders from "./Calenders";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Calendar } from "react-native-calendars";
// import Animated, {
//   useAnimatedStyle,
//   useDerivedValue,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";

// import Chevron from "./Chevron";
// export default function HomePage({ route }) {
//   const image = require("../assets/ait.png");
//   const buildingImg = require("../assets/b1.png");

//   const currentDate = new Date();
//   const options = {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   };
//   const daysOptions = { weekday: "long" };
//   const formattedDay = currentDate.toLocaleDateString("en-GB", daysOptions);

//   const formattedDate = currentDate.toLocaleDateString("en-GB", options);

//   const [loggedIn, setLoggedIn] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [swipeModalVisible, setSwipeModalVisible] = useState(false);
//   const [loginTime, setLoginTime] = useState([]);
//   const [logoutTime, setLogoutTime] = useState([]);
//   const [duration, setDuration] = useState({
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [durationVisible, setDurationVisible] = useState(false);
//   const [time, setTime] = useState(new Date().toLocaleTimeString());
//   const [markedDates, setMarkedDates] = useState({});
//   const [loginDuration, setLoginDuration] = useState(0);
//   const [open, setOpen] = useState(false);

//   const heightValue = useSharedValue(0);

//   const progress = useDerivedValue(() =>
//     open ? withTiming(1) : withTiming(0)
//   );

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setTime(
//         new Date().toLocaleString("en-GB", {
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//         })
//       );
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   let interval;

//   useEffect(() => {
//     const checkStatus = async () => {
//       try {
//         const loggedIn = await AsyncStorage.getItem("loggedIn");
//         if (loggedIn === "true") {
//           setLoggedIn(true);
//         } else {
//           setLoggedIn(false);
//         }
//       } catch {
//         console.error("Error retrieving login time from AsyncStorage:", error);
//       }
//     };
//     checkStatus();
//   }, []);
//   const updateMarkedDates = (timestamp, color, text) => {
//     const date = new Date(timestamp);
//     const isoDate = date.toISOString().split("T")[0];
//     setMarkedDates((prevMarkedDates) => ({
//       ...prevMarkedDates,
//       [isoDate]: {
//         selected: true,
//         selectedColor: color,
//         text: text,
//       },
//     }));
//   };

//   const handleLogin = async () => {
//     setModalVisible(true);
//     setLoggedIn(true);
//     const lastLogoutTime =
//       logoutTime.length > 0 ? logoutTime[logoutTime.length - 1] : 0;
//     const now = Date.now();
//     const consumedMilliseconds = now - lastLogoutTime;
//     const currentDate = new Date().toLocaleDateString();
//     setLoginTime([...loginTime, now]);
//     setDurationVisible(false);
//     if (consumedMilliseconds > 24 * 60 * 60 * 1000) {
//       setTotalDuration(0);
//     }
//     try {
//       const storedDate = await AsyncStorage.getItem("storedDate");

//       if (storedDate !== currentDate) {
//         await AsyncStorage.setItem("storedDate", currentDate);
//       }

//       setLoggedIn(true);
//       await AsyncStorage.setItem("loggedIn", "true");
//       await AsyncStorage.setItem("loginTime", JSON.stringify(loginTime));
//     } catch (error) {
//       console.error("Error saving login time:", error);
//     }

//     updateMarkedDates(now, "green", "P");
//   };

//   const handleLogout = async () => {
//     setModalVisible(true);
//     setLogoutTime([...logoutTime, Date.now()]);
//     calculateDuration();
//     setDurationVisible(true);
//     try {
//       setLoggedIn(false);
//       const now = Date.now();
//       await AsyncStorage.setItem("loggedIn", "false");
//       await AsyncStorage.setItem(
//         "logoutTime",
//         new Date(now).toLocaleTimeString()
//       );
//       console.log(
//         "Logout time saved to AsyncStorage:",
//         new Date(now).toLocaleTimeString()
//       );
//     } catch (error) {
//       console.error("Error saving logout time to AsyncStorage:", error);
//     }
//     updateMarkedDates(now, totalDuration >= 8 ? "green" : "red", "A");
//   };

//   const calculateDuration = () => {
//     const firstLogin = loginTime[0];
//     const lastLogout = logoutTime[logoutTime.length - 1];

//     if (firstLogin && lastLogout) {
//       const durationMilliseconds = lastLogout - firstLogin;
//       const totalSeconds = Math.floor(durationMilliseconds / 1000);
//       const hours = Math.floor(totalSeconds / 3600);
//       const minutes = Math.floor((totalSeconds % 3600) / 60);
//       const seconds = totalSeconds % 60;
//       setDuration({ hours, minutes, seconds });
//     } else {
//       setDuration({ hours: 0, minutes: 0, seconds: 0 });
//     }
//   };
//   const openModal = () => {
//     setModalVisible(true);
//   };
//   const closeModal = () => {
//     setModalVisible(false);
//   };
//   const noLoggedIn = () => {
//     setModalVisible(false);
//     setLoggedIn(false);
//   };
//   const closeSwipeModal = () => {
//     setSwipeModalVisible(false);
//   };

//   const { name } = route.params;
//   const initials = name
//     .split(" ")
//     .map((word) => word.charAt(0))
//     .join("")
//     .toUpperCase();
//   const now = new Date().getTime();
//   const firstName = name.split(" ")[0];
//   const toggleAccordion = () => {
//     setOpen(!open);
//     heightValue.value = open ? withTiming(0) : withTiming(400);
//   };

//   const animatedStyle = useAnimatedStyle(() => ({
//     height: heightValue.value,
//   }));
//   return (
//     <SafeAreaView>
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <View style={{ flex: 1 }}>
//           <View style={styles.card}>
//             <View style={styles.dateContainer}>
//               <Image source={image} style={styles.image} resizeMode="contain" />
//               <View style={styles.avatar}>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     fontWeight: "400",
//                     color: "#000",
//                   }}
//                 >
//                   {initials}
//                 </Text>
//               </View>
//             </View>
//             <Text style={styles.message}>Hello {firstName} 👋</Text>

//             <Image
//               source={buildingImg}
//               style={styles.buildImage}
//               resizeMode="contain"
//             />
//             <View style={styles.cardContainer}>
//               <LinearGradient
//                 style={styles.container}
//                 colors={["#e7d2dd", "#fbfbfb"]}
//               >
//                 <View style={styles.contentContainer}>
//                   <View style={styles.circle}>
//                     <Text style={styles.time}>{time}</Text>
//                   </View>
//                   <View style={styles.headerContainer}>
//                     <Text style={styles.shiftDetails}>
//                       {formattedDay} | 13:00 To 22:00 Shift 4
//                     </Text>
//                     <Text style={styles.date}>{formattedDate}</Text>

//                     {loginTime[0] && (
//                       <Pressable onPress={() => setSwipeModalVisible(true)}>
//                         <Text style={{ color: "blue" }}>View Swipes</Text>
//                       </Pressable>
//                     )}
//                   </View>
//                 </View>

//                 {durationVisible && (
//                   <View style={{}}>
//                     <Text
//                       style={{
//                         fontSize: 18,
//                         textAlign: "center",
//                       }}
//                     >
//                       Duration: {duration.hours} : {duration.minutes} :
//                       {duration.seconds}
//                     </Text>
//                   </View>
//                 )}
//               </LinearGradient>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   marginTop: 5,
//                 }}
//               >
//                 {loginTime[0] ? (
//                   <Text style={styles.date}>
//                     Sign-In Time : {new Date(loginTime[0]).toLocaleTimeString()}
//                   </Text>
//                 ) : (
//                   <Text style={styles.date}> </Text>
//                 )}

//                 {loggedIn ? (
//                   <Pressable onPress={handleLogout} style={styles.badge}>
//                     <Text
//                       style={{
//                         fontSize: 18,
//                         fontWeight: "500",
//                         textAlign: "center",
//                         color: "white",
//                         flexDirection: "row",
//                         justifyContent: "flex-end",
//                       }}
//                     >
//                       Sign out
//                     </Text>
//                   </Pressable>
//                 ) : (
//                   <Pressable onPress={handleLogin} style={styles.badge}>
//                     <Text
//                       style={{
//                         fontSize: 18,
//                         fontWeight: "500",
//                         textAlign: "center",
//                         color: "white",
//                         flexDirection: "row",
//                         justifyContent: "flex-end",
//                       }}
//                     >
//                       Sign In
//                     </Text>
//                   </Pressable>
//                 )}
//               </View>
//             </View>
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={modalVisible}
//               onRequestClose={() => setModalVisible(false)}
//             >
//               <View style={styles.modalContent}>
//                 <View style={styles.modalView}>
//                   {!loggedIn ? (
//                     <View>
//                       <Text style={styles.messageText}>
//                         Are you sure? Your working hour is remaining .
//                       </Text>
//                       <View
//                         style={{
//                           display: "flex",
//                           flexDirection: "row",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                         <Pressable onPress={closeModal}>
//                           <Text style={styles.closeIcon}>No</Text>
//                         </Pressable>
//                         <Pressable onPress={noLoggedIn}>
//                           <Text style={styles.closeIcon}>Yes</Text>
//                         </Pressable>
//                       </View>
//                     </View>
//                   ) : (
//                     <View>
//                       <Text style={styles.messageText}>
//                         Hey welcome! You are logged in.
//                       </Text>
//                       <Pressable onPress={closeModal}>
//                         <Text
//                           style={{
//                             borderRadius: 10,
//                             padding: 15,
//                             width: 50,
//                             justifyContent: "center",
//                             alignItems: "center",
//                             backgroundColor: "#469486",
//                           }}
//                         >
//                           Ok
//                         </Text>
//                       </Pressable>
//                     </View>
//                   )}
//                 </View>
//               </View>
//             </Modal>
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={swipeModalVisible}
//               onRequestClose={() => setSwipeModalVisible(false)}
//             >
//               <View style={styles.swipeModalContent}>
//                 <View style={styles.modalView}>
//                   <View style={styles.swipeHeaderContainer}>
//                     <Text style={styles.swipeHeaderText}>Today's Swipes</Text>
//                     <Pressable onPress={closeSwipeModal}>
//                       <MaterialIcons name="close" color="#000" size={25} />
//                     </Pressable>
//                   </View>
//                   <ScrollView>
//                     {loginTime.map((time, index) => (
//                       <View key={index}>
//                         <Text style={styles.swipeContentText}>
//                           Sign-In {new Date(time).toLocaleTimeString()}
//                         </Text>
//                         {index < logoutTime.length && (
//                           <Text style={styles.swipeContentText}>
//                             Sign-Out{" "}
//                             {new Date(logoutTime[index]).toLocaleTimeString()}
//                           </Text>
//                         )}
//                       </View>
//                     ))}
//                   </ScrollView>
//                 </View>
//               </View>
//             </Modal>
//             <View style={styles.accordionContainer}>
//               <Pressable
//                 onPress={toggleAccordion}
//                 style={styles.titleContainer}
//               >
//                 <Text style={styles.textTitle}> Attedence Info</Text>
//                 <Chevron progress={progress} />
//               </Pressable>

//               {open && (
//                 <Animated.View style={[styles.content, animatedStyle]}>
//                   <Calendar markedDates={markedDates} />
//                   {/* <ABCD /> */}
//                 </Animated.View>
//               )}
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  useSharedValue,
  withTiming,
  useDerivedValue,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import { Calendar } from "react-native-calendars";

const HomePage = ({ route }) => {
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
  const [loginTime, setLoginTime] = useState([]);
  const [logoutTime, setLogoutTime] = useState([]);
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [totalDuration, setTotalDuration] = useState(0);
  const [durationVisible, setDurationVisible] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [markedDates, setMarkedDates] = useState({});
  const [loginDuration, setLoginDuration] = useState(0);
  const [open, setOpen] = useState(false);

  const heightValue = useSharedValue(0);
  const progress = useDerivedValue(() =>
    open ? withTiming(1) : withTiming(0)
  );

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

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem("loggedIn");
        if (loggedIn === "true") {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }

        // Retrieve previous login and logout times
        const storedLoginTime =
          JSON.parse(await AsyncStorage.getItem("loginTime")) || [];
        const storedLogoutTime =
          JSON.parse(await AsyncStorage.getItem("logoutTime")) || [];
        setLoginTime(storedLoginTime);
        setLogoutTime(storedLogoutTime);

        // Calculate and set duration for each session
        const storedLoginDuration =
          JSON.parse(await AsyncStorage.getItem("loginDuration")) || 0;
        const storedLogoutDuration =
          JSON.parse(await AsyncStorage.getItem("logoutDuration")) || 0;
        setLoginDuration(storedLoginDuration);
        setTotalDuration(storedLogoutDuration);
      } catch (error) {
        console.error("Error retrieving login time from AsyncStorage:", error);
      }
    };
    checkStatus();
  }, []);

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

  const handleLogin = async () => {
    setModalVisible(true);
    const lastLogoutTime =
      logoutTime.length > 0 ? logoutTime[logoutTime.length - 1] : 0;
    const now = Date.now();
    const consumedMilliseconds = now - lastLogoutTime;
    const currentDate = new Date().toLocaleDateString();
    setLoginTime([...loginTime, now]);
    setDurationVisible(false);
    if (consumedMilliseconds > 24 * 60 * 60 * 1000) {
      setTotalDuration(0);
    }
    try {
      const storedDate = await AsyncStorage.getItem("storedDate");
      if (storedDate !== currentDate) {
        await AsyncStorage.setItem("storedDate", currentDate);
      }
      setLoggedIn(true);
      await AsyncStorage.setItem("loggedIn", "true");
      await AsyncStorage.setItem("loginTime", JSON.stringify(loginTime));
      // Calculate and store duration
      const durationSinceLastLogout = (now - lastLogoutTime) / 1000;
      setLoginDuration(durationSinceLastLogout);
      await AsyncStorage.setItem(
        "loginDuration",
        JSON.stringify(durationSinceLastLogout)
      );
    } catch (error) {
      console.error("Error saving login time:", error);
    }
    updateMarkedDates(now, "green", "P");
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
  const handleLogout = async () => {
    setModalVisible(true);
    setLogoutTime([...logoutTime, Date.now()]);
    calculateDuration();
    setDurationVisible(true);
    try {
      setLoggedIn(false);
      const now = Date.now();
      await AsyncStorage.setItem("loggedIn", "false");
      await AsyncStorage.setItem(
        "logoutTime",
        new Date(now).toLocaleTimeString()
      );
      console.log(
        "Logout time saved to AsyncStorage:",
        new Date(now).toLocaleTimeString()
      );

      // Calculate and store duration
      const lastLoginTime = loginTime[loginTime.length - 1];
      const durationSinceLastLogin = (now - lastLoginTime) / 1000; // in seconds
      setTotalDuration(durationSinceLastLogin);
      await AsyncStorage.setItem(
        "logoutDuration",
        JSON.stringify(durationSinceLastLogin)
      );
    } catch (error) {
      console.error("Error saving logout time to AsyncStorage:", error);
    }
    updateMarkedDates(now, totalDuration >= 8 ? "green" : "red", "A");
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
                    fontWeight: "400",
                    color: "#000",
                  }}
                >
                  {/* Placeholder for user initials */}
                </Text>
              </View>
            </View>
            <Text style={styles.message}>Hello User 👋</Text>
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
                      Duration: {duration.hours} : {duration.minutes} :{" "}
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
                <Text style={styles.date}>
                  {loggedIn
                    ? `Sign-In Time : ${new Date(
                        loginTime[0]
                      ).toLocaleTimeString()}`
                    : ""}
                </Text>
                <Pressable
                  onPress={loggedIn ? handleLogout : handleLogin}
                  style={styles.badge}
                >
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
                    {loggedIn ? "Sign out" : "Sign In"}
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
                  {!loggedIn ? (
                    <View>
                      <Text style={styles.messageText}>
                        Are you sure? Your working hour is remaining.
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
                        <Pressable onPress={() => setLoggedIn(false)}>
                          <Text style={styles.closeIcon}>Yes</Text>
                        </Pressable>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.messageText}>
                        Hey welcome! You are logged in.
                      </Text>
                      <Pressable onPress={() => setModalVisible(false)}>
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
            <View style={styles.accordionContainer}>
              <Pressable
                onPress={toggleAccordion}
                style={styles.titleContainer}
              >
                <Text style={styles.textTitle}> Attedence Info</Text>
              </Pressable>
              {open && (
                <Animated.View style={[styles.content, animatedStyle]}>
                  {/* Placeholder for calendar component */}
                  <Calendar markedEvents={markedDates} />
                </Animated.View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

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
    marginHorizontal: 10,
    marginVertical: 10,
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
    backgroundColor: "#D6E1F0",
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
