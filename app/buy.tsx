import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BuyCoinScreen = () => {
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState('0');
  const balance = 10000;
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'clear'];

  const setPercent = (percent: number) => {
    const newAmount = ((balance * percent) / 100).toFixed(0);
    setAmount(newAmount);
  };

  const handleKeyPress = (key: string) => {
    if (key === 'clear') {
      setAmount('0');
    } else {
      setAmount((prev) => (prev === '0' ? key : prev + key));
    }
  };

  return (
    <View className='flex-1' style={{ top: insets.top }}>

      <View className="flex-row justify-between items-center mb-6">
        <Ionicons name="arrow-back" size={24} />
        <Text className="text-lg font-semibold">Buy Bitcoin (BTC)</Text>
        <Pressable className="bg-red-100 px-3 py-1 rounded-full">
          <Text className="text-red-500 font-semibold text-sm">SELL BTC</Text>
        </Pressable>
      </View>

      <Text className="text-center text-gray-500 text-sm">Enter Amount in INR</Text>
      <Text className="text-center text-4xl font-bold mt-1">₹{amount}</Text>
      <Text className="text-center text-gray-400 text-xs mt-1">
        Min ₹100 - Max ₹10,00,000
      </Text>
      <Text className="text-center text-gray-600 text-base mt-2">
        Current Balance: ₹{balance.toLocaleString()}
      </Text>

      <View className="flex-row flex-wrap justify-center mt-4 gap-2">
        {[0, 10, 25, 50, 75, 100].map((p) => (
          <Pressable
            key={p}
            onPress={() => setPercent(p)}
            className="px-4 py-1 border border-gray-300 rounded-full">
            <Text className="text-gray-600 text-sm">{p}%</Text>
          </Pressable>
        ))}
      </View>

        <View className="flex-row flex-wrap ">
          {keys.map((key, index) => (
            <Pressable
              key={index}
              onPress={() => handleKeyPress(key)}
              className="w-1/3 aspect-square border border-gray-100 bg-blue-500">
              {key === 'clear' ? (
                <Ionicons name="backspace-outline" size={24} color="black" />
              ) : (
                <Text className="text-2xl font-bold">{key}</Text>
              )}
            </Pressable>
          ))}
        </View>

      <Pressable className="bg-blue-600 mt-6 rounded-xl py-4">
        <Text className="text-center text-white font-semibold text-base">
          PREVIEW BUY
        </Text>
      </Pressable>

    </View>
  )
}

export default BuyCoinScreen