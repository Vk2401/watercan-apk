import { 
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function Cart() {
  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [canCount, setCanCount] = useState(1); // Initialize can count
  const [isChecked, setIsChecked] = useState(false);
  const [emptyCanPrice, setEmptyCanPrice] = useState(0);
  const navigation = useNavigation();

  // Function to handle the checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setEmptyCanPrice(isChecked ? 0 : 150);
  };

  // Function to retrieve data from AsyncStorage
  const retrieveData = async () => {
    try {
      // Fetch user data
      const dataString = await AsyncStorage.getItem('@customer_info');
      if (dataString) {
        const data = JSON.parse(dataString);
        setUserData(data);
      } else {
        console.log('No customer data found');
      }

      // Fetch product data
      const productString = await AsyncStorage.getItem('@product_info');
      if (productString) {
        const products = JSON.parse(productString);
        setProductData(products[0]);
      } else {
        console.log('No product data found');
      }

      // Fetch can count
      const countString = await AsyncStorage.getItem('@can_count');
      if (countString) {
        const count = JSON.parse(countString);
        setCanCount(count);
      } else {
        console.log('No can count found');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while retrieving data.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieveData(); // Call the data retrieval function when the screen is focused
    }, [])
  );

  const handleIncrement = () => {
    setCanCount(prevCount => prevCount + 1);
    AsyncStorage.setItem('@can_count', JSON.stringify(canCount + 1)); // Update AsyncStorage
  };

  const handleDecrement = () => {
    if (canCount > 1) {
      setCanCount(prevCount => prevCount - 1);
      AsyncStorage.setItem('@can_count', JSON.stringify(canCount - 1)); // Update AsyncStorage
    }
  };

  return (
    <View className="bg-white h-full">
      <View className="mx-5 mt-12">
        <Text className="text-black text-2xl font-bold">Cart</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="mt-5 h-full">
        <View>
          {/* Product Info */}
          {productData && (
            <View className="bg-primary-1 mx-7 py-5 px-3 rounded-xl shadow-sm shadow-black flex flex-row">
              <View className="py-1 rounded-xl px-5 bg-blue-100">
                <Image source={{ uri: productData.images[0].src }} className="h-24 w-12" />
              </View>
              <View className="flex flex-col">
                <Text className="text-black font-bold text-lg ml-4">{productData.name}</Text>
                <Text className="text-black font-umregular text-lg ml-4">₹{productData.price * canCount}</Text>
                <View className="flex flex-row justify-center items-center mt-5 bg-gray-200 mx-auto rounded-md border ml-2 border-gray-200">
                  <TouchableOpacity onPress={handleDecrement} className="py-2 px-2 bg-primary-1 rounded-l-md">
                    <Icon name="minus" size={18} color="gray" />
                  </TouchableOpacity>
                  <Text className="rounded-md px-5 py-2 text-center text-md font-umregular text-black">{canCount}</Text>
                  <TouchableOpacity onPress={handleIncrement} className="py-2 px-2 bg-primary-1 rounded-r-md">
                    <Icon name="plus" size={18} color="gray" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Checkbox for empty can */}
          <View className="bg-primary-1 mx-7 px-3 rounded-xl shadow-sm shadow-black flex flex-row mt-5">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-black font-umregular ml-4">I Don't have empty can to return</Text>
              <CheckBox checked={isChecked} onPress={handleCheckboxChange} checkedColor="#87CEEB" />
            </View>
          </View>

          {/* Order Summary */}
          <View className="bg-primary-1 mx-7 py-5 px-3 rounded-xl shadow-sm shadow-black flex flex-row mt-5">
            <View className="flex flex-col w-full">
              <Text className="text-black font-bold text-lg ml-4">Order Summary</Text>
              <View className="mx-1 border-b border-gray-300"></View>
              <View className="flex flex-row justify-between mt-5">
                <Text className="text-black font-umregular ml-4">Order</Text>
                <Text className="text-black font-umregular ml-4">₹{productData?.price * canCount}</Text>
              </View>
              <View className="flex flex-row justify-between mt-5">
                <Text className="text-black font-umregular ml-4">Empty can</Text>
                <Text className="text-black font-umregular ml-4">₹{emptyCanPrice}</Text>
              </View>
              <View className="mx-1 border-b border-gray-300 mt-5"></View>
              <View className="flex flex-row justify-between mt-2">
                <Text className="text-black font-bold ml-4">Total</Text>
                <Text className="text-black font-bold ml-4">₹{(productData?.price * canCount) + emptyCanPrice}</Text>
              </View>
            </View>
          </View>

          {/* Address Section */}
          <View className="bg-primary-1 mx-7 py-3 px-3 rounded-xl shadow-sm shadow-black mt-5">
            <Text className="text-black font-bold">Address</Text>
            {userData ? (
              <View>
                <Text className="text-gray-500 font-umregular">{userData.billing.first_name} {userData.billing.last_name}</Text>
                <Text className="text-gray-500 font-umregular">{userData.billing.address_1}</Text>
                <Text className="text-gray-500 font-umregular">{userData.billing.city}, {userData.billing.state}, {userData.billing.postcode}</Text>
                <Text className="text-gray-500 font-umregular">{userData.billing.country}</Text>
                <Text className="text-gray-500 font-umregular">Phone: {userData.billing.phone}</Text>
                <Text className="text-gray-500 font-umregular">Email: {userData.email}</Text>
              </View>
            ) : (
              <Text className="text-gray-500 font-umregular">No address found.</Text>
            )}
          </View>

          {/* Check Out Button */}
          <View className="flex mt-5">
            <TouchableOpacity className="py-3 px-3 bg-sky-500 rounded-md shadow-sm shadow-black mx-5">
              <Text className="text-white font-bold text-center text-md">Check Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mb-20"></View>
      </ScrollView>
    </View>
  );
}
