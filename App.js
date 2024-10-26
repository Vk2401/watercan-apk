import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import SplashScreen from './screens/Splash';
import SignInComponent from './screens/SignInComponent';
import RegisterComponent from './screens/RegisterComponent'
import Homepage from './screens/Home/HomeTabScreens';
import ReSplash from './screens/ReSplash';
import AddressScreen from './screens/AddressScreen';
import UserInfoScreen from './screens/UserInfoScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null); // Initialize state inside the component

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const dataString = await AsyncStorage.getItem('@User:data');
      
        if (dataString) {
          setInitialRoute('ReSplash');
        } else {
          setInitialRoute('Splash');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while retrieving user data.');
        setInitialRoute('SignInComponent');
      }
    };

    retrieveUserData(); // Fetch user data when component mounts
  }, []);

  if (initialRoute === null) {
    return null; // Render nothing or a loading spinner while the initial route is being determined
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          animation: 'none', // Disable all animations
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen} // Corrected component reference
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReSplash"
          component={ReSplash} // Corrected component reference
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignInComponent"
          component={SignInComponent} // Corrected component reference
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterComponent"
          component={RegisterComponent} // Corrected component reference
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserInfoScreen"
          component={UserInfoScreen} // Corrected component reference
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddressScreen"
          component={AddressScreen} // Corrected component reference
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Homepage"
          component={Homepage} // Corrected component reference
          options={{ headerShown: false }}
        />


      </Stack.Navigator>
      <StatusBar
        barStyle="dark-content" // or "dark-content"
        backgroundColor="rgba(0, 0, 0, 0)" // Any color you prefer
        hidden={false} // Set to true to hide the status bar
        translucent={true}
      />
    </NavigationContainer>
  );
}
