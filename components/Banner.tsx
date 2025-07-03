import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

const Banner = ({title,subtitle,color,image,btnText}:{title:string,subtitle:string,color:string,image:string,btnText:string}) => {
    const images: { [key: string]: any } = {
        'Group-101': require('../assets/images/Group-101.png'),
        'Group-102': require('../assets/images/Group-102.png'),
        'Group-103': require('../assets/images/Group-103.png'),
        // Add more images as needed
    };

    return (
        <View className='p-8 rounded-2xl' style={{ backgroundColor: `${color}`, gap: 20 }}>
            <Text className='text-white text-lg'>{title}</Text>
            <Text className='text-white text-2xl w-5/6'>{subtitle}</Text>
            <Pressable>
                <View className='bg-white w-1/3 rounded-lg p-3'>
                    <Text className='text-center text-lg' style={{ color }}>{btnText}</Text>
                </View>
            </Pressable>
            <Image
                 source={images[image] || require('@/assets/images/Group-101.png')}
                className='absolute bottom-0 right-0 size-40 '
            />
        </View>
    )
}

export default Banner