import { hp, wp } from '@/helpers/common';
import { FontAwesome } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ReferScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const referralLink = "https://www.giottus.com/?refcode=XYZ123";

  const handleCopy = () => {
    Clipboard.setStringAsync(referralLink);
    Alert.alert("Copied!", "Referral link copied to clipboard");
  };

  return (
    <View className='flex-1 ' style={{ top: insets.top }}>

      <View className="flex-row items-center m-4">
        <Pressable onPress={() => router.back()}>
          <FontAwesome name="angle-left" size={28} color="black" className='me-5' />
        </Pressable>
        <Text className="text-2xl font-semibold ">Refer and Earn</Text>
      </View>

      <View className='m-4 bg-white shadow-md rounded-md p-4'>
        <Text className='text-xl font-semibold mb-3'>Referral</Text>
        <View className='flex-row justify-between mb-3'>
          <Text className='text-lg text-gray-500'>Total No of referral</Text>
          <Text className='text-lg font-semibold'>12</Text>
        </View>
        <View className='flex-row justify-between'>
          <Text className='text-lg text-gray-500'>Total No of Qualified referral</Text>
          <Text className='text-lg text-blue-500 font-semibold'>05</Text>
        </View>
      </View>

      <View className='m-4 bg-white shadow-md rounded-md p-4 items-center justify-evenly' style={{ minHeight: hp(60) }}>
        <Image
          source={require('@/assets/images/Group.png')}
          style={{ width: wp(20), height: wp(25) }}
        />
        <Text className='text-2xl font-semibold'>Refer and Earn Free Crytocurrency</Text>
        <Text className='text-lg text-gray-600 text-center'> Introducing Giottus Referral 2.0. As part of this new program we will be giving away upto 100% of our earning from your referral. And it does not stop there. You get a chance to win upto 10,000 free tokens. Refer, like, share and Earn.</Text>
        <View className="items-start">
          <Text className="text-lg font-semibold mb-2">Your Referral Link</Text>

          <View className="flex-row items-center border border-gray-300 rounded-md overflow-hidden">
            <TextInput
              value={referralLink}
              editable={false}
              selectTextOnFocus
              className="flex-1 p-3 text-md text-gray-700 w-full"
            />
            <Pressable
              onPress={handleCopy}
              className="bg-blue-500 px-4 py-2 me-2 rounded-md"
            >
              <Text className="text-white font-medium text-sm">Copy Code</Text>
            </Pressable>
          </View>
        </View>
        <Pressable className="bg-blue-500 rounded-md py-5 m-4 w-full">
          <Text className="text-center text-white font-semibold text-lg">
            SHARE NOW
          </Text>
        </Pressable>
        <Text className='text-lg text-blue-500'>Terms and Conditions Applied</Text>
      </View>

    </View>
  )
}

export default ReferScreen