import CoinListItem from '@/components/CoinListItem';
import { useDebounce } from '@/hooks/useDebounce';
import { startLoading, stopLoading } from '@/store/loadingSlice';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

const SearchCoin = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const dispatch = useDispatch();
    const [coins, setCoins] = useState([]);
    const [selectedMarket, setSelectedMarket] = useState('inr');
    const [filteredCoins, setFilteredCoins] = useState([]);


    const fetchData = async () => {
        dispatch(startLoading());

        const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedMarket}&sparkline=true&price_change_percentage=24h`
        );
        const json = await res.json();

        setCoins(json);
        setFilteredCoins(json)
        dispatch(stopLoading());
    };

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (debouncedSearch !== '') {
            // console.log('Trigger search for:', debouncedSearch);
            setFilteredCoins(coins.filter((c: any) => c.name.includes(debouncedSearch)||c.symbol.includes(debouncedSearch) ));
        }else{
            setFilteredCoins(coins);
        }
    }, [debouncedSearch]);

    return (
        <View className='flex-1' style={{ top: insets.top,marginBottom: insets.bottom }}>

            <View className="flex-row items-center px-4 py-2 bg-gray-100">
                <View className="flex-row items-center flex-1 bg-white rounded-md border border-gray-300 px-3 py-2">
                    <Ionicons name="search" size={18} color="#999" />
                    <TextInput
                        placeholder="Search"
                        className="flex-1 ml-2 text-base text-black"
                        value={search}
                        onChangeText={setSearch}
                    />
                    {search.length > 0 && (
                        <Pressable onPress={() => setSearch('')}>
                            <Ionicons name="close" size={18} color="#666" />
                        </Pressable>
                    )}
                </View>

                <Pressable onPress={() => router.back()}>
                    <Text className="ml-4 text-blue-600 text-base">Cancel</Text>
                </Pressable>
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

        </View>
    )
}

export default SearchCoin