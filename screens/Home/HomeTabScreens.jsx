import React from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeStack from './HomeScreens/HomeStack';
import ProfileStack from './ProfileScreens/ProfileStack';
import Cart from './Cart/Cart';

const Tab = createBottomTabNavigator();

const homeImage = require('../../assets/logo.png'); 

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName?.includes('InterviewStart')) {
    return 'none'; 
  }
  return 'flex'; 
};

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? '#2196F3' : color; // Change icon color to black when focused

          if (route.name === 'HomeStack') {
            return (
              <Image
                source={homeImage}
                style={{ width: 25, height: 17 }}
              />
            );

          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'ProfileStack') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }

          return (
            <View
              className="font-umlight "
              style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
            >
              <View className="rounded-full p-2" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />
              </View>
            </View>
          );
        },
        tabBarLabel: ({ focused }) => {
          let label;
          if (route.name === 'HomeStack') {
            label = 'Home';
          } else if (route.name === 'Cart') {
            label = 'Cart';
          } else if (route.name === 'ProfileStack') {
            label = 'Profile';
          }
          return (
            <Text
              className="font-umlight "
              style={{ color: focused ? '#2196F3' : '#000000', fontSize: 12, fontWeight: focused ? 'bold' : 'normal' }}
            >
              {label}
            </Text>
          );
        },
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: 'white',
          position: 'absolute',
          borderTopWidth: 0,
          display: getTabBarVisibility(route), 
        },
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
