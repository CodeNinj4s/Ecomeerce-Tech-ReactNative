import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Login } from './src/screens/Login';
import { Register } from "./src/screens/Register";
import { AddressRegister } from "./src/screens/AddressRegister";
import { ForgetPassword } from "./src/screens/ForgetPassword";
import { MainStore } from "./src/screens/MainStore";
import { OrderDelivery } from "./src/screens/Map/OrderDelivery";
import { Order } from "./src/screens/Order";
import { ProductBag } from "./src/screens/ProductBag";
import { ClienteTracker } from "./src/screens/Map/ClienteTracker";
//Para el cierre de sesion de Fb
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
//Para la pantalla de inicio
import { Image } from 'react-native';
import React, { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  //Para verificar si hay una sesion de facebook inciada
  // Variable para el token de facebook
  const [fbAccessToken, setFbAccessToken] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  useEffect(() => {
    // Verifica si hay sesion iniciada
    AccessToken.getCurrentAccessToken().then((data) => {
      if (data && data.accessToken) {
        // se guarda el token
        setFbAccessToken(data.accessToken.toString());
        setInitializing(false);
      } else {
        setInitializing(false);
      }
    });
  }, []);

  if (initializing) {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/images/6136431.png')} style={styles.logo} />
      </View>
    );
  }

  // Si hay un token guardado, cierra la sesion
  if (fbAccessToken) {
    LoginManager.logOut();
    // Limpia la variable
    setFbAccessToken(null);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tracker" component={OrderDelivery} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AddressRegister" component={AddressRegister} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="MainStore" component={MainStore} />
        <Stack.Screen name="ProductBag" component={ProductBag} />
        <Stack.Screen name="ClienteTracker" component={ClienteTracker} />
        <Stack.Screen name="Order" component={Order} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Change to the desired background color for the splash screen
  },
  logo: {
    width: 200, // Adjust the width and height according to your logo image
    height: 200,
    resizeMode: 'contain',
  },
});
