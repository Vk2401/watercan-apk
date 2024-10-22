import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  postcode: Yup.string().required('Postcode is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
});

const AddressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [errorMsg, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { email, firstName, lastName, username, referralBy, password } = route.params;

  const handleRegister = async (values) => {
    setIsLoading(true);
    const { address, city, state, postcode, phoneNumber } = values;

    const url = `https://ezwater.muvastech.com/wp-json/wc/v3/customers`;

    try {
      const response = await axios.post(url, {
        email,
        first_name: firstName,
        last_name: lastName,
        username,
        password, // Include password in the request
        referral_by: referralBy,
        billing: {
          address_1: address,
          city,
          state,
          postcode,
          country: 'US', // Default country
          phone: phoneNumber,
        },
        shipping: {
          address_1: address,
          city,
          state,
          postcode,
          country: 'US', // Default country
        },
      }, {
        auth: {
                    username: 'ck_f748834b2a5a1441b3c62ed42661f72388b2dc8f', // Replace with your consumer key
            password: 'cs_2a33a7799afc3c7ae4a42b8ad560c30129845d67',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.error('Response:', response);
      setIsLoading(false);

      if (response.data.id) {
        console.log('Registration successful:', response.data);
        navigation.navigate('SignInComponent');
      } else {
        console.log('Registration failed:', response.data.message);
        setError('Registration Failed '+ response.data.message || 'Please try again.');
      }

    } catch (error) {
      setIsLoading(false);

      
      if (error.response && error.response.status === 400) {
        // Check if the error message indicates the email is already registered
        const errorMessage = error.response.data.message || 'Registration failed. Please try again.';
        if (errorMessage.includes('already registered')) {
          setError('Email is already registered.');
        } else {
          setError( errorMessage);
        }
      } else {
        console.error('Registration Error:', error.message);
        setError( 'Registration failed. Please try again.');
      }
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
          <View className="h-full bg-white px-6 py-10">
            <Text className="text-black text-2xl text-center mb-4">Address Information</Text>
            
            <Formik
              initialValues={{ address: '', city: '', state: '', postcode: '', phoneNumber: '' }}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View className="px-1 bg-white py-10">
                  <TextInput
                    className={`rounded-md text-black bg-gray-200 py-3 pl-5 mb-4 ${errors.address ? 'border border-red-500' : ''}`}
                    placeholder="Address"
                    placeholderTextColor='#808080'
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                  />
                  {errors.address && <Text className="text-red-700 mb-2">{errors.address}</Text>}

                  <TextInput
                    className={`rounded-md text-black bg-gray-200 py-3 pl-5 mb-4 ${errors.city ? 'border border-red-500' : ''}`}
                    placeholder="City "
                    placeholderTextColor='#808080'
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    value={values.city}
                  />
                  {errors.city && <Text className="text-red-700 mb-2">{errors.city}</Text>}

                  <TextInput
                    className={`rounded-md text-black bg-gray-200 py-3 pl-5 mb-4 ${errors.state ? 'border border-red-500' : ''}`}
                    placeholder="State "
                    placeholderTextColor='#808080'
                    onChangeText={handleChange('state')}
                    onBlur={handleBlur('state')}
                    value={values.state}
                  />
                  {errors.state && <Text className="text-red-700 mb-2">{errors.state}</Text>}

                  <TextInput
                    className={`rounded-md text-black bg-gray-200 py-3 pl-5 mb-4 ${errors.postcode ? 'border border-red-500' : ''}`}
                    placeholder="Postcode "
                    placeholderTextColor='#808080'
                    onChangeText={handleChange('postcode')}
                    onBlur={handleBlur('postcode')}
                    value={values.postcode}
                  />
                  {errors.postcode && <Text className="text-red-700 mb-2">{errors.postcode}</Text>}

                  <TextInput
                    className={`rounded-md text-black bg-gray-200 py-3 pl-5 mb-4 ${errors.phoneNumber ? 'border border-red-500' : ''}`}
                    placeholder="Phone Number "
                    placeholderTextColor='#808080'
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                  />
                  {errors.phoneNumber && <Text className="text-red-700 mb-2">{errors.phoneNumber}</Text>}
                </View>
              )}
            </Formik>
            {errorMsg ? (
                          <Text className="text-red-600 px-2 my-2 font-normal text-center">
                            {errorMsg}
                          </Text>
                        ) : (
                          true
                        )}

            <TouchableOpacity
              className="bg-sky-500 py-3 rounded-lg mt-4"
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text className="text-white text-center">Register</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-4"
              onPress={() => navigation.goBack()}
            >
              <Text className="text-sky-500 text-center">Back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddressScreen;
