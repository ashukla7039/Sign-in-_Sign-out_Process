import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Sidebar = () => {
  const image = require("../assets/ait.png");
  const handleNavigation = (route) => {};

  return (
    <View style={styles.sidebar}>
      <View style={styles.profileContainer}>
        <Image source={image} style={styles.profileImage} />
        <Text style={styles.profileName}>Ankit Shukla</Text>
        <Text style={styles.profileEvents}>Events </Text>
      </View>
      
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleNavigation("Home")}
      >
        <Text style={styles.menuItemText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleNavigation("Explore")}
      >
        <Text style={styles.menuItemText}>Explore</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleNavigation("SignOut")}
      >
        <Text style={styles.menuItemText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "#000",
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  profileEvents: {
    color: "gray",
    fontSize: 16,
  },
  menuItem: {
    paddingVertical: 15,
    paddingLeft: 20,
  },
  menuItemText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Sidebar;
