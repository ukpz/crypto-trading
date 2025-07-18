import PageHeader from '@/components/coinDetails/PageHeader';
import ExchangeSelectorBottomSheet from '@/components/ExchangeSelectorBottomSheet';
import { transformToChartPoints } from '@/helpers/crypto';
import { startLoading, stopLoading } from '@/store/loadingSlice';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-wagmi-charts';
import { useDispatch } from 'react-redux';
import { wp } from "../helpers/common";


const timeRanges = [
    { label: '1H', type: 'binance', interval: '1m', limit: 60 },
    { label: '24H', type: 'binance', interval: '1h', limit: 24 },
    { label: '1W', type: 'coingecko', days: '7' },
    { label: '1M', type: 'coingecko', days: '30' },
    { label: '6M', type: 'coingecko', days: '180' },
    { label: '1Y', type: 'coingecko', days: '365' },
    // { label: 'All', type: 'coingecko', days: 'max' },
];


const CoinDetailsScreen = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { coinId } = useLocalSearchParams();
    const [priceData, setPriceData] = useState<number[]>([]);
    const [coinDetails, setCoinDetails] = useState<any>(null);
    // const [coinDetails, setCoinDetails] = useState<any>(dummyCoinDetails);
    const [loading, setLoading] = useState(true);
    const [selectedRange, setSelectedRange] = useState(0);
    const [usdtToInr, setUsdtToInr] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [exchangeType, setExchangeType] = useState('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const fetchUSDTtoINR = async () => {
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=inr`);
        const json = await res.json();
        setUsdtToInr(json?.tether?.inr || 83); // fallback INR rate
    };


    const fetchChartData = async (range: any, coinInfo: any) => {
        if (range.type === 'binance') {
            if (!coinInfo?.symbol) {
                console.warn("⚠️ Symbol not available for Binance data.");
                return;
            }

            const symbol = `${coinInfo.symbol.toUpperCase()}USDT`;
            console.log('📊 Fetching Binance chart for symbol:', symbol);

            try {
                const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${range.interval}&limit=${range.limit}`);
                const json = await res.json();
                const closes = json.map((entry: any[]) =>
                    usdtToInr ? parseFloat(entry[4]) * usdtToInr : parseFloat(entry[4])
                );
                setPriceData(closes);
            } catch (error) {
                console.error('Binance chart error:', error);
                setPriceData([]);
            }
        } else if (range.type === 'coingecko') {
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&days=${range.days}`);
                const json = await res.json();
                const priceArr = json?.prices?.map((p: any) => p[1]) || [];
                setPriceData(priceArr);
            } catch (error) {
                console.error('CoinGecko chart error:', error);
                setPriceData([]);
            }
        }
    };


    const fetchCoinDetails = async () => {
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true`);
            const json = await res.json();
            setCoinDetails(json);
            console.log('fetchCoinDetails completed');
            return json; // ✅ important
        } catch (error) {
            console.error('❌ Failed to fetch coin details:', error);
            return null;
        }
    };

    useEffect(() => {
        const selected = timeRanges[selectedRange];
        dispatch(startLoading());

        const fetchAllData = async () => {
            try {
                const coinInfo = await fetchCoinDetails();
                if (!coinInfo || !coinInfo.symbol) {
                    console.warn('⚠️ Invalid coin info:', coinInfo);
                    return;
                }

                if (selected.type === 'binance') {
                    await fetchUSDTtoINR();
                }

                await fetchChartData(selected, coinInfo); // ✅ pass coinInfo here
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                dispatch(stopLoading());
            }
        };

        fetchAllData();
    }, [selectedRange]);


    if (!coinDetails || !coinDetails.market_data || priceData.length < 1) return null;

    try {
        var price = coinDetails?.market_data?.current_price?.inr ?? 0;
        var priceChange24h = coinDetails?.market_data?.price_change_24h_in_currency?.inr ?? 0;
        var priceChange24hPercent = coinDetails?.market_data?.price_change_percentage_24h_in_currency?.inr ?? 0;
        var color = priceChange24h >= 0 ? 'green' : 'red';
    } catch (error) {
        console.error("💥 Error extracting price data", error);
    }



    return (
        <SafeAreaView className='flex-1 justify-between'>

            <PageHeader details={coinDetails} handleOpenModal={handleOpenModal} />

            <View className='flex-row items-baseline m-4'>
                <Text className="text-3xl font-bold me-4">₹{price.toLocaleString()}</Text>
                <Text className="text-2xl" style={{ color: priceChange24h >= 0 ? 'green' : 'red' }}>
                    {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)} ({priceChange24hPercent.toFixed(2)}%)
                </Text>
            </View>

            <View>
                <LineChart.Provider data={transformToChartPoints(priceData)}>
                    <LineChart height={200}>
                        <LineChart.Path color="#0063F5" width={2} />
                        <LineChart.CursorCrosshair>
                            {/* <LineChart.Dot /> */}
                            <LineChart.Tooltip />
                        </LineChart.CursorCrosshair>
                    </LineChart>
                </LineChart.Provider>
                <View className="flex-row justify-between flex-wrap m-4">
                    {timeRanges.map((tr, index) => (
                        <TouchableOpacity
                            key={tr.label}
                            onPress={() => setSelectedRange(index)}
                            className={`px-3 py-1 rounded-full border border-gray-300  ${selectedRange === index ? 'bg-blue-100' : ''}`}
                        >
                            <Text className="text-black ">{tr.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View>
                <View className="flex-row  items-center p-4 bg-white shadow-xl rounded-xl m-4 mb-1 gap-4">
                    <Image source={{ uri: coinDetails.image.large }} style={{ width: wp(10), height: wp(10) }} />

                    <View>
                        <Text className="text-xl text-black font-semibold">{coinDetails.name}</Text>
                        <Text className="text-xs text-gray-500">0.00 {coinDetails.symbol.toUpperCase()}</Text>
                    </View>
                    <View className='ms-auto'>
                        <Text className="text-md text-black font-semibold">₹00.00</Text>
                        <Text className="text-xs text-gray-500 text-right">0.00%</Text>
                    </View>
                </View>

                <TouchableOpacity className="flex-row p-4 bg-white shadow-xl rounded-xl m-4 mb-10" onPress={() => router.push('/transactions' as any)}>
                    <Text className="text-xl text-black font-medium">Transactions</Text>
                    <FontAwesome name="angle-right" size={28} className='ms-auto' />
                </TouchableOpacity>

                <View className="flex-row justify-between p-4 gap-4 bg-white">
                    <TouchableOpacity className="flex-1 bg-blue-600 py-4 rounded-md" onPress={() => router.push('/buy' as any)}>
                        <Text className="text-center text-white font-bold text-xl">BUY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-blue-600 py-4 rounded-md" onPress={() => router.push('/sell' as any)}>
                        <Text className="text-center text-white font-bold text-xl">SELL</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ExchangeSelectorBottomSheet
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </SafeAreaView>
    );
};



export default CoinDetailsScreen;
