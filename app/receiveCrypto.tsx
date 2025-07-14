import { wp } from '@/helpers/common';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ReceiveCryptoScreen = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();


    return (
        <View className="flex-1" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>

            <View className="flex-row items-center m-4">
                <Pressable onPress={() => router.back()}>
                    <FontAwesome name="angle-left" size={28} color="black" className='me-5' />
                </Pressable>
                <Text className="text-2xl font-semibold ">Receive Bitcoin</Text>
            </View>

            <View className='m-4 bg-white flex-1 p-4 items-center justify-around rounded-md shadow-md'>
                <Image
                    source={{ uri: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png?1696501400' }}
                    className="size-16 mr-3 rounded-full"
                />
                <Text className='font-semibold' style={{ fontSize: wp(4) }}>Scan the QR code to get Receive address</Text>

                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g4S6hxQZ8NZlsSgE3vP0e77hTJUpg0DitA&s' }}
                    style={{ width: wp(50), height: wp(50) }}
                />

                <View className="flex-row items-center justify-center m-4">
                    <View className="flex-1 h-0.5 bg-gray-300" />
                    <Text className="mx-4 text-gray-500 font-medium">or</Text>
                    <View className="flex-1 h-0.5 bg-gray-300" />
                </View>

                <Text className='font-semibold' style={{ fontSize: wp(6) }}>Your Bitcoin Address</Text>
                <View className='p-2 border border-grey-300'>
                    <Text className='font-semibold font-lg' style={{ letterSpacing: 1 }}>34HuwzDnSwxVRNCoyFCpQnRBXV2sVVmGUY</Text>
                </View>
                <Pressable className="rounded-md py-5 bg-blue-300 border border-blue-500">
                    <Text className="text-center text-blue-500 font-semibold text-xl">
                        Copy Address
                    </Text>
                </Pressable>
            </View>

            <View className='m-4'>
                <Text className='text-center text-sm'>* Block/Time will be calculated after the transaction</Text>
                <Text className='text-center text-sm'>is generated and broadcasted</Text>
            </View>

            <Pressable className="bg-blue-500 rounded-md py-5 m-4">
                <Text className="text-center text-white font-semibold text-lg">
                    SHARE ADDRESS
                </Text>
            </Pressable>

        </View>
    )
}

export default ReceiveCryptoScreen