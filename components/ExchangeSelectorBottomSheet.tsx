import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    isOpen: boolean;
}

const ExchangeSelectorBottomSheet: React.FC<Props> = ({
    isOpen
}) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // const [tempSelection, setTempSelection] = useState(exchangeType);

    // Sync tempSelection with selectedMarket when it changes
    // useEffect(() => {
    //     setTempSelection(exchangeType);
    // }, [exchangeType]);

    // Control modal visibility based on isOpen prop
    useEffect(() => {
        if (isOpen) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [isOpen]);

    // Handle sheet changes (e.g., when user swipes to dismiss)
    // const handleSheetChanges = useCallback((index: number) => {
    //     // console.log('handleSheetChanges', index);
    //     if (index === -1) {
    //         onClose(); // Call onClose when the modal is dismissed
    //     }
    // }, [onClose]);

    // Handle Update Market button press
    // const handleUpdate = () => {
    //     onSelect(tempSelection); // Update selectedMarket in parent
    //     onClose(); // Close the modal
    // };

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                // onChange={handleSheetChanges}
                enablePanDownToClose
            >
                <BottomSheetView className="flex-1 p-4 pb-20">
                    <View>
                        <Text className="text-xl font-semibold mb-4">Markets</Text>
                        <TouchableOpacity
                            className={`flex-row items-center justify-between py-3`}
                            onPress={() => {}}
                        >
                            <Text className="text-lg text-black">Send Crypto</Text>

                        </TouchableOpacity>
                        
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

export default ExchangeSelectorBottomSheet