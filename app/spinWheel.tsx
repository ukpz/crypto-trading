import SpinningWheel from '@/components/SpinWheel';
import { hp } from '@/helpers/common';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SpinWheelScreen = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    return (
        <View className='flex-1 ' style={{ top: insets.top }}>

            <View className="flex-row items-center m-4">
                <Pressable onPress={() => router.back()}>
                    <FontAwesome name="angle-left" size={28} color="black" className='me-5' />
                </Pressable>
                <Text className="text-2xl font-semibold ">Spin wheel</Text>
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

            <View className='m-4 bg-white shadow-md rounded-md p-4 items-center justify-evenly' style={{ minHeight: hp(60) }}>
                <SpinningWheel/>
                {/* <Pressable className="bg-blue-500 rounded-md py-5 m-4">
                    <Text className="text-center text-white font-semibold text-lg">
                        Click here to Spin
                    </Text>
                </Pressable> */}

                <Text className='text-md text-gray-600 text-center'>Free Tokens will be instantly credited to your Giottus Account when you win. You can spin only once with one coupon. So you can come back and try your luck !</Text>
            </View>
        </View>
    )
}

export default SpinWheelScreen