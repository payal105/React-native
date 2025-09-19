import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>About Sanatani Sanskriti</Text>
          <Text style={styles.subtitle}>Connecting you with your cultural roots</Text>
        </View>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/main_banner_bg_sm.png')} // Replace with your image
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* About Text Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Story</Text>
          <Text style={styles.sectionText}>
            Sanatani Sanskriti was founded with the vision of preserving and promoting the rich
            cultural heritage of India. We provide traditional puja items, handcrafted products,
            and spiritual tools that help you connect with your roots.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mission</Text>
          <Text style={styles.sectionText}>
            Our mission is to make spiritual and cultural practices accessible to everyone,
            everywhere. We focus on authenticity, quality, and customer satisfaction.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vision</Text>
          <Text style={styles.sectionText}>
            We envision a world where traditional practices and cultural values are preserved
            and celebrated in daily life, connecting generations through spirituality.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© Powered by Createdge.</Text>
        </View>
      </ScrollView>
      
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Leaves space for Navbar
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: '#1E90FF',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 30,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
});

export default About;
