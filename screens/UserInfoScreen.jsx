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
import { useNavigation } from '@react-navigation/native';

const UserInfoScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [referralBy, setReferralBy] = useState('');
  const [password, setPassword] = useState(''); // State for password
  const [isLoading, setIsLoading] = useState(false);

  const validateFields = () => {
    if (!email || !firstName || !lastName || !username || !password) {
      Alert.alert('Please fill all the fields');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateFields()) return;

    // Navigate to the next screen with user data
    navigation.navigate('AddressScreen', {
      email,
      firstName,
      lastName,
      username,
      referralBy,
      password, // Pass the password to the next screen
    });
  };

  return (
    <View className="h-full bg-white px-6 py-10">
      <ScrollView className="px-1 bg-white py-10">
        <Text className="text-black text-2xl text-center mb-4">User Information</Text>
        <TextInput
          className="rounded-md bg-gray-200 py-3 pl-5 mb-4"
          placeholder="Email"
          placeholderTextColor = '#808080'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="rounded-md bg-gray-200 py-3 pl-5 mb-4"
          placeholder="First Name"
          placeholderTextColor = '#808080'
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          className="rounded-md bg-gray-200 py-3 pl-5 mb-4"
          placeholder="Last Name"
          placeholderTextColor = '#808080'
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          className="rounded-md bg-gray-200 py-3 pl-5 mb-4"
          placeholder="Username"
          placeholderTextColor = '#808080'
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          className="rounded-md bg-gray-200 py-3 pl-5 mb-4"
          placeholder="Referral Code (optional)"
          placeholderTextColor = '#808080'
          value={referralBy}
          onChangeText={setReferralBy}
        />
        <TextInput
          className="rounded-md bg-gray-200 py-3 pl-5 mb-4"
          placeholder="Password"
          placeholderTextColor = '#808080'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true} // Hide password input
        />
      </ScrollView>
      <TouchableOpacity
        className="bg-sky-500 py-3 rounded-lg mt-4"
        onPress={handleNext}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="text-white text-center">Next</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UserInfoScreen;
