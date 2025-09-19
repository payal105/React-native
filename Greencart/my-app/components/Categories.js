import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { categories } from "../assets/assets";
import { useNavigation } from "@react-navigation/native"; // ✅ Import this for navigation

const Categories = () => {
  const navigation = useNavigation(); // ✅ Use this inside the component

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.bgColor }]}
      onPress={() =>
        navigation.navigate("Products", { category: item.path.toLowerCase() })
      }
    >
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.text}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>

      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCategory}
        numColumns={3} // adjust for grid
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
