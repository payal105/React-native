import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { assets } from "../assets/assets";

const ProductCard = ({ product, navigation, currency = "₹", cartItems, addToCart, removeFromCart }) => {
  if (!product) return null;

  // Ensure remote image URLs are absolute
  const getFirstImageSource = () => {
    if (product.image && Array.isArray(product.image) && product.image.length > 0) {
      const firstImage = product.image[0];
      if (typeof firstImage === "string" && firstImage.trim() !== "") {
        // If backend returns relative path, prepend base URL
        const imageUrl = firstImage.startsWith("http")
          ? firstImage
          : `https://greencart-backend-rosy-phi.vercel.app${firstImage}`;
        return { uri: imageUrl };
      }
    }
    return null;
  };

  const imageSource = getFirstImageSource();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("ProductDetails", {
          category: product.category?.toLowerCase() || "",
          productId: product._id,
        })
      }
    >
      <View style={styles.imageWrapper}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.category}>{product.category || "Unknown"}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {product.name || "Unnamed Product"}
        </Text>

        {/* Price & Cart */}
        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            {currency} {product.offerPrice || product.price || "0"}{" "}
            {product.price && product.offerPrice !== product.price && (
              <Text style={styles.originalPrice}>
                {currency} {product.price}
              </Text>
            )}
          </Text>

          {!cartItems[product._id] ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(product._id)}
            >
              <Image source={assets.cart_icon} style={styles.cartIcon} />
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.quantityWrapper}>
              <TouchableOpacity
                onPress={() => removeFromCart(product._id)}
                style={styles.qtyButton}
              >
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyCount}>{cartItems[product._id]}</Text>
              <TouchableOpacity
                onPress={() => addToCart(product._id)}
                style={styles.qtyButton}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 12,
    width: "48%",
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  imagePlaceholder: {
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  placeholderText: {
    color: "#999",
    fontSize: 12,
  },
  info: {},
  category: {
    color: "#888",
    fontSize: 12,
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
  },
  originalPrice: {
    fontSize: 12,
    color: "#888",
    textDecorationLine: "line-through",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF5020",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  cartIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  addText: {
    fontSize: 12,
    color: "#4CAF50",
  },
  quantityWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF5025",
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  qtyButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  qtyText: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "600",
  },
  qtyCount: {
    width: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#222",
  },
});
