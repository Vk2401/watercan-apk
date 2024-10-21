import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  FlatList,
  Dimensions,
  Linking,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native'; // To navigate to another screen

export default function Address() {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const [address, setAddress] = useState('');


  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const dataString = await AsyncStorage.getItem('@User:data');

        if (dataString) {
          const data = JSON.parse(dataString); // Convert from string to object
          setUserData(data);
          console.log(data);
        } else {
          console.log('No data found');
        }
      } catch (error) {
        console.log('Error', 'An error occurred while retrieving user data.');
      }
    };

    retrieveUserData();
  }, []);

  return (
    <View className="bg-white h-full">
      <TouchableOpacity
        className=" mt-10 mx-5 flex flex-row items-center"
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={30} color="black" />

        <Text className="text-black font-umbold  text-lg ml-3">Address</Text>
      </TouchableOpacity>


      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="bg-white top-10 h-full  px-5 py-2">
          <Text className="text-black font-umbold mb-2">Address</Text>
        <View className=" flex flex-col mx-2 ">
          <View className="py-2">
            <View className="felx flex-row items-center justify-between">
              <View className="felx flex-row items-center  gap-6">
                <Icon name="map-marker-outline" size={25} color="gray" />
                <Text className="text-gray-500 font-ummedium text-md">
                  {userData?.address ? userData.address : '?'}{' '}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text className="text-black font-umbold mt-5">change Address</Text>

        <View className="flex flex-row relative mt-4">
                <TextInput
                  className=" rounded-md w-full bg-gray-200 py-3 pl-5 font-umregular text-black h-20"
                  placeholder="Enter New Address"
                  value={address}
                  onChangeText={setAddress}
                /> 
        </View>
  
      </ScrollView>
      <TouchableOpacity className=" py-3 px-3 mb-20 bg-sky-500 rounded-md shadow-sm shadow-black mx-5">
              <Text className=" text-white font-umbold text-center text-md ">
               Edit Profile Details
              </Text>
      </TouchableOpacity>
    </View>
  );
}
