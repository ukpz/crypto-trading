import Banner from '@/components/Banner';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RewardsScreen = () => {
  const insets = useSafeAreaInsets();
  const router=useRouter();

  return (
    <View className='flex-1 m-4 gap-9' style={{ top: insets.top }}>
      <Banner
        title="Refer and Earn"
        subtitle="Refer you Friend and Win Cryptocoins"
        color="#F59300"
        image="Group-102"
        btnText='Refer Now'
       onPress={()=>router.push('/refer')}
      />
      <Banner
        title="Rewards"
        subtitle="Spin Wheel & Win Free Tokens!"
        color="#F50062"
        image="Group-103"
        btnText='Get Tokens'
        onPress={()=>router.push('/spinWheel')}
      />
    </View>
  )
}

export default RewardsScreen   