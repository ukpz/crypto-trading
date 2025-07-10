import React from 'react'
import { Image, View } from 'react-native'

const LoadingComponent = () => {
  return (
    <View className='flex-1 bg-white justify-center align-center'>
      <Image source={require('@/assets/images/bitcoin-loading.gif')}/>
    </View>
  )
}

export default LoadingComponent