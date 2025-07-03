import CoinListItem from '@/components/CoinListItem';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import coinListData from "../../data/coinsListData";

const PortfolioScreen = () => {
  const { holdings, prices, sparklineData } = usePortfolioData();
  const insets = useSafeAreaInsets();

  const investedValue = 1618.75;
  const availableInr = 1589;
  const holdingValue = holdings.reduce((total: any, h: any) => {
    
    const price = prices[h.coinId]?.inr || 0;
    // console.log(price);
    return total + h.amount * price;
  }, 0);
  const gainPercent = ((holdingValue - investedValue) / investedValue) * 100;

  const renderItem = ({ item }: { item: any }) => (
    <CoinListItem item={item} />
  )

  return (
    <View className='flex-1 m-4' style={{ top: insets.top }}>

      {/* Portfolio Card */}
      <View className="bg-blue-600 rounded-2xl p-4 mb-5 gap-5">

        <Text className="text-white text-2xl font-medium">Portfolio</Text>

        <View>
          <Text className="text-white text-sm font-medium">Holding value</Text>
          <View className='flex-row gap-3 items-baseline'>
            <Text className="text-white text-3xl font-bold">
              ₹{holdingValue.toLocaleString('en-IN')}
            </Text>
            <Text className="text-green-300 font-semibold">
              +{gainPercent.toFixed(2)}%
            </Text>
          </View>
        </View>


        <View className="flex-row ">
          <View >
            <Text className="text-white text-xl">Invested value</Text>
            <Text className="text-white font-bold">₹{investedValue}</Text>
          </View>
          <View className='w-[2px] bg-white mx-8'></View>
          <View>
            <Text className="text-white text-xl">Available INR</Text>
            <Text className="text-white font-bold">₹{availableInr}</Text>
          </View>
        </View>
      </View>

      {/* Deposit & Withdraw */}
      <View className="flex-row gap-4 mb-8">
        <TouchableOpacity className="bg-blue-600 flex-1 py-3 rounded-md">
          <Text className="text-white text-center font-semibold">Deposit INR</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-blue-600 flex-1 py-3 rounded-md">
          <Text className="text-blue-600 text-center font-semibold">Withdraw INR</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-xl font-semibold mb-3 text-black">Your coins</Text>
      <FlatList
        data={coinListData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 10, // adds only safe space
        }}
      />
    </View>
  );
};

export default PortfolioScreen;
