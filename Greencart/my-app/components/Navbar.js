import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // <-- Import hook

const Navbar = () => {
  const navigation = useNavigation(); // <-- Access navigation

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Home')}>
        <Icon name="home-outline" size={24} color="#333" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Collections')}>
        <Icon name="albums-outline" size={24} color="#333" />
        <Text style={styles.label}>Collections</Text>
      </TouchableOpacity>


     <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Cart')}>
        <Icon name="cart-outline" size={24} color="#333" />
        <Text style={styles.label}>Cart</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('Profile')}>
        <Icon name="person-outline" size={24} color="#333" />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>

 
       
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
  
});

export default Navbar;
