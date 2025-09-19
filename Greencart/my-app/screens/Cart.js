import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Cart = ({ navigation }) => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          console.warn('No token found');
          setLoading(false);
          return;
        }

        // Fetch cart data
        const res = await axios.post(`http://10.0.2.2:5000/api/cart/get`, {}, {
          headers: { token }
        });

        console.log('Cart API Response:', res.data);

        if (res.data.success && res.data.cartData) {
          // Convert cartData into array
          const cartItems = Object.entries(res.data.cartData).map(([id, quantity]) => ({
            _id: id,
            quantity
          }));

          // Fetch product details for each cart item
          const productRequests = cartItems.map(item =>
            axios.post('http://10.0.2.2:5000/api/product/single', { productId: item._id })
          );

          const productResponses = await Promise.all(productRequests);

          // Merge product details and handle image array
          const fullCartData = cartItems.map((item, index) => {
            const product = productResponses[index].data.product || {};
            console.log(`Product ${index + 1} Response:`, product);

            return {
              ...product,
              image: Array.isArray(product.image) && product.image.length > 0
                ? product.image[0] // Always pick the first image
                : 'https://via.placeholder.com/80',
              quantity: item.quantity
            };
          });

          setCartData(fullCartData);
        }
      } catch (err) {
        console.error('Error fetching cart:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = (id) => {
    setCartData((prev) => prev.filter((item) => item._id !== id));
  };

  const handleChangeQuantity = (id, val) => {
    if (val > 0) {
      setCartData((prev) =>
        prev.map((item) => (item._id === id ? { ...item, quantity: val } : item))
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cartData.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        cartData.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name || 'Unnamed Product'}</Text>
              <Text style={styles.price}>₹ {item.price || '0.00'}</Text>

              <View style={styles.quantityRow}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(item.quantity)}
                  onChangeText={(val) => handleChangeQuantity(item._id, Number(val))}
                />
                <TouchableOpacity onPress={() => handleRemoveItem(item._id)}>
                  <Text style={{ color: 'red' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      )}

      {cartData.length > 0 && (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  emptyText: { fontSize: 16, textAlign: 'center', marginTop: 20, color: '#555' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cartItem: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#ddd' },
  image: { width: 80, height: 80, borderRadius: 8 },
  details: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: '500' },
  price: { marginTop: 4, fontSize: 14, color: '#333' },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  input: { width: 50, height: 35, borderWidth: 1, borderColor: '#ccc', textAlign: 'center', marginRight: 12, borderRadius: 4 },
  checkoutButton: { backgroundColor: '#000', paddingVertical: 14, borderRadius: 6, marginTop: 20, alignItems: 'center' },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default Cart;
