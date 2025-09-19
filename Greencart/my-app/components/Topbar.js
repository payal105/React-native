import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Topbar = () => {
  return (
    <View style={styles.container}>
      {/* Left - Logo */}
       <Image
        source={require("../assets/logo.png")} 
        style={styles.logo}
        resizeMode="contain"
      />
     
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 30,
    backgroundColor: "#fff",
    elevation: 4, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  cartContainer: {
    position: "relative",
    marginRight: 15,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
