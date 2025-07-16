import trandingCoins from '@/data/coinsListData';
import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CoinListItem from './CoinListItem';


const TrandingCoins = () => {

    const insets = useSafeAreaInsets();
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(trandingCoins);

    const renderItem = ({ item }: { item: any }) => (
        <CoinListItem item={item} />
    )

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simulate fetch
        setTimeout(() => {
            setData([...data]);
            setRefreshing(false);
        }, 1500);
    }, [data]);


    return (
        <View className="flex-1" >
            <Text className="text-2xl font-semibold mb-3 text-black">Trending Coins</Text>
            <FlatList
                data={trandingCoins}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 10, // adds only safe space
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#007bff']} tintColor="#007bff"/>
                }
            />
        </View>
    )
}

export default TrandingCoins
