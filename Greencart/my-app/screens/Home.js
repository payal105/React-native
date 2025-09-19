import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import Categories from "../components/Categories";
import Bestseller from "../components/Bestseller";
import BottomBanner from "../components/BottomBanner";
import NewsLetter from "../components/NewsLetter";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Topbar outside ScrollView */}
      <Topbar />
      
      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
        bounces={true}
        scrollEventThrottle={16}
      >
        {/* Banner Section */}
        <View style={styles.banner}>
          <Image
            source={require("../assets/main_banner_bg_sm.png")}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>
              Freshness You Can{"\n"}Trust, Savings You{"\n"}will Love!
            </Text>
            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => navigation.navigate("Products")}
            >
              <Text style={styles.shopButtonText}>Shop now →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Section */}
        <Categories />

        {/* Bestseller Section */}
        <Bestseller />

        {/* Bottom Banner Section */}
        <BottomBanner />

        {/* Newsletter Section */}
        <NewsLetter />
        
      </ScrollView>

      {/* Fixed Bottom Navbar */}
      <Navbar />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  
  scrollView: {
    flex: 1,
  },
  
  contentContainer: {
    paddingBottom: 300,
    flexGrow: 1, // This ensures content can scroll even if shorter than screen
  },

  banner: {
    height: 250, // Use fixed height instead of percentage
    width: "100%",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bannerContent: {
    position: "absolute",
    bottom: "20%",
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  shopButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});