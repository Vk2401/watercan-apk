import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileHome from './ProfileHome';
import ProfileEdite from './ProfileEdite';
import Address from './Address';
import ProfileDetailsEdite from './ProfileDetailsEdite'

const Stack = createNativeStackNavigator();


export default function ProfileStack() {
  return (
   
      <Stack.Navigator
        initialRouteName={ProfileHome}
        screenOptions={{
          animation: 'none', 
        }}
      >
        <Stack.Screen
          name="ProfileHome"
          component={ProfileHome} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileEdite"
          component={ProfileEdite} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={Address} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileDetailsEdite"
          component={ProfileDetailsEdite} 
          options={{ headerShown: false }}
        />
       
      </Stack.Navigator>
   
  );
}


