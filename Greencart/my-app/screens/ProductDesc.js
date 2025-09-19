import React, { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import axios from 'axios';
import Navbar from '../components/Navbar';

const { width } = Dimensions.get('window');

const ProductDesc = ({ route }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cart, setCart] = useState([]); // Local cart state

    const flatListRef = useRef();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post('http://10.0.2.2:5000/api/product/single', { productId });
                if (response.data.success) setProduct(response.data.product);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handlePrev = () => {
        if (currentIndex > 0) {
            flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < product.image.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
            setCurrentIndex(currentIndex + 1);
        }
    };

   const handleAddToCart = async () => {
    if (!product) return;

    try {
        const token = await AsyncStorage.getItem('authToken'); // Retrieve token from storage

        if (!token) {
            Alert.alert("Authentication", "You need to login first!");
            return;
        }

        const response = await axios.post(
            'http://10.0.2.2:5000/api/cart/add',
            { itemId: product._id }, // itemId from product
            { headers: { token } } // Send token in headers
        );

        if (response.data.success) {
            Alert.alert("Cart", "Product added to cart successfully!");
        } else {
            Alert.alert("Error", response.data.message || "Something went wrong!");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message);
    }
};

    const onViewRef = React.useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index);
    });

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#1E90FF" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.loader}>
                <Text>Product not found!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.carouselContainer}>
                    {currentIndex > 0 && (
                        <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
                            <Text style={styles.buttonText}>◀</Text>
                        </TouchableOpacity>
                    )}

                    <FlatList
                        ref={flatListRef}
                        data={product.image}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
                        )}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}
                    />

                    {currentIndex < product.image.length - 1 && (
                        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                            <Text style={styles.buttonText}>▶</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>₹{product.price}</Text>
                    <Text style={styles.category}>Category: {product.category}</Text>
                    <Text style={styles.subCategory}>SubCategory: {product.subCategory}</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
                        <Text style={styles.cartButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
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
    container: { flex: 1, backgroundColor: '#f7f7f7' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    carouselContainer: { marginTop: 20, flexDirection: 'row', alignItems: 'center' },
    image: { width: width - 80, height: 300, marginHorizontal: 20, borderRadius: 15 },
    prevButton: {
        position: 'absolute', left: 10, top: '40%', zIndex: 1,
        backgroundColor: '#00000050', padding: 10, borderRadius: 25
    },
    nextButton: {
        position: 'absolute', right: 10, top: '40%', zIndex: 1,
        backgroundColor: '#00000050', padding: 10, borderRadius: 25
    },
    buttonText: { color: '#fff', fontSize: 20 },
    card: {
        backgroundColor: '#fff', margin: 15, padding: 20, borderRadius: 15,
        shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1, shadowRadius: 5, elevation: 5,
    },
    name: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: '#333' },
    price: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 5 },
    category: { fontSize: 16, color: '#555', marginBottom: 3 },
    subCategory: { fontSize: 16, color: '#555', marginBottom: 10 },
    description: { fontSize: 16, color: '#666', marginBottom: 20 },
    cartButton: {
        backgroundColor: '#000', paddingVertical: 12,
        borderRadius: 10, alignItems: 'center'
    },
    cartButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    footer: {
        paddingVertical: 20, alignItems: 'center',
        borderTopWidth: 1, borderTopColor: '#ddd', marginTop: 30
    },
    footerText: { fontSize: 14, color: '#888' },
});

export default ProductDesc;
