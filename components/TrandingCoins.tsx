import trandingCoins from '@/data/coinsListData';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CoinListItem from './CoinListItem';


const TrandingCoins = () => {

    const insets = useSafeAreaInsets();

    const renderItem = ({ item }: { item: any }) => (
        <CoinListItem item={item}/>
    )


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
            />
        </View>
    )
}

export default TrandingCoins
