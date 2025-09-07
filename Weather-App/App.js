import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ActivityIndicator, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons'; // For search icon

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const API_KEY = '97522bd64b08debefd12a1755a5b1f15';

  const fetchWeatherByCity = async (cityName) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setCity(cityName);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (latitude, longitude) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setCity(response.data.name);
    } catch (error) {
      console.error('Error fetching location weather data:', error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required to get your current city.');
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      fetchWeatherByCoords(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Search Bar with Icon */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          placeholderTextColor="#ccc"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => fetchWeatherByCity(query)}
        />
        <TouchableOpacity onPress={() => fetchWeatherByCity(query)}>
          <Ionicons name="search" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: '#fff', marginTop: 10 }}>Fetching Weather...</Text>
        </>
      ) : weather ? (
        <>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.date}>{new Date().toDateString()}</Text>

          <Image
            source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` }}
            style={styles.weatherIcon}
          />

          <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.weatherType}>{weather.weather[0].main}</Text>

          <View style={styles.extraInfo}>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Humidity</Text>
              <Text style={styles.infoValue}>{weather.main.humidity}%</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Wind</Text>
              <Text style={styles.infoValue}>{weather.wind.speed} m/s</Text>
            </View>
          </View>
        </>
      ) : (
        <Text style={{ color: '#fff', marginTop: 20 }}>Unable to fetch weather data</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#000',
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  date: {
    fontSize: 18,
    color: '#f1f1f1',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },
  temperature: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
  },
  weatherType: {
    fontSize: 22,
    color: '#f1f1f1',
    marginBottom: 30,
  },
  extraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },
  infoBox: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#f1f1f1',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
