import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { Login } from './src/screens/Login';
import { Register } from "./src/screens/Register";
import { AddressRegister } from "./src/screens/AddressRegister";
import { ForgetPassword } from "./src/screens/ForgetPassword";
import { MainStore } from "./src/screens/MainStore";
import { OrderDelivery } from "./src/screens/Map/OrderDelivery";
import { Order } from "./src/screens/Order";
import { ProductBag } from "./src/screens/ProductBag";
import { ClienteTracker } from "./src/screens/Map/ClienteTracker";
import { theme } from "./src/core/theme";
import { LogOutButton } from "./src/components/LogOutButton";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ 
          headerStyle: {
            backgroundColor: theme.colors.primary
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTitle: 'SwifTech',
         }}
      >
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Tracker" component={OrderDelivery} options={{headerRight: () => (<LogOutButton/>)}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
        <Stack.Screen name="AddressRegister" component={AddressRegister} options={{headerShown: false}}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{headerRight: () => (<LogOutButton/>)}}/>
        <Stack.Screen name="MainStore" component={MainStore} options={{headerRight: () => (<LogOutButton/>)}}/>
        <Stack.Screen name="ProductBag" component={ProductBag} options={{headerRight: () => (<LogOutButton/>)}}/>
        <Stack.Screen name="ClienteTracker" component={ClienteTracker} options={{headerRight: () => (<LogOutButton/>)}}/>
        <Stack.Screen name="Order" component={Order} options={{headerRight: () => (<LogOutButton/>)}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
