import CoinListItem from '@/components/CoinListItem';
import FilterTabs from '@/components/market/FilterTabs';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MarketScreen = () => {
  const insets = useSafeAreaInsets();
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [tab, setTab] = useState('all');
  const [showMarketModal, setShowMarketModal] = useState(false);
  const [marketChange, setMarketChange] = useState(0);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&sparkline=true&price_change_percentage=24h'
    );
    const json = await res.json();

    setCoins(json);
    setFilteredCoins(json);

    // Calculate market movement
    const totalChange = json.reduce((sum: any, coin: any) => sum + (coin.price_change_percentage_24h || 0), 0);
    const avgChange = totalChange / json.length;
    setMarketChange(avgChange);
  };


  const applyTabFilter = (selectedTab: string) => {
    setTab(selectedTab);
    if (selectedTab === 'gainer') {
      setFilteredCoins(coins.filter((c: any) => c.price_change_percentage_7d_in_currency > 0));
    } else if (selectedTab === 'loser') {
      setFilteredCoins(coins.filter((c: any) => c.price_change_percentage_7d_in_currency < 0));
    } else if (selectedTab === 'favourites') {
      // apply your favourites logic here
    } else {
      setFilteredCoins(coins);
    }
  };

  return (
    <View className='flex-1 m-4' style={{ top: insets.top }}>
      <View className="flex-row justify-between items-center mb-3">

        <View>
          <Text className="text-2xl font-semibold">
            Market is {marketChange < 0 ? 'down' : 'up'}{' '}
            <Text className={marketChange < 0 ? 'text-red-600' : 'text-green-600'}>
              {marketChange.toFixed(2)}%
            </Text>
          </Text>
          <Text className='text-sm'>In the past 24 hours</Text>
        </View>


        {/* <Text className="text-lg font-semibold">Market is down <Text className="text-red-600">-11.17%</Text></Text> */}
        <TouchableOpacity onPress={() => setShowMarketModal(true)}>
          <Text className="text-sm text-gray-600">Market: INR ▾</Text>
        </TouchableOpacity>
      </View>

      <FilterTabs selected={tab} onSelect={applyTabFilter} />

      <FlatList
        data={filteredCoins}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <CoinListItem item={item} />}
      />

      {/* <MarketSelectorModal
        visible={showMarketModal}
        onClose={() => setShowMarketModal(false)}
      /> */}
    </View>
  )
}

export default MarketScreen