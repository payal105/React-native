import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim() === "") {
      alert("Please enter your email id");
      return;
    }
    // Add your subscription logic here
    alert(`Subscribed with: ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Never Miss a Deal!</Text>
      <Text style={styles.subText}>
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email id"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
          <Text style={styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsLetter;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "rgba(100,100,100,0.7)",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    maxWidth: 600,
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "#059669", // replace with your primary color
    paddingHorizontal: 20,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
});
