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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [referralBy, setReferralBy] = useState('');
  const [mail, setMail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('US');
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
          email: mail,
          first_name: firstName,
          last_name: lastName,
          username,
          referral_by: referralBy,
          shipping: {
            first_name: firstName,
            last_name: lastName,
            address_1: address,
            city,
            state,
            postcode,
            country,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
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
      <ScrollView className="px-1 bg-white py-10">
        <View className="px-6 flex justify-center items-center">
          <View className="flex flex-col justify-center ">
            <Text className="text-black px-2 font-umbold text-2xl text-center ">
              Create an Account
            </Text>
            <Text className="text-gray-500 px-2 font-umregular text-center">
              Sign up to get started
            </Text>
            <View className="px-2 py-8 ">
              <View className="flex flex-col relative mt-5">
                <Text className="mb-2 text-black font-umbold">First Name</Text>
                <TextInput
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your first name"
                  placeholderTextColor = '#808080'
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>

              <View className="flex flex-col relative mt-5">
                <Text className="mb-2 text-black font-umbold">Last Name</Text>
                <TextInput
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your last name"
                  placeholderTextColor = '#808080'
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>

              <View className="flex flex-col relative mt-5">
                <Text className="mb-2 text-black font-umbold">Username</Text>
                <TextInput
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your username"
                  placeholderTextColor = '#808080'
                  value={username}
                  onChangeText={setUsername}
                />
              </View>

              <View className="flex flex-col relative mt-5">
                <Text className="mb-2 text-black font-umbold">Referral Code</Text>
                <TextInput
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter referral code (if any)"
                  placeholderTextColor = '#808080'
                  value={referralBy}
                  onChangeText={setReferralBy}
                />
              </View>

              <View className="flex flex-col relative mt-5">
                <Text className="mb-2 text-black font-umbold">Mail ID</Text>
                <TextInput
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your mail ID"
                  placeholderTextColor = '#808080'
                  value={mail}
                  onChangeText={setMail}
                />
              </View>

              <View className="flex flex-col relative mt-5">
                <Text className="mb-2 text-black font-umbold">Phone</Text>
                <TextInput
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your phone number"
                  placeholderTextColor = '#808080'
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>

              <View className="flex flex-col relative mt-5">
                <Text className="mb-2 text-black font-umbold">Address</Text>
                <TextInput
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your address"
                  value={address}
                  placeholderTextColor = '#808080'
                  onChangeText={setAddress}
                />
              </View>

              <View className="flex flex-col relative mt-5">
                <Text className="mb-2 text-black font-umbold">City</Text>
                <TextInput
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your city"
                  placeholderTextColor = '#808080'
                  value={city}
                  onChangeText={setCity}
                />
              </View>

              <View className="flex flex-col relative mt-5">
                <Text className="mb-2 text-black font-umbold">State</Text>
                <TextInput
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your state"
                  placeholderTextColor = '#808080'
                  value={state}
                  onChangeText={setState}
                />
              </View>

              <View className="flex flex-col relative mt-5">
                <Text className="mb-2 text-black font-umbold">Postcode</Text>
                <TextInput
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your postcode"
                  placeholderTextColor = '#808080'
                  value={postcode}
                  onChangeText={setPostcode}
                />
              </View>

              <Text className="mt-5 text-black font-umbold">Password</Text>
              <View className="flex flex-row relative mt-3">
                <TextInput
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Enter your password"
                  placeholderTextColor = '#808080'
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  className="absolute right-3 top-3"
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
                  className="rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black"
                  placeholder="Confirm your password"
                  placeholderTextColor = '#808080'
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  className="absolute right-3 top-3"
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
        className="bg-sky-500 flex flex-row justify-center items-center py-3 text-center rounded-lg shadow-2xl mb-5 mx-9"
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="text-white px-2 text-lg font-ummedium">
            Register
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RegisterComponent;
