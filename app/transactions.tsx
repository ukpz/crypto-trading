import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const transactions = [
  {
    id: '1',
    coin: 'Bitcoin',
    symbol: 'BTC',
    iconUrl: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png?1696501400',
    amount: 5.485,
    price: 24.39,
    total: 133.316,
    date: '27 May',
    time: '09:28 AM',
    status: 'Successfully Completed',
  },
  {
    id: '2',
    coin: 'Bitcoin',
    symbol: 'BTC',
    iconUrl: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png?1696501400',
    amount: 5.485,
    price: 24.39,
    total: 133.316,
    date: '27 May',
    time: '09:28 AM',
    status: 'Successfully Completed',
  },
];

const HistoryScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center m-4">
        <Pressable onPress={() => router.back()}>
          <FontAwesome name="angle-left" size={28} color="black" className='me-5' />
        </Pressable>
        <Text className="text-2xl font-semibold mx-8">Transactions</Text>
      </View>

      {/* Transaction List */}
      <ScrollView className=" m-4">
        {transactions.map((tx) => (
          <View
            key={tx.id}
            className="bg-white p-4 rounded-xl mb-4 shadow-sm border border-gray-100"
          >
            <View className="flex-row justify-between items-start">
              {/* Left Section */}
              <View className="flex-row items-start items-center">
                <Image
                  source={{ uri: tx.iconUrl }}
                  className="size-16 mr-3 rounded-full"
                />
                <View>
                  <Text className="text-base font-semibold text-xl">
                    {tx.coin} / <Text className="text-sm text-gray-400">{tx.symbol}</Text>
                  </Text>
                  <Text className="text-sm text-gray-600 mt-1">
                    Amount: {tx.amount} {tx.symbol}
                  </Text>
                  <Text className="text-sm text-gray-600 mt-1">
                    Price: ₹ {tx.price}
                  </Text>
                </View>
              </View>

              {/* Right Section */}
              <View className="items-end">
                <Text className="text-xl font-semibold">Total: ₹{tx.total}</Text>
                <Text className="text-sm text-gray-400 mt-1">{tx.date}, {tx.time}</Text>
                <Text className="text-sm text-green-600 mt-1">{tx.status}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HistoryScreen;
