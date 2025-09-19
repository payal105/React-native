import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Navbar from '../components/Navbar';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 45) / 2;

const Collections = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5000/api/product/list');
        const result = await response.json();
        if (result.success) {
          console.log('Products fetched:', result.products); // Debug log
          setProducts(result.products);
          setFilteredProducts(result.products);

          // Static categories
          const staticCategories = [
            'All',
            'Daily Puja Essentials',
            'Festival Puja Kits',
            'Spiritual Idols & Murti',
            'Mandir & Puja Decor',
            'Aroma & Fragrance',
            'Rudraksha, Yantras & Malas',
            'Scriptures & Spiritual Books',
            'Subscription Puja Boxes',
            'Heritage Gifts & Hampers'
          ];
          setCategories(staticCategories);
        }
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // Static subcategories mapping
  const staticSubcategories = {
    'Daily Puja Essentials': [
      'All',
      'Puja Kits (Basic to Premium)',
      'Agarbatti, Dhoop, Sambrani',
      'Kumkum, Haldi, Chandan',
      'Ghee Diyas & Cotton Wicks',
      'Camphor, Cow Dung Cakes',
      'Panchmeva, Honey, Sacred Water'
    ],
    'Festival Puja Kits': [
      'All',
      'Diwali Lakshmi-Ganesh Puja Kit',
      'Durga Puja Kit (with Shola Items)',
      'Kali Puja Kit',
      'Saraswati Puja Kit',
      'Janmashtami, Shivratri, Holi Kits',
      'Raksha Bandhan, Karwa Chauth Kits'
    ],
    'Spiritual Idols & Murti': [
      'All',
      'Brass Idols (Ganesha, Lakshmi, Shiva, Hanuman, etc.)',
      'Marble Dust/Polyresin Idols',
      'Terracotta/Clay Eco-Friendly Idols',
      'Custom Handcrafted Murtis (on request)',
      'Miniature Pocket Idols'
    ],
    'Mandir & Puja Decor': [
      'All',
      'Toran, Bandhanwar, Wall Hangings',
      'Urli Bowls, Bell Hangings, Kalash',
      'Puja Mats, Asanas, Wooden Platforms',
      'Brass/Steel Puja Thalis',
      'Puja Room Nameplates',
      'Framed Mantra Scrolls'
    ],
    'Aroma & Fragrance': [
      'All',
      'Premium Agarbatti & Dhoop Sticks',
      'Camphor Diffusers',
      'Essential Oils (Tulsi, Lavender, Sandal)',
      'Herbal Fragrance Powders',
      'Spiritual Soy & Ghee Candles'
    ],
    'Rudraksha, Yantras & Malas': [
      'All',
      'Nepali Rudraksha (1–14 Mukhi)',
      'Rudraksha Bracelets & Malas',
      'Yantras (Shree, Kuber, Durga, Navgraha)',
      'Energized Crystal Pyramids',
      'Silver & Copper Yantras'
    ],
    'Scriptures & Spiritual Books': [
      'All',
      'Bhagavad Gita, Ramayana, Hanuman Chalisa',
      'Shiv Puran, Chandi Path',
      'Mantra Guides (Daily/Occasional)',
      'Bilingual Editions (Bengali + English)',
      'Kids\' Spiritual Education Books'
    ],
    'Subscription Puja Boxes': [
      'All',
      'Monthly Essentials Puja Box',
      'Festival Special Puja Boxes',
      'Custom Family Box (Birthday, Griha Pravesh, etc.)',
      'Corporate Puja Subscription'
    ],
    'Heritage Gifts & Hampers': [
      'All',
      'Durga Puja Gift Hampers',
      'Wedding & Housewarming Gift Sets',
      'Brass Idol Combo Boxes',
      'Personalized Spiritual Gift Boxes',
      'Return Gifts (Corporate, Wedding, Events)'
    ]
  };

  // Set subcategories based on selected category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setSubcategories([]);
    } else {
      const categorySubcategories = staticSubcategories[selectedCategory] || [];
      setSubcategories(categorySubcategories);
    }
    setSelectedSubcategory('All');
  }, [selectedCategory]);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('All'); // Reset subcategory when category changes
    
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(item => item.category === category);
      setFilteredProducts(filtered);
      console.log(`Filtered by category ${category}:`, filtered.length, 'products'); // Debug log
    }
  };

  const filterBySubcategory = (subcategory) => {
    setSelectedSubcategory(subcategory);
    console.log('Filtering by subcategory:', subcategory); // Debug log
    
    let filtered = products;

    // First filter by category if not 'All'
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
      console.log(`After category filter (${selectedCategory}):`, filtered.length, 'products'); // Debug log
    }

    // Then filter by subcategory if not 'All'
    if (subcategory !== 'All') {
      // Check what field your products use for subcategory
      // It might be 'subcategory', 'subCategory', 'sub_category', or something else
      filtered = filtered.filter(item => {
        // Log the product structure to understand the data
        console.log('Product structure:', Object.keys(item));
        
        // Try different possible field names for subcategory
        const productSubcategory = item.subcategory || item.subCategory || item.sub_category || item.type;
        
        console.log(`Product: ${item.name}, Subcategory: ${productSubcategory}`);
        
        // Match subcategory (case-insensitive partial match)
        return productSubcategory && 
               productSubcategory.toLowerCase().includes(subcategory.toLowerCase()) ||
               subcategory.toLowerCase().includes(productSubcategory?.toLowerCase());
      });
      
      console.log(`After subcategory filter (${subcategory}):`, filtered.length, 'products'); // Debug log
    }

    setFilteredProducts(filtered);
  };

  // Alternative approach: If your products don't have subcategory fields,
  // you might want to filter based on product name, description, or tags
  const filterBySubcategoryAlternative = (subcategory) => {
    setSelectedSubcategory(subcategory);
    
    let filtered = products;

    // First filter by category if not 'All'
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Then filter by subcategory using name/description matching
    if (subcategory !== 'All') {
      filtered = filtered.filter(item => {
        const searchText = `${item.name} ${item.description || ''} ${item.tags || ''}`.toLowerCase();
        
        // Create search terms from subcategory
        const subcategoryTerms = subcategory.toLowerCase()
          .replace(/[(),&-]/g, ' ') // Remove special characters
          .split(' ')
          .filter(term => term.length > 2); // Only words longer than 2 characters
        
        // Check if any term matches
        return subcategoryTerms.some(term => searchText.includes(term));
      });
    }

    setFilteredProducts(filtered);
  };

  const ProductCard = ({ item }) => (
     <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductDesc', { productId: item._id })} 
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image[0] }} style={styles.productImage} />
        <View style={styles.imageOverlay} />
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.currency}>₹</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <View style={styles.loaderContent}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading Collections...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Collections</Text>
        <Text style={styles.headerSubtitle}>{filteredProducts.length} products found</Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.tabsSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsContent}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab, 
                selectedCategory === cat && styles.activeTab
              ]}
              onPress={() => filterByCategory(cat)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.tabText, 
                selectedCategory === cat && styles.activeTabText
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Subcategory Tabs - Only show if subcategories exist */}
      {subcategories.length > 1 && (
        <View style={styles.subcategorySection}>
          <Text style={styles.subcategoryLabel}>Subcategories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.subcategoryContainer}
            contentContainerStyle={styles.subcategoryContent}
          >
            {subcategories.map((subcat, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.subcategoryTab, 
                  selectedSubcategory === subcat && styles.activeSubcategoryTab
                ]}
                onPress={() => filterBySubcategory(subcat)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.subcategoryText, 
                  selectedSubcategory === subcat && styles.activeSubcategoryText
                ]}>
                  {subcat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found in this category</Text>
          </View>
        )}
      />
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loader: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContent: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 16,
    fontWeight: '500',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '400',
  },
  tabsSection: {
    backgroundColor: '#ffffff',
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tabsContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  tabsContent: {
    paddingRight: 20,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: '#e2e8f0',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  activeTab: {
    backgroundColor: '#000',
    borderColor: '#000',
    transform: [{ scale: 1.05 }],
  },
  tabText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  subcategorySection: {
    backgroundColor: '#f8fafc',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  subcategoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  subcategoryContainer: {
    paddingHorizontal: 20,
  },
  subcategoryContent: {
    paddingRight: 20,
  },
  subcategoryTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  activeSubcategoryTab: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  subcategoryText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  activeSubcategoryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  list: {
    padding: 10,
    paddingTop: 30,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 7.5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    backgroundColor: '#f1f5f9',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
  },
  cardContent: {
    padding: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    lineHeight: 22,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  currency: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});

export default Collections;