import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const UserInfoScreen = () => {
  const navigation = useNavigation();

  const handleNext = (values) => {
    // Navigate to the next screen with user data
    navigation.navigate('AddressScreen', values);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust this value as needed
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <ScrollView className="px-1 bg-white py-10 ">
        <Text className="text-black text-2xl text-center mb-4">User Information</Text>
        <Formik
          initialValues={{ email: '', firstName: '', lastName: '', username: '', referralBy: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleNext}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className="px-6 py-10">
              <TextInput
                className={`rounded-md bg-gray-200 py-3 pl-5 text-black  ${errors.email ? 'border border-red-500' : 'mb-4'}`}
                placeholder="Email"
                placeholderTextColor='#808080'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && <Text className="text-red-700 mb-2">{errors.email}</Text>}

              <TextInput
                className={`rounded-md bg-gray-200 py-3  pl-5  text-black  ${errors.firstName ? 'border border-red-500' : 'mb-4'}`}
                placeholder="First Name"
                placeholderTextColor='#808080'
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
              />
              {errors.firstName && <Text className="text-red-700 mb-2">{errors.firstName}</Text>}

              <TextInput
                className={`rounded-md bg-gray-200 py-3 pl-5  text-black  ${errors.lastName ? 'border border-red-500' : 'mb-4'}`}
                placeholder="Last Name"
                placeholderTextColor='#808080'
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
              />
              {errors.lastName && <Text className="text-red-700 mb-2">{errors.lastName}</Text>}

              <TextInput
                className={`rounded-md bg-gray-200 py-3 pl-5  text-black  ${errors.username ? 'border border-red-500' : 'mb-4'}`}
                placeholder="Username"
                placeholderTextColor='#808080'
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
              {errors.username && <Text className="text-red-700 mb-2">{errors.username}</Text>}

              

              <TextInput
                className={`rounded-md bg-gray-200 py-3 pl-5  text-black  ${errors.password ? 'border border-red-500' : 'mb-4'}`}
                placeholder="Password"
                placeholderTextColor='#808080'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true} // Hide password input
              />
              {errors.password && <Text className="text-red-700 mb-2">{errors.password}</Text>}

              <TextInput
                className="rounded-md bg-gray-200 py-3 pl-5 mb-4 text-black"
                placeholder="Referral Code (optional)"
                placeholderTextColor='#808080'
                onChangeText={handleChange('referralBy')}
                onBlur={handleBlur('referralBy')}
                value={values.referralBy}
              />

              <TouchableOpacity
                className="bg-sky-500 py-3 rounded-lg mt-4"
                onPress={handleSubmit}
              >
                <Text className="text-white text-center">Next</Text>
              </TouchableOpacity>

              <TouchableOpacity
              className="mt-4"
              onPress={() => navigation.goBack()}
            >
              <Text className="text-sky-500 text-center">Back</Text>
            </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
      </ScrollView>
    </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

export default UserInfoScreen;
