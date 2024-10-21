import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

export default function HomeStack() {
  const [userData, setUserData] = useState(null);
  const [canCount, setCanCount] = useState(1);
  const [productData, setProductData] = useState([]); // State to hold fetched product data
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  const imageData = [
    require('../../../assets/banner1.png'),
    require('../../../assets/banner2.png'),
  ];

  const handlePress = () => {
    Linking.openURL('tel:9080177542');
  };

  const {width} = Dimensions.get('window');

  // Function to go to the next image in the banner carousel
  const handleNext = () => {
    currentIndex.current = (currentIndex.current + 1) % imageData.length;
    flatListRef.current.scrollToIndex({
      animated: true,
      index: currentIndex.current,
    });
  };

  // Function to go to the previous image in the banner carousel
  const handlePrev = () => {
    currentIndex.current =
      (currentIndex.current - 1 + imageData.length) % imageData.length;
    flatListRef.current.scrollToIndex({
      animated: true,
      index: currentIndex.current,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Automatically go to the next banner every 10 seconds
    }, 10000);

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  useEffect(() => {
    // Fetch product data from AsyncStorage
    const retrieveProductData = async () => {
      try {
        const productDataString = await AsyncStorage.getItem('@product_info');
        if (productDataString) {
          const products = JSON.parse(productDataString);
          setProductData(products); // Store all products
        } else {
          console.log('No product data found');
        }
      } catch (error) {
        console.error('Error retrieving product data:', error);
      }
    };

    // Fetch user data from AsyncStorage
    const retrieveUserData = async () => {
      try {
        const dataString = await AsyncStorage.getItem('@User:data');
        if (dataString) {
          const data = JSON.parse(dataString);
          setUserData(data);
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    retrieveProductData();
    retrieveUserData();
  }, []);

 

  const navigation = useNavigation();


  const handleBuyNow = async () => {
    try {
      // Store can count in AsyncStorage
      await AsyncStorage.setItem('@can_count', JSON.stringify(canCount));
      // Alert.alert('Success', 'Product added to cart!');
      // Navigate to the cart page if necessary
      navigation.navigate('Cart');
    } catch (error) {
      Alert.alert('Error', 'Failed to add product to cart.');
    }
  };

  return (
    <View className="bg-white h-full">
      <View className="mx-5 mt-12">
        <Text className="text-black text-2xl font-bold ">Home</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="mt-5 h-full ">
        <View className="">
          <View className="">
            <FlatList
              ref={flatListRef}
              data={imageData}
              renderItem={({item}) => (
                <View className="mx-auto" style={{width: width}}>
                  <Image source={item} className="h-36 w-full" />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />

            <TouchableOpacity
              onPress={handlePrev}
              className="absolute top-1/2 left-1 transform -translate-y-1/2 p-2 rounded-full bg-blue-500">
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              className="absolute top-1/2 right-1 transform -translate-y-1/2 p-2 rounded-full bg-blue-500">
              <Icon name="chevron-right" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {productData.length > 0 ? (
            productData.map((product) => (
              <View key={product.id} className="bg-primary-1 mx-7 py-2 rounded-xl shadow-sm shadow-black flex items-center justify-center mt-10 overflow-hidden ">
   
                <Image
                  source={{uri: product.images[0]?.src}} // Use optional chaining for safety
                  className="h-44 w-32 py-5 px-5 "
                />
                <Text className="text-black font-ummedium mt-2">
                  {product.name}
                </Text>
                {/* <Text className="text-black ">
                  {product.description.replace(/<\/?[^>]+(>|$)/g, "")}
                </Text> */}
                {/* <Text className="text-black font-bold">
                  Price: ₹{product.price}
                </Text> */}


              </View>
              
            ))
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}

          <View className="flex flex-row justify-center items-center mt-5 bg-gray-200 mx-auto rounded-md ">
            <TouchableOpacity
              onPress={() => setCanCount(canCount > 1 ? canCount - 1 : 1)}
              className="py-2 px-3 bg-primary-1 rounded-l-md">
              <Icon name="minus" size={24} color="gray" />
            </TouchableOpacity>
            <Text className="rounded-md px-5 py-2 text-center text-md font-umregular text-black">
              {canCount}
            </Text>
            <TouchableOpacity
             onPress={() => setCanCount(canCount + 1)}
              className="py-2 px-3 bg-primary-1 rounded-r-md">
              <Icon name="plus" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <Text className="text-black text-center mt-5">
            Each can for only ₹{productData.length > 0 ? productData[0].price : '0'}!
          </Text>

          <View className="flex flex-row mx-20 justify-between mt-5">
            <View className="py-3 px-3 border border-sky-500 bg-white rounded-md">
              <Text className="text-sky-500 font-umregular">
                Total cost{' '}
                <Text className="font-umbold">
                  ₹{canCount * (productData.length > 0 ? productData[0].price : 0)}
                </Text>{' '}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleBuyNow}
              className="py-3 px-3 bg-sky-500 rounded-md shadow-sm shadow-black">
              <Text className="text-white font-umregular">Buy Now</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handlePress}
            className="mt-8 flex flex-row justify-center items-center">
            <Icon name="phone" size={24} color="#87CEEB" />
            <Text className="text-sky-500 font-umbold ml-5">
              Contact us for more info
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mb-20"></View>
      </ScrollView>
    </View>
  );
}
