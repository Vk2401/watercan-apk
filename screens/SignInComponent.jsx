import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Appearance,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  usermail: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignInComponent = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleLogin = async (values) => {
    setError('')
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://ezwater.muvastech.com/wp-json/mustech-api/v1/login',
        {
          username: values.usermail,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 'success') {
        const userData = response.data;
        await AsyncStorage.setItem('@User:data', JSON.stringify(userData));
        navigation.navigate('ReSplash');
      } else {
        setError('Login Failed :' + response.data.message || 'Please try again.');
      }
    } catch (error) {

      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust this value as needed
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

          <View className="h-full bg-white">
            <ScrollView className="px-1 bg-white py-40">
              <View className="px-6 flex justify-center items-center">
                <View className="flex flex-col justify-center">
                  <Text className="text-black px-2 font-bold text-2xl text-center">
                    Welcome back!
                  </Text>
                  <Text className="text-gray-500 px-2 font-normal text-center">
                    Sign in to access your account
                  </Text>
                  <Formik
                    initialValues={{ usermail: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                  >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                      <View className="px-2 py-8">
                        <View className="flex flex-row relative mt-20 text-black">
                          <TextInput
                            className={`rounded-md w-full bg-gray-200 py-3 pl-5 font-normal text-black ${errors.usermail || errorMsg ? 'border-red-500 border' : ''
                              }`}
                            placeholder="Enter your username"
                            placeholderTextColor='#808080'
                            onChangeText={handleChange('usermail')}
                            onBlur={handleBlur('usermail')}
                            value={values.usermail}
                          />
                        </View>
                        {errors.usermail && (
                          <Text className="text-red-700 mt-1 px-2 font-normal text-center">
                            {errors.usermail}
                          </Text>
                        )}
                        <View className="flex flex-row relative mt-10">
                          <TextInput
                            className={`rounded-md w-full bg-gray-200 py-3 pl-5 font-normal text-black ${errors.password || errorMsg ? 'border-red-500 border' : ''
                              }`}
                            placeholder="Enter your password"
                            secureTextEntry={!showPassword}
                            placeholderTextColor='#808080'
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
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
                        {errors.password && (
                          <Text className="text-red-700 mt-1 px-2 font-normal text-center">
                            {errors.password}
                          </Text>
                        )}
                        {errorMsg ? (
                          <Text className="text-red-600 px-2 mt-2 font-normal text-center">
                            {errorMsg}
                          </Text>
                        ) : (
                          true
                        )}

                        <TouchableOpacity>
                          <Text className="text-sky-500 font-medium my-5 ml-auto">
                            Forgot password?
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          className="bg-sky-500 flex flex-row justify-center items-center py-3 text-center rounded-lg shadow-2xl mb-5 mx-9"
                          onPress={handleSubmit}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                          ) : (
                            <Text className="text-white px-2 text-lg font-medium">
                              Sign In
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    )}
                  </Formik>
                </View>
              </View>
              <View className="flex flex-row justify-center items-center mt-5">
                <Text className="text-black font-medium">Continue With</Text>
                <TouchableOpacity>
                  <Text className="text-sky-500 font-medium ml-2">Mobile Number</Text>
                </TouchableOpacity>
              </View>
              <View className="flex flex-row justify-center items-center mt-5 mb-5">
                <Text className="text-black font-medium">New Member</Text>
                <TouchableOpacity onPress={() => navigation.navigate('UserInfoScreen')}>
                  <Text className="text-sky-500 font-medium ml-2">Register Now</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInComponent;
