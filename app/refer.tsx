import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ReferScreen = () => {
  const insets = useSafeAreaInsets();
  const router=useRouter();

  return (
    <View className='flex-1' style={{ top: insets.top, marginBottom: insets.bottom }}>

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

      <View className='m-4 bg-white shadow-md rounded-md p-4'>
        <Text className='text-lg text-blue-500'>Terms and Conditions Applied</Text>
      </View>
    </View>
  )
}

export default ReferScreen