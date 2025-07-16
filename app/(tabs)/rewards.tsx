import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RewardsScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className='flex-1' style={{ top: insets.top }}>

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
        <Text className='text-xl font-semibold mb-3'>Coupons</Text>
        <View className='flex-row justify-between mb-3'>
          <Text className='text-lg text-gray-500'>No.of Coupons Won</Text>
          <Text className='text-lg font-semibold'>06</Text>
        </View>
        <View className='flex-row justify-between mb-3'>
          <Text className='text-lg text-gray-500'>Tokens won from Spin so far</Text>
          <Text className='text-lg text-blue-500 font-semibold'>08</Text>
        </View>
        <View className='flex-row justify-between'>
          <Text className='text-lg text-gray-500'>Remaining Coupons to Spin</Text>
          <Text className='text-lg text-blue-500 font-semibold'>01</Text>
        </View>
      </View>

      <View className='m-4 p-8 rounded-md' style={{ backgroundColor: `${'#F59300'}`, gap: 20 }}>
        <Text className='text-white text-lg'>{'Refer and Earn'}</Text>
        <Text className='text-white text-2xl w-4/5'>{'Refer you Friend and Win Cryptocoins'}</Text>
        <Pressable onPress={() => router.push('/refer')}>
          <View className='bg-white w-1/3 rounded-lg p-3'>
            <Text className='text-center text-lg' style={{ color: '#F59300' }}>{'Refer Now'}</Text>
          </View>
        </Pressable>
        <Image
          source={require('@/assets/images/Group-102.png')}
          className='absolute bottom-10 right-0 size-40 '
        />
      </View>

      <View className='m-4 p-8 rounded-md' style={{ backgroundColor: `${'#F50062'}`, gap: 20 }}>
        <Text className='text-white text-lg'>{'Rewards'}</Text>
        <Text className='text-white text-2xl w-4/5'>{'Spin Wheel & Win Free Tokens!'}</Text>
        <Pressable onPress={() => router.push('/spinWheel')}>
          <View className='bg-white w-1/3 rounded-lg p-3'>
            <Text className='text-center text-lg' style={{ color: '#F50062' }}>{'Get Tokens'}</Text>
          </View>
        </Pressable>
        <Image
          source={require('@/assets/images/Group-103.png')}
          className='absolute bottom-5 right-5 size-40 '
        />
      </View>

    </View>
  )
}

export default RewardsScreen   