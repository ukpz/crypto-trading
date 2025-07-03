import Banner from '@/components/Banner'
import TrandingCoins from '@/components/TrandingCoins'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HomeScreen = () => {
    const insets = useSafeAreaInsets();
  
  return (
    <View className="flex-1 m-4 gap-9" style={{top:insets.top}}>
        <Banner title="Welcome Agilan," subtitle="Make your first investment today" color="#0063F5" image="Group-101" btnText='Invest Today' />
        <TrandingCoins />
    </View>
  )
}

export default HomeScreen
