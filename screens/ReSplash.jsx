import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);  // For loader visibility
  const [productInfo, setProductInfo] = useState(null); // State to hold product info
  const [customerInfo, setCustomerInfo] = useState(null); // State to hold customer info
  const [customerEmail, setCustomerEmail] = useState(null);
  const [customerUsername, setCustomerUsername] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const dataString = await AsyncStorage.getItem('@User:data');

        if (dataString) {
          const data = JSON.parse(dataString); // Convert from string to object
          setUserData(data);
          console.log("This is the user data:", data);

          setCustomerEmail(data.user.user_email);
          setCustomerUsername(data.user.user_login);
        } else {
          console.log('No data found');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    retrieveUserData();
  }, []);

  // Fetch Product Info
  const fetchProductInfo = async () => {
    try {
      const productResponse = await axios.get('https://ezwater.muvastech.com/wp-json/wc/v3/products', {
        auth: {
          username: 'ck_f748834b2a5a1441b3c62ed42661f72388b2dc8f',  // WooCommerce Consumer Key
          password: 'cs_2a33a7799afc3c7ae4a42b8ad560c30129845d67' // WooCommerce Consumer Secret
        }
      });

      setProductInfo(productResponse.data);  // Store product data
      await AsyncStorage.setItem('@product_info', JSON.stringify(productResponse.data));
      console.log('Product data stored in AsyncStorage');

    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  // Fetch Customer Info based on username or email
  const fetchCustomerInfo = async () => {
    if (!customerUsername && !customerEmail) {
      console.log('No customer username or email provided');
      return;
    }
    
    try {
      const customerResponse = await axios.get(`https://ezwater.muvastech.com/wp-json/wc/v3/customers`, {
        params: {
          email: customerEmail,
          username: customerUsername,
        },
        auth: {
          username: 'ck_f748834b2a5a1441b3c62ed42661f72388b2dc8f',  // WooCommerce Consumer Key
          password: 'cs_2a33a7799afc3c7ae4a42b8ad560c30129845d67',  // WooCommerce Consumer Secret
        }
      });

      if (customerResponse.data.length > 0) {
        setCustomerInfo(customerResponse.data[0]);  // Store the first matching customer
        await AsyncStorage.setItem('@customer_info', JSON.stringify(customerResponse.data[0]));
        console.log('Customer data stored in AsyncStorage');
      } else {
        console.log('No customer found with the provided info.');
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProductInfo();  // Fetch Product Info
      await fetchCustomerInfo();  // Fetch Customer Info by username or email
      setIsLoading(false);  // Stop loading after both data are fetched
    };

    fetchData();

    // Navigate to the main screen after a delay
    const timer = setTimeout(() => {
      if (!isLoading) {
        navigation.replace('Homepage');  // Navigate to the Homepage
      }
    }, 3000);  // Adjust the delay based on your requirement

    return () => clearTimeout(timer);  // Clean up the timer
  }, [navigation, isLoading]);

  return (
    <View className="h-full w-full bg-white">
      <View className="bg-blue-500 h-64 w-64 absolute -right-28 top-0 rounded-full" />
      <View className="bg-sky-300 rounded-full absolute -bottom-5 -left-16 h-40 w-40" />
      <View className="flex-1 items-center justify-center">
        <Image className="h-40 w-40 mb-12" source={require('../assets/logot.png')} />
        <Text className="text-gray-400 font-umregular">Thousands have lived without love, not one without water.</Text>
      </View>

      <View className="absolute bottom-10 justify-center items-center w-full">
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />  // Show loader until data is fetched
        ) : (
          <>
            {productInfo && (
              <Text className="text-black font-umlight text-center">
                First product: {productInfo[0].name}
              </Text>
            )}

            {customerInfo && (
              <Text className="text-black font-umlight text-center mt-4">
                Customer: {customerInfo.first_name} {customerInfo.last_name} ({customerInfo.email})
              </Text>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default SplashScreen;
