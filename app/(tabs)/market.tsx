import CoinListItem from '@/components/CoinListItem';
import FilterTabs from '@/components/market/FilterTabs';
import MarketSelectorBottomSheet from '@/components/market/MarketSelectorBottomSheet';
import { startLoading, stopLoading } from '@/store/loadingSlice';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';


const MarketScreen = () => {

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [tab, setTab] = useState('all');
  const [marketChange, setMarketChange] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState('inr');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectMarket = (value: string) => {
    setSelectedMarket(value); // Update selected market
    // Optionally close the modal after selection
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedMarket]);

  const fetchData = async () => {
    dispatch(startLoading());

    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedMarket}&sparkline=true&price_change_percentage=24h`
    );
    const json = await res.json();

    setCoins(json);
    setFilteredCoins(json);

    // Calculate market movement
    const totalChange = json.reduce((sum: any, coin: any) => sum + (coin.price_change_percentage_24h || 0), 0);
    const avgChange = totalChange / json.length;
    setMarketChange(avgChange);
    dispatch(stopLoading());
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
    <GestureHandlerRootView>
      <View className='flex-1' style={{ top: insets.top }}>

        <View className="flex-row justify-between items-start m-4">
          <View>
            <Text className="text-2xl font-semibold">
              Market is {marketChange < 0 ? 'down' : 'up'}{' '}
              <Text className={marketChange < 0 ? 'text-red-600' : 'text-green-600'}>
                {marketChange.toFixed(2)}%
              </Text>
            </Text>
            <Text className='text-sm'>In the past 24 hours</Text>
          </View>


          <TouchableOpacity>
            <Feather name="search" size={24} color={'grey'} />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center m-4">
          <View>
            <Text className="text-2xl font-semibold">
              Coins
            </Text>
          </View>

          <TouchableOpacity onPress={handleOpenModal} className='px-2 py-1 border border-gray-400 rounded-full'>
            <Text className="text-sm text-gray-600">Market-{selectedMarket.toUpperCase()} ▾</Text>
          </TouchableOpacity>
        </View>

        <View className='m-4'>
          <FilterTabs selected={tab} onSelect={applyTabFilter} />
        </View>

        <View className='m-4'>
          <FlatList
            data={filteredCoins}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => <CoinListItem item={item} />}
            contentContainerStyle={{
              paddingBottom: insets.bottom + 10,
            }}
          />
        </View>



        <MarketSelectorBottomSheet
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedMarket={selectedMarket}
          onSelect={handleSelectMarket}
        />

      </View>
    </GestureHandlerRootView>
  )
}

export default MarketScreen