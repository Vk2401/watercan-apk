import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // To navigate to another screen

const SignInComponent = () => {
  const navigation = useNavigation();
  const [usermail, setUsermail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleLogin = async () => {
    setIsLoading(true);
  
    try {
      const response = await axios.post(
        'https://ezwater.muvastech.com/wp-json/mustech-api/v1/login',
        {
          username: usermail, // Use username instead of usermail
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Check if login is successful based on the response status
      if (response.data.status === 'success') {
        console.log('Login successful:', response.data);
        const userData = response.data;
        await AsyncStorage.setItem('@User:data', JSON.stringify(userData));
        navigation.navigate('ReSplash');
      } else {
        // Handle login failure based on the response status
        console.log('Login failed:', response.data.message);
        Alert.alert('Login Failed', response.data.message || 'Please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {}, []);

  return (
    <View className="h-full bg-white ">
      <ScrollView className="px-1 bg-white py-40">
        <View className="px-6 flex justify-center items-center">
          <View className="flex flex-col justify-center">
            <Text className="text-black px-2 font-umbold text-2xl text-center">
              Welcome back!
            </Text>
            <Text className="text-gray-500 px-2 font-umregular text-center">
              Sign in to access your account
            </Text>
            <View className="px-2 py-8">
              <View className="flex flex-row relative mt-20">
                <TextInput
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your username"
                  value={usermail}
                  onChangeText={setUsermail}
                />
              </View>

              <View className="flex flex-row relative mt-10">
                <TextInput
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  className="absolute right-3 top-3"
                  onPress={togglePasswordVisibility} // Toggle password visibility on press
                >
                  <Icon
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text className="text-sky-500 font-ummedium mt-5 ml-auto">
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex flex-row justify-center items-center mt-5">
          <Text className="text-black font-ummedium">Continue With</Text>
          <TouchableOpacity>
            <Text className="text-sky-500 font-ummedium ml-2">Mobile Number</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-center items-center mt-5 mb-5">
          <Text className="text-black font-medium">New Member</Text>
          <TouchableOpacity onPress={() => navigation.navigate('UserInfoScreen')}>
            <Text className="text-sky-500 font-ummedium ml-2">Register Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="bg-sky-500 flex flex-row justify-center items-center py-3 text-center rounded-lg shadow-2xl mb-5 mx-9"
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="text-white px-2 text-lg font-ummedium">
            Sign In
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SignInComponent;
