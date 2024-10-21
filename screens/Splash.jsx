import React, { useEffect, useRef } from 'react';
import { Text, View, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity value is 1

  useEffect(() => {
    // Set a timer to navigate to the main screen after 30 seconds
    const timer = setTimeout(() => {
      navigation.replace('SignInComponent'); // 'IntroStack' is the name of your main screen
    }, 2000);

    

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, [navigation, fadeAnim]);

  return (
    <View className="h-full w-full bg-white" >
        <View className="bg-blue-500 h-64 w-64 absolute -right-28 top-0 rounded-full" />
        <View className="bg-sky-300 rounded-full absolute -bottom-5 -left-16 h-40 w-40" />
        <View className="flex-1 items-center justify-center">
          <Image className="h-40 w-40 mb-12" source={require('../assets/logot.png')} />
          {/* <Text className="text-blue-500  font-umbold text-3xl">Water</Text> */}
          <Text className="text-gray-400 font-umregular  ">Thousands have lived without love, not one without water.</Text>
        </View>
        <View className="absolute bottom-10 justify-center items-center w-full" >
          {/* <Text className="text-black font-umlight text-center">Thousands have lived without love, not one without water.</Text> */}
        </View>
    </View>
  );
};

export default SplashScreen;
