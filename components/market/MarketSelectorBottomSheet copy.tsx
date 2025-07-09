import BottomSheet from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

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
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['35%'], []);
  const [tempSelection, setTempSelection] = useState(selectedMarket);

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleUpdate = () => {
    onSelect(tempSelection);
    onClose();
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      onClose={handleClose}
      enablePanDownToClose
    >
      <View style={styles.container}>
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
    </BottomSheet>
  );
};

export default MarketSelectorBottomSheet;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
    backgroundColor:'red'
  },
});
