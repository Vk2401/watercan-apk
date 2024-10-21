import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, Animated, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity value is 1
  const [isLoading, setIsLoading] = useState(true);  // For loader visibility
  const [productInfo, setProductInfo] = useState(null); // State to hold product info

  const fetchProductInfo = async () => {
    try {
      // Fetch Product Info
      const productResponse = await axios.get('https://ezwater.muvastech.com/wp-json/wc/v3/products', {
        auth: {
          username: 'ck_f748834b2a5a1441b3c62ed42661f72388b2dc8f',  // Replace with actual WooCommerce Consumer Key
          password: 'cs_2a33a7799afc3c7ae4a42b8ad560c30129845d67',  // Replace with actual WooCommerce Consumer Secret
        }
      });
      
      console.log('Fetched Product Info:', productResponse.data);  // Log product data to console
      setProductInfo(productResponse.data);  // Store product data in state
    } catch (error) {
      console.error('Error fetching product data:', error);  // Handle error
    } finally {
      setIsLoading(false);  // Stop the loading indicator
    }
  };

  useEffect(() => {
    // Fetch product data when the component mounts
    fetchProductInfo();

    // After data is fetched, set a delay to transition to the Homepage
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
          productInfo && (
            <Text className="text-black font-umlight text-center">
              First product: {productInfo[0].name}  {/* Display first product name */}
            </Text>
          )
        )}
      </View>
    </View>
  );
};

export default SplashScreen;
