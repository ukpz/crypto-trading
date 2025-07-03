import Banner from '@/components/Banner';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RewardsScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className='flex-1 m-4 gap-9' style={{ top: insets.top }}>
      <Banner title="Refer and Earn" subtitle="Refer you Friend and Win Cryptocoins" color="#F59300" image="Group-102" btnText='Refer Now'/>
      <Banner title="Rewards" subtitle="Spin Wheel & Win Free Tokens!" color="#F50062" image="Group-103" btnText='Get Tokens'/>
    </View>
  )
}

export default RewardsScreen   