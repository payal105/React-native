import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContextProvider } from "./context/AppContext";

// Screens
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import ProductDesc from "./screens/ProductDesc";
import About from "./screens/About";
import Collections from "./screens/Collections";
import Cart from "./screens/Cart";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        setInitialRoute(token ? "Home" : "Login");
      } catch (error) {
        console.error("Token check error:", error);
        setInitialRoute("Login");
      }
    };
    checkToken();
  }, []);

  if (!initialRoute) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Collections"
            component={Collections}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDesc"
            component={ProductDesc}
            options={{ title: "Product Details" }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ title: "Cart Products" }}
          />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
