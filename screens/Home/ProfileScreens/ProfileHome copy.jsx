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
  StatusBar
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native'; // To navigate to another screen

export default function ProfileHome() {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();


  const handlePress = () => {
    Linking.openURL('tel:9080177542');
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@User:data');
              navigation.navigate('Splash');
            } catch (error) {
              console.error('Error clearing AsyncStorage:', error);
            }
          }
        }
      ],
      { cancelable: true }
    );
  };


  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const dataString = await AsyncStorage.getItem('@User:data');

        if (dataString) {
          const data = JSON.parse(dataString); // Convert from string to object
          setUserData(data);
        //   console.log(data);
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
      <View className="bg-sky-500 mx-1  rounded-full absolute -top-[75vh] -left-[25vh] w-[100vh] h-[100vh]"></View>
      <View className="justify-center items-center relative">
        <View className="bg-white h-40 w-40 rounded-full top-20 border border-blue-200 shadow-sm shadow-black relative justify-center items-center">
        <Image
              source={require('../../../assets/profile.png')}
              className="h-36 w-36 py-5 px-5 "
            />
          <View className="bg-primary-1 absolute h-10 w-10 rounded-full bottom-4 right-0 justify-center items-center border">
            <Icon name="pencil-outline" size={30} color="black" />
          </View>
        </View>
        <View className="top-24 ">
          <Text className="text-black font-ummedium text-center">
            {userData?.name ? userData.name : '?'}{' '}
          </Text>
          <Text className="text-gray-500 font-umregular text-center">
            {userData?.mailid ? userData.mailid : '?'}{' '}
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="bg-white top-28 h-full flex flex-col px-3 py-2">
        <TouchableOpacity onPress={() => navigation.navigate('ProfileEdite')}  className="mt-2 py-2">
          <View className="felx flex-row items-center justify-between">
          <View className="felx flex-row items-center gap-3">
            <Icon name="account-circle-outline" size={25} color="black" />
            <Text className="text-black font-ummedium ">Profile</Text>
          </View>
            <Icon name="chevron-right" size={20} color="black" />    
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="mt-2 py-2">
          <View className="felx flex-row items-center justify-between">
          <View className="felx flex-row items-center gap-3">
            <Icon name="package-variant-closed" size={25} color="black" />
            <Text className="text-black font-ummedium">My Orders</Text>
          </View>
            <Icon name="chevron-right" size={20} color="black" />    
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Address')} className="mt-2 py-2">
          <View className="felx flex-row items-center justify-between">
          <View className="felx flex-row items-center gap-3">
            <Icon name="map-marker-outline" size={25} color="black" />
            <Text className="text-black font-ummedium">My Address</Text>
          </View>
            <Icon name="chevron-right" size={20} color="black" />    
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="mt-2 py-2 ml-1">
          <View className="felx flex-row items-center justify-between">
          <View className="felx flex-row items-center gap-3">
            <Icon name="account-details-outline" size={23} color="black" />
            <Text className="text-black font-ummedium">Help & Support</Text>
          </View>
            <Icon name="chevron-right" size={20} color="black" />    
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="mt-2 py-2 ml-1">
          <View className="felx flex-row items-center justify-between">
          <View className="felx flex-row items-center gap-3">
            <Icon name="account-lock-outline" size={20} color="black" />
            <Text className="text-black font-ummedium">Privacy Policy</Text>
          </View>
            <Icon name="chevron-right" size={20} color="black" />    
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="mt-2 py-2 ml-1">
          <View className="felx flex-row items-center justify-between">
          <View className="felx flex-row items-center gap-3">
            <Icon name="qrcode-edit" size={20} color="black" />
            <Text className="text-black font-ummedium">Referaral Code</Text>
          </View>
            <Icon name="chevron-right" size={20} color="black" />    
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} className="mt-2 py-2 ml-1">
          <View className="felx flex-row items-center justify-between">
          <View className="felx flex-row items-center gap-3">
            <Icon name="phone" size={20} color="black" />
            <Text className="text-black font-ummedium">Contact Us</Text>
          </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} className="mt-2 py-2 ml-1">
          <View className="felx flex-row items-center justify-between">
          <View className="felx flex-row items-center gap-3">
            <Icon name="logout" size={20} color="black" />
            <Text className="text-black font-ummedium">Logout</Text>
          </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
