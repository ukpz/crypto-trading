import TrandingCoins from '@/components/TrandingCoins';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 m-4 gap-9" style={{ top: insets.top }}>
      <View className='p-8 rounded-md' style={{ backgroundColor: `${'#0063F5'}`, gap: 20 }}>
        <Text className='text-white text-lg'>{'Welcome Agilan,'}</Text>
        <Text className='text-white text-2xl w-4/5'>{'Make your first investment today'}</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            Toast.show({
              type: 'success', // or 'error', 'info'
              text1: 'Transaction Successful',
              text2: 'You bought 1 BTC at ₹40,00,000',
            });
          }}
          className='bg-white w-1/3 rounded-lg p-3'
        >
          <Text className='text-center text-lg' style={{ color: '#0063F5' }}>{'Invest Today'}</Text>
        </TouchableOpacity>

        <Image
          source={require('@/assets/images/Group-101.png')}
          className='absolute bottom-0 right-5 size-40 '
        />
      </View>
      <TrandingCoins />
    </View>
  )
}

export default HomeScreen
