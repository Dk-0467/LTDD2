import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SigninScreen from './screens/SigninScreen';
import LoginScreen from './screens/LoginScreen';
import ProductDetail from './screens/ProductDetail';
import IntroScreen from './screens/IntroScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import PaymentMethodsScreen from './screens/paymentMethodsScreen';
import CategoryProductsScreen from './screens/CategoryProductsScreen';

const Stack = createNativeStackNavigator();

const MyApp = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Intro">
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Details'
            component={DetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Signin'
            component={SigninScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Intro'
            component={IntroScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ProductDetail'
            component={ProductDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='CheckoutScreen'
            component={CheckoutScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='PaymentMethods'
            component={PaymentMethodsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='CategoryProducts'
            component={CategoryProductsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default MyApp;
