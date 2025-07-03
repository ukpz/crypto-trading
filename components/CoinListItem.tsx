import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import { wp } from "../helpers/common";

const CoinListItem = ({ item }: { item: any }) => {

    const router = useRouter();


    const Sparkline = ({ data, color }: { data: any, color: any }) => (
        <LineChart
            style={{ height: wp(10), width: wp(15) }}
            data={data}
            svg={{ stroke: color, strokeWidth: 2 }}
            contentInset={{ top: 5, bottom: 5 }}
        />
    );
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
                <Sparkline data={item.sparkline_in_7d.price} color={item.price_change_percentage_24h >= 0 ? 'green' : 'red'} />
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