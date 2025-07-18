import React from 'react'
import { Image, Text, View } from 'react-native'

const InfoCard = () => {
    return (
        <View className="bg-blue-600 rounded-xl items-center py-6">
            <Image
                source={{ uri: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg' }} // Replace with user avatar
                className="w-20 h-20 rounded-full mb-3"
            />
            <Text className="text-white text-xl font-bold mb-4">Agilan Senthil</Text>
            <Text className="text-white text-sm font-semobold">agilansenthilkumar@gmail.com</Text>
            <Text className="text-white text-sm font-semobold">+91 9444977118</Text>
        </View>
    )
}

export default InfoCard