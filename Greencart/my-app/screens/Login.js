import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setUser, fetchUser } = useAppContext(); // ✅ from context

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter both email and password',
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        { withCredentials: true } // ✅ important for cookies
      );

      setLoading(false);

      if (data.success) {
        // ✅ Save user in context
        if (data.user) {
          setUser(data.user);
        }

        // ✅ Refresh user context (fetch latest user from backend if needed)
        fetchUser();

        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: `Welcome back, ${data.user?.name || ''}`,
        });

        setTimeout(() => {
          navigation.replace('Home');
        }, 1500);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: data.message || 'Invalid credentials',
        });
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: error.response?.data?.message || error.message,
      });
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Text style={styles.eyeText}>{passwordVisible ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

      {/* Registration Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.loginText}>
          Don't have an account? <Text style={styles.loginLink}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  eyeButton: {
    padding: 5,
  },
  eyeText: {
    fontSize: 18,
  },
  button: {
    width: '100%',
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 15,
    fontSize: 14,
    color: '#555',
  },
  loginLink: {
    color: '#000',
    fontWeight: 'bold',
  },
});
