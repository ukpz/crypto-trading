import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

type MarketOption = {
    label: string;
    value: 'inr' | 'btc' | 'usdt';
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    selectedMarket: string;
    onSelect: (value: string) => void;
}

const marketOptions: MarketOption[] = [
    { label: 'Indian - INR', value: 'inr' },
    { label: 'Bitcoin - BTC', value: 'btc' },
    { label: 'TetherUS - USDT', value: 'usdt' },
];


const MarketSelectorBottomSheet: React.FC<Props> = ({
    isOpen,
    onClose,
    selectedMarket,
    onSelect,
}) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [tempSelection, setTempSelection] = useState(selectedMarket);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handleUpdate = () => {
        onSelect(tempSelection);
        onClose();
    };

    return (
        <BottomSheetModalProvider>
            <Button
                onPress={handlePresentModalPress}
                title="Present Modal"
                color="blue"
            />
            <BottomSheetModal
                ref={bottomSheetModalRef}
                onChange={handleSheetChanges}
            >
                <BottomSheetView className='flex-1 p-8'>
                    <View>
                        <Text className="text-lg font-semibold mb-4">Select Market</Text>
                        {marketOptions.map((option) => {
                            const isSelected = tempSelection === option.value;

                            return (
                                <TouchableOpacity
                                    key={option.value}
                                    className="flex-row items-center justify-between py-3 border-b border-gray-200"
                                    onPress={() => setTempSelection(option.value)}
                                >
                                    <Text className="text-base text-black">{option.label}</Text>
                                    {isSelected && (
                                        <View className="w-4 h-4 rounded-full bg-blue-600" />
                                    )}
                                </TouchableOpacity>
                            );
                        })}

                        <TouchableOpacity
                            onPress={handleUpdate}
                            className="mt-6 bg-blue-600 py-3 rounded-xl items-center"
                        >
                            <Text className="text-white font-semibold text-base">Update Market</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

export default MarketSelectorBottomSheet;