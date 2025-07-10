import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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

  // Sync tempSelection with selectedMarket when it changes
  useEffect(() => {
    setTempSelection(selectedMarket);
  }, [selectedMarket]);

  // Control modal visibility based on isOpen prop
  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isOpen]);

  // Handle sheet changes (e.g., when user swipes to dismiss)
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
    if (index === -1) {
      onClose(); // Call onClose when the modal is dismissed
    }
  }, [onClose]);

  // Handle Update Market button press
  const handleUpdate = () => {
    onSelect(tempSelection); // Update selectedMarket in parent
    onClose(); // Close the modal
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        enablePanDownToClose
      >
        <BottomSheetView className="flex-1 p-4 pb-20">
          <View>
            <Text className="text-xl font-semibold mb-4">Markets</Text>
            {marketOptions.map((option, index) => {
              const isSelected = tempSelection === option.value;

              return (
                <TouchableOpacity
                  key={option.value}
                  className={`flex-row items-center justify-between py-3 ${
                    marketOptions.length - 1 !== index ? 'border-b border-gray-200' : ''
                  }`}
                  onPress={() => setTempSelection(option.value)}
                >
                  <Text className="text-lg text-black">{option.label}</Text>
                  <View
                    className={`w-4 h-4 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-gray-300'}`}
                  />
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              onPress={handleUpdate}
              className="mt-6 bg-blue-600 py-4 rounded-lg items-center"
            >
              <Text className="text-white font-semibold text-lg">Update Market</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default MarketSelectorBottomSheet;