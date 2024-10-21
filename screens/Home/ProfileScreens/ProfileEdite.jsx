import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileEdite() {
  const [customerData, setCustomerData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const retrieveCustomerData = async () => {
      try {
        const dataString = await AsyncStorage.getItem('@customer_info');

        if (dataString) {
          const data = JSON.parse(dataString);
          setCustomerData(data);
          console.log(data);
        } else {
          console.log('No customer data found');
        }
      } catch (error) {
        console.log('Error retrieving customer data:', error);
      }
    };

    retrieveCustomerData();
  }, []);

  return (
    <View className="bg-white h-full">
      <TouchableOpacity
        className="mt-10 mx-5 flex flex-row items-center"
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-left" size={30} color="black" />
        <Text className="text-black font-umbold text-lg ml-3">Profile</Text>
      </TouchableOpacity>

      <View className="justify-center items-center relative">
        <View className="bg-white h-40 w-40 rounded-full top-5 border border-blue-200 shadow-sm shadow-black relative justify-center items-center">
          <Image
            source={require('../../../assets/profile.png')}
            className="h-36 w-36 py-5 px-5"
          />
          <View className="bg-primary-1 absolute h-10 w-10 rounded-full bottom-4 right-0 justify-center items-center border">
            <Icon name="pencil-outline" size={30} color="black" />
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="bg-white top-10 h-full px-5 py-2"
      >
        <Text className="text-black text-lg font-umbold">Profile Details</Text>
        <View className="flex flex-col mx-2 mt-5">
          <View className="mt-2 py-2">
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-6">
                <Icon name="account-circle-outline" size={25} color="gray" />
                <Text className="text-gray-500 font-ummedium text-md">
                  {customerData?.first_name ? customerData.first_name : '?'}{' '}
                  {customerData?.last_name ? customerData.last_name : '?'}
                </Text>
              </View>
            </View>
          </View>
          <View className="mt-2 py-2">
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-6">
                <Icon name="email-outline" size={25} color="gray" />
                <Text className="text-gray-500 font-ummedium text-md">
                  {customerData?.email ? customerData.email : '?'}
                </Text>
              </View>
            </View>
          </View>
          <View className="mt-2 py-2">
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-6">
                <Icon name="phone" size={25} color="gray" />
                <Text className="text-gray-500 font-ummedium text-md">
                  {customerData?.billing?.phone ? customerData.billing.phone : '?'}
                </Text>
              </View>
            </View>
          </View>
          <View className="mt-2 py-2">
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-6">
                <Icon name="map-marker-outline" size={25} color="gray" />
                <Text className="text-gray-500 font-ummedium text-md">
                  {customerData?.billing?.address_1 ? customerData.billing.address_1 : '?'}, {customerData?.billing?.postcode ? customerData.billing.postcode : '?'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text className="text-black text-lg font-umbold mt-5">Change Password</Text>
        <TouchableOpacity className="mt-6 py-2 ml-4">
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-3">
              <Icon name="lock-outline" size={20} color="gray" />
              <Text className="text-gray-500 font-ummedium">Change Password</Text>
            </View>
            <Icon name="chevron-right" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity 
        onPress={() => navigation.navigate('ProfileDetailsEdite')}
        className="py-3 px-3 mb-20 bg-sky-500 rounded-md shadow-sm shadow-black mx-5"
      >
        <Text className="text-white font-umbold text-center text-md">
          Edit Profile Details
        </Text>
      </TouchableOpacity>
    </View>
  );
}
