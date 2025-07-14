import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SendCrypto = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [formData, setFormData] = useState({
    address: '',
    amount: '',
    note: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your submission logic here (e.g., API call)
  };

  return (
    <View className="flex-1" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>

      <View className="flex-row items-center m-4">
        <Pressable onPress={() => router.back()}>
          <FontAwesome name="angle-left" size={28} color="black" className='me-5' />
        </Pressable>
        <Text className="text-2xl font-semibold ">Receive Bitcoin</Text>
      </View>

      <View
        className="bg-white p-4 rounded-xl m-4 shadow-sm border border-gray-100"
      >
        <View className="flex-row justify-between items-start">
          {/* Left Section */}
          <View className="flex-row items-start items-center">
            <Image
              source={{ uri: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png?1696501400' }}
              className="size-16 mr-3 rounded-full"
            />
            <View>
              <Text className="text-base font-semibold text-xl">
                {'Bitcoin'}
              </Text>
              <Text className="text-sm text-gray-400">{'BTC'}</Text>
            </View>
          </View>

          {/* Right Section */}
          <View className="items-end">
            <Text className="text-sm text-gray-400 mt-1">Available balance</Text>
            <Text className="text-xl font-semibold">2.23464 BTC</Text>
          </View>
        </View>
      </View>

      <View className='m-4 bg-white flex-1 p-4 justify-around rounded-md shadow-md'>
        <View className="gap-10">
          <View>
            <Text className="text-gray-700 mb-2 font-semibold">Enter Address</Text>
            <View className='flex-row items-center'>
              <TextInput
                className="flex-1 p-3 mr-3 border border-gray-300 rounded-md text-gray-700"
                value={formData.address}
                onChangeText={(text) => handleChange('address', text)}
                // placeholder="Enter your email"
                // keyboardType="email-address"
                autoCapitalize="none"
              />
              <MaterialCommunityIcons name="qrcode-scan" size={25} color="grey" />
            </View>
          </View>
          <View>
            <Text className="text-gray-700 mb-2 font-semibold">Amount</Text>
            <TextInput
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
              value={formData.amount}
              onChangeText={(text) => handleChange('amount', text)}
            // placeholder="Enter your name"
            />
          </View>
          <View>
            <Text className="text-gray-700 mb-2 font-semibold">Note</Text>
            <TextInput
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
              value={formData.note}
              onChangeText={(text) => handleChange('note', text)}
            // placeholder="Enter your name"
            />
          </View>
        </View>
        <View className='content-start'>
          <Text className="text-sm text-gray-500 my-2">Transaction fees: 0.0006 BTC</Text>
          <Text className="text-sm text-gray-500 my-2">Min: 0.00061 BTC - Max: 2.0006 BTC</Text>
        </View>
      </View>

      <View className='m-4'>
        <Text className='text-center text-sm'>* Block/Time will be calculated after the transaction</Text>
        <Text className='text-center text-sm'>is generated and broadcasted</Text>
      </View>

      <Pressable className="bg-blue-500 rounded-md py-5 m-4" onPress={handleSubmit}>
        <Text className="text-center text-white font-semibold text-lg">
          SEND BTC
        </Text>
      </Pressable>

    </View>
  )
}

export default SendCrypto