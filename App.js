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
import { theme } from "./src/core/theme";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 20 }}>SwifTech</Text>
        </View>
      </StatusBar>
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
          <Stack.Screen name="Order" component={Order}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
