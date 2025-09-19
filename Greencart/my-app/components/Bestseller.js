import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const Bestseller = ({ navigation }) => {
  const { products, cartItems, addToCart, removeFromCart, currency } = useAppContext();

  // Filter bestsellers and limit to 5
  const bestsellerProducts = products.filter((product) => product.inStock).slice(0, 5);

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      navigation={navigation} // pass navigation to ProductCard
      cartItems={cartItems}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      currency={currency}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Sellers</Text>
      <FlatList
        data={bestsellerProducts}
        keyExtractor={(item) => item._id} // use unique id
        renderItem={renderItem}
        horizontal={false} // vertical scroll
        numColumns={2} // grid of 2 columns
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, marginTop: 16 }}
      />
    </View>
  );
};

export default Bestseller;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
