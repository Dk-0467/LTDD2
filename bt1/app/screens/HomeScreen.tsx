import React from 'react';
import CartItem from './hometabs/Cart';
import Feed from './hometabs/Feed';
import Profile from './hometabs/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Wishlist from './hometabs/Wishlist';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartItem}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="shoppingcart" size={24} color="black" />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Wishlist"
          component={Wishlist}
          options={{
            tabBarLabel: 'Wishlist',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="favorite-border" size={24} color="black" />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user" size={24} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default HomeScreen;
