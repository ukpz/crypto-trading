import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import ExchangeSelectorBottomSheet from '../ExchangeSelectorBottomSheet'

const PageHeader = ({ details }: { details: any }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [exchangeType, setExchangeType] = useState('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <View className='flex-row items-center m-4'>
            <Pressable onPress={() => router.back()}>
                <FontAwesome name="angle-left" size={28} color="black" className='me-5' />
            </Pressable>
            <Image source={{ uri: details.image.small }} style={{ width: 30, height: 30 }} className='me-3' />
            <Text className="text-2xl text-black font-semibold me-1">{details.name}</Text>
            <Text className="text-xs text-gray-500 me-5"> ({details.symbol.toUpperCase()})</Text>
            <FontAwesome name="star-o" size={24} color="black" />
            <View className='ms-auto '>
                <TouchableOpacity className='flex-row items-center rounded-3xl py-2 px-4'
                    style={{
                        backgroundColor: '#eef5ff',
                    }}
                >
                    <View className='rounded-full p-1' style={{ backgroundColor: '#0063F5' }}>
                        <MaterialCommunityIcons name="swap-horizontal" size={10} color="#fff" />
                    </View>
                    <Pressable onPress={handleOpenModal}>
                        <Text className='text-md font-semibold ms-1' style={{ color: '#0063F5' }}>Exchange</Text>
                    </Pressable>
                </TouchableOpacity>
            </View>

            <ExchangeSelectorBottomSheet
                isOpen={isModalOpen}
            />
        </View>
    )
}

export default PageHeader