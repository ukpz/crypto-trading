import FilterTabs from '@/components/market/FilterTabs';
import MarketSelectorBottomSheet from '@/components/market/MarketSelectorBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MarketScreen = () => {
  const insets = useSafeAreaInsets();
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [tab, setTab] = useState('all');
  const [showMarketModal, setShowMarketModal] = useState(false);
  const [marketChange, setMarketChange] = useState(0);
  const [marketCurrency, setMarketCurrency] = useState('inr');
  const [showSheet, setShowSheet] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);




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
    <GestureHandlerRootView>
      <View className='flex-1' style={{ top: insets.top }}>
        {/* <View className="flex-row justify-between items-center mb-3">

        <View>
          <Text className="text-2xl font-semibold">
            Market is {marketChange < 0 ? 'down' : 'up'}{' '}
            <Text className={marketChange < 0 ? 'text-red-600' : 'text-green-600'}>
              {marketChange.toFixed(2)}%
            </Text>
          </Text>
          <Text className='text-sm'>In the past 24 hours</Text>
        </View>


        <TouchableOpacity  >
          <Text className="text-sm text-gray-600">Market: INR ▾</Text>
        </TouchableOpacity>
      </View> */}

        {/* <MarketSelectorBottomSheet /> */}

        <FilterTabs selected={tab} onSelect={applyTabFilter} />

        {/* <FlatList
        data={filteredCoins}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <CoinListItem item={item} />}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 10,
        }}
      /> */}


        <MarketSelectorBottomSheet
          isOpen={showSheet}
          onClose={() => setShowSheet(false)}
          selectedMarket={marketCurrency}
          onSelect={(newMarket) => {
            setMarketCurrency(newMarket);
            // fetch again if needed
          }}
        />
        {/* <GestureHandlerRootView className='flex-1 justify-center bg-blue-300'>
      <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
          >
            <BottomSheetView className='flex-1'>
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
        </BottomSheetModal>
        </BottomSheetModalProvider>
        </GestureHandlerRootView> */}
      </View>
    </GestureHandlerRootView>
  )
}

export default MarketScreen