import React, { useState } from 'react'; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, firstName, lastName, username, referralBy, password } = route.params; // Include password

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateFields = () => {
    if (!address || !city || !state || !postcode || !phoneNumber) {
      Alert.alert('Please fill all the fields');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    setIsLoading(true);

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
          country,
          phone: phoneNumber,
        },
        shipping: {
          address_1: address,
          city,
          state,
          postcode,
          country,
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

      console.log('Response:', response.data);

      if (response.data.id) {
        console.log('Registration successful:', response.data);
        navigation.navigate('SignInComponent');
      } else {
        console.log('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="h-full bg-white px-6 py-10">
      <ScrollView className="px-1 bg-white py-10">
        <Text className="text-black text-2xl text-center mb-4">Address Information</Text>
        <TextInput
          className="rounded-md bg-gray-200 py-3 pl-5 mb-4"
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          className="rounded-md bg-gray-200 py-3 pl-5 mb-4"
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          className="rounded-md bg-gray-200 py-3 pl-5 mb-4"
          placeholder="State"
          value={state}
          onChangeText={setState}
        />
        <TextInput
          className="rounded-md bg-gray-200 py-3 pl-5 mb-4"
          placeholder="Postcode"
          value={postcode}
          onChangeText={setPostcode}
        />
        <TextInput
          className="rounded-md bg-gray-200 py-3 pl-5 mb-4"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </ScrollView>
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
    </View>
  );
};

export default AddressScreen;
