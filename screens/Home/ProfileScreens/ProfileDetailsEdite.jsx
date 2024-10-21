import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileDetailsEdit() {
  const [userData, setUserData] = useState({
    name: '',
    mailid: '',
    phonenumber: '',
    address: '',
  });
  const navigation = useNavigation();

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const dataString = await AsyncStorage.getItem('@customer_info');

        if (dataString) {
          const data = JSON.parse(dataString);
          setUserData({
            name: `${data.first_name} ${data.last_name}`,
            mailid: data.email,
            phonenumber: data.billing?.phone || '',
            address: `${data.billing?.address_1 || ''}, ${data.billing?.postcode || ''}`,
          });
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

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('@customer_info', JSON.stringify(userData));
      Alert.alert('Success', 'Profile details updated successfully');
    } catch (error) {
      console.log('Error', 'An error occurred while saving user data.');
    }
  };

  return (
    <View className="bg-white h-full">
      <TouchableOpacity
        className="mt-10 mx-5 flex flex-row items-center"
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-left" size={30} color="black" />
        <Text className="text-black font-umbold text-lg ml-3">Profile Details Edit</Text>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="bg-white top-5 h-full px-5 py-2"
      >
        <View className="flex flex-col mx-2">
          <View className="py-2">
            <View className="flex">
              <View className="flex bg-white mx-2 py-2 px-2">
                <Text className="text-black font-umbold mb-2">Name</Text>
                <TextInput
                  className="text-gray-500 font-ummedium text-md bg-gray-200 px-3 rounded-md"
                  value={userData.name}
                  onChangeText={text => setUserData({ ...userData, name: text })}
                />
              </View>
            </View>
          </View>

          <View className="py-2">
            <View className="flex">
              <View className="flex bg-white mx-2 py-2 px-2">
                <Text className="text-black font-umbold mb-2">Email</Text>
                <TextInput
                  className="text-gray-500 font-ummedium text-md bg-gray-200 px-3 rounded-md"
                  value={userData.mailid}
                  onChangeText={text => setUserData({ ...userData, mailid: text })}
                />
              </View>
            </View>
          </View>

          <View className="py-2">
            <View className="flex">
              <View className="flex bg-white mx-2 py-2 px-2">
                <Text className="text-black font-umbold mb-2">Phone</Text>
                <TextInput
                  className="text-gray-500 font-ummedium text-md bg-gray-200 px-3 rounded-md"
                  value={userData.phonenumber}
                  onChangeText={text => setUserData({ ...userData, phonenumber: text })}
                />
              </View>
            </View>
          </View>

          <View className="py-2">
            <View className="flex">
              <View className="flex bg-white mx-2 py-2 px-2">
                <Text className="text-black font-umbold mb-2">Address</Text>
                <TextInput
                  className="text-gray-500 font-ummedium text-md bg-gray-200 px-3 rounded-md"
                  value={userData.address}
                  onChangeText={text => setUserData({ ...userData, address: text })}
                  multiline
                />
              </View>
            </View>
          </View>
        </View>
        <View className="mb-20"></View>
      </ScrollView>

      <TouchableOpacity
        className="py-3 px-3 mb-20 bg-sky-500 rounded-md shadow-sm shadow-black mx-5"
        onPress={handleSave}
      >
        <Text className="text-white font-umbold text-center text-md">Save</Text>
      </TouchableOpacity>
    </View>
  );
}
