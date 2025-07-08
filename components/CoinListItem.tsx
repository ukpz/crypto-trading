import { transformSparkline } from '@/helpers/crypto';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';

const CoinListItem = ({ item }: { item: any }) => {

    const router = useRouter();
    const sparkline = item?.sparkline_in_7d?.price || [];
    const last24hPrices = sparkline.slice(-24);
    // const data = transformSparkline(item.sparkline_in_7d.price);
    const data = transformSparkline(last24hPrices);
    const isUp = item.price_change_percentage_7d_in_currency > 0;
    const strokeColor = isUp ? 'green' : 'red';

    return (
        <Pressable
            className="bg-white my-3 flex-row justify-between p-3 items-center rounded-xl shadow-md"
            onPress={() => router.push(`/coin?coinId=${item.id}`)}
        >
            <View className='flex-row gap-3'>
                <Image
                    source={{ uri: item?.image }}
                    className="size-16 rounded-full bg-blue-100"
                    resizeMode="contain"
                />
                <View >
                    <Text className="text-lg font-medium text-black">{item.name}</Text>
                    <Text className="text-lg font-medium text-black">{item.symbol?.toUpperCase()}</Text>
                </View>
            </View>
            <View>
                <LineChart.Provider data={data}>
                    <LineChart height={60} width={80}>
                        <LineChart.Path color={strokeColor} width={2} />
                    </LineChart>
                </LineChart.Provider>
            </View>
            <View>
                <Text className="text-lg font-medium text-black">₹{item.current_price}</Text>
                <Text className='text-right' style={{ color: item.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
                    {item.price_change_percentage_24h.toFixed(2)}%
                </Text>
            </View>
        </Pressable>
    )
}

export default CoinListItem