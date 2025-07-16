import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WithdrawScreen = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [amount, setAmount] = useState('0');
    const [manualInputStarted, setManualInputStarted] = useState(false);
    const balance = 35849;
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'clear'];

    const setPercent = (percent: number) => {
        const newAmount = ((balance * percent) / 100).toFixed(0);
        setAmount(newAmount);
        setManualInputStarted(false); // disable manual chaining
    };

    const handleKeyPress = (key: string) => {
        if (key === 'clear') {
            setAmount((prev) => {
                const updated = prev.slice(0, -1);
                return updated === '' ? '0' : updated;
            });
            return;
        }

        if (!manualInputStarted) {
            // If coming from percent preset, start fresh
            if (key === '.') {
                setAmount('0.');
            } else {
                setAmount(key);
            }
            setManualInputStarted(true);
            return;
        }

        // Prevent multiple dots
        if (key === '.' && amount.includes('.')) return;

        // Prevent starting with multiple zeros
        if (amount === '0' && key !== '.') {
            setAmount(key);
            return;
        }

        setAmount((prev) => prev + key);
    };

    return (
        <View className="flex-1 justify-between" style={{ marginTop: insets.top, marginBottom: insets.top }}>
            {/* Header */}
            <View className="flex-row items-center m-4">
                <Pressable onPress={() => router.back()}>
                    <FontAwesome name="angle-left" size={28} color="black" className='me-5' />
                </Pressable>
                <Text className="text-2xl font-semibold mx-4">Withdraw INR</Text>
                
            </View>

            {/* Amount Section */}
            <View className="m-4">
                <Text className="text-center text-gray-500 text-sm mb-2">Enter Amount in INR</Text>
                <Text className="text-center text-5xl font-semibold mb-8">₹{amount}</Text>
                <Text className="text-center text-gray-500 text-sm mb-6">
                    Min ₹100 - Max ₹10,00,000
                </Text>
                <Text className="text-center text-gray-600 text-base font-bold mb-3">
                    Current Balance: ₹{balance.toLocaleString()}
                </Text>

                {/* Percent Buttons */}
                <View className="flex-row flex-wrap justify-center mt-4 gap-2">
                    {[0, 10, 25, 50, 75, 100].map((p) => (
                        <Pressable
                            key={p}
                            onPress={() => setPercent(p)}
                            className="px-4 py-1 border border-gray-300 rounded-full"
                        >
                            <Text className="text-gray-600 text-sm">{p}%</Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            {/* Keypad */}
            <View className='m-4'>
                <View className="flex-row flex-wrap">
                    {keys.map((key, index) => (
                        <View
                            key={index}
                            className="w-1/3 justify-center items-center"
                        >
                            <Pressable
                                className='p-8 aspect-square'
                                onPress={() => handleKeyPress(key)}
                                style={({ pressed }) => ({
                                    backgroundColor: pressed ? '#f0f0f0' : 'red',
                                })}>
                                {key === 'clear' ? (
                                    <Ionicons name="backspace-outline" size={26} color="black" />
                                ) : (
                                    <Text className="text-3xl font-bold text-center">{key}</Text>
                                )}
                            </Pressable>
                        </View>
                    ))}
                </View>

                {/* Preview Button */}
                <Pressable className="bg-blue-600 rounded-md py-5">
                    <Text className="text-center text-white font-semibold text-base">
                        WITHDRAW INR
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

export default WithdrawScreen