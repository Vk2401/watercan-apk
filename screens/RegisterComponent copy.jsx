import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';

const RegisterComponent = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
  
    try {
      const response = await axios.post(
        'https://nammacollection.com/waterapp/registerUser.php',
        {
          name,
          mail,
          phoneNumber,
          address,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      console.log('Response:', response.data);
  
      if (response.data.id) {
        console.log('Registration successful:', response.data);
        const userData = response.data;
        await AsyncStorage.setItem('@User:data', JSON.stringify(userData));
        navigation.navigate('HomeStack');
      } else {
        console.log('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Registration Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="h-full bg-white ">
      <ScrollView className=" px-1 bg-white  py-10">
        <View className="px-6 flex justify-center items-center">
          <View className=" flex flex-col  justify-center ">
            <Text className="text-black px-2 font-umbold text-2xl text-center ">
              Create an Account
            </Text>
            <Text className="text-gray-500 px-2 font-umregular text-center">
              Sign up to get started
            </Text>
            <View className="px-2 py-8 ">
              <View className="flex flex-col relative mt-5">
              <Text className="mb-2 text-black font-umbold ">Name</Text>
                <TextInput
                  className=" rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View className="flex flex-col relative mt-5">
              <Text className="mb-2 text-black font-umbold">Mail id</Text>
                <TextInput
                  className=" rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your mail ID"
                  value={mail}
                  onChangeText={setMail}
                />
              </View>

              <View className="flex flex-col relative mt-5">
              <Text className="mb-2 text-black font-umbold">Phone</Text>
                <TextInput
                  className=" rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>

              <View className="flex flex-col relative mt-5">
              <Text className="mb-2 text-black font-umbold">Address</Text>
                <TextInput
                  className=" rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your address"
                  value={address}
                  onChangeText={setAddress}
                />
              </View>
              <Text className="mt-5 text-black font-umbold">Password</Text>
              <View className="flex flex-row relative mt-3">
                <TextInput
                  className=" rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  className=" absolute right-3 top-3 "
                  onPress={togglePasswordVisibility}
                >
                  <Icon
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              <View className="flex flex-row relative mt-5">
                <TextInput
                  className=" rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Confirm your password"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  className=" absolute right-3 top-3 "
                  onPress={toggleConfirmPasswordVisibility}
                >
                  <Icon
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="bg-sky-500 flex flex-row justify-center items-center py-3  text-center rounded-lg shadow-2xl  mb-5 mx-9"
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <>
            <Text className="text-white px-2 text-lg font-ummedium">
              Register
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RegisterComponent;
