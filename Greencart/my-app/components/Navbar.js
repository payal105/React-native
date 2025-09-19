import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const navigation = useNavigation();
  const { user, setUser } = useAppContext(); // ✅ get user from context
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Home')}>
        <Icon name="home-outline" size={24} color="#333" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      {/* Collections */}
      <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Collections')}>
        <Icon name="albums-outline" size={24} color="#333" />
        <Text style={styles.label}>Collections</Text>
      </TouchableOpacity>

      {/* Cart */}
      <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Cart')}>
        <Icon name="cart-outline" size={24} color="#333" />
        <Text style={styles.label}>Cart</Text>
      </TouchableOpacity>

      {/* Profile */}
      <View style={{ position: 'relative' }}>
        <TouchableOpacity style={styles.menu} onPress={() => setMenuVisible(!menuVisible)}>
          <Icon name="person-outline" size={24} color="#333" />
          <Text style={styles.label}>Profile</Text>
        </TouchableOpacity>

        {/* Dropdown Menu */}
        {menuVisible && (
          <View style={styles.dropdown}>
            {user ? (
              <>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate('Orders'); // ✅ go to My Orders
                  }}
                >
                  <Text style={styles.dropdownText}>My Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setMenuVisible(false);
                    setUser(false); // ✅ clear user in context
                    // TODO: Also clear token from storage (AsyncStorage/SecureStore)
                  }}
                >
                  <Text style={styles.dropdownText}>Logout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Login'); // ✅ navigate to Login screen
                }}
              >
                <Text style={styles.dropdownText}>Login</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  menu: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
  },
  dropdown: {
    position: 'absolute',
    bottom: 50,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: 5,
    minWidth: 120,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
});

export default Navbar;
