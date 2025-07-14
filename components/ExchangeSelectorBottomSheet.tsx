import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const ExchangeSelectorBottomSheet: React.FC<Props> = ({
    isOpen,
    onClose
}) => {
    const router = useRouter();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // Control modal visibility based on isOpen prop
    useEffect(() => {
        if (isOpen) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [isOpen]);

    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
        if (index === -1) {
            onClose(); // Call onClose when the modal is dismissed
        }
    }, [onClose]);

    const handlePress = (type: string) => {
        const url = type == 'send' ? '/sendCrypto' : '/receiveCrypto';
        bottomSheetModalRef.current?.dismiss();
        router.push(url);
    }

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                onChange={handleSheetChanges}
                enablePanDownToClose
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                        opacity={0.5} // Adjust the dimming level
                    />
                )}
            >
                <BottomSheetView className="flex-1 p-4 pb-20">
                    <View>
                        <Text className="text-xl font-semibold mb-4">Exchange</Text>
                        <TouchableOpacity
                            className={`flex-row  py-4 border-b border-gray-200`}
                            onPress={() => handlePress('send')}
                        >
                            <View className='mr-2'>
                                <MaterialCommunityIcons name="arrow-top-right" size={24} color="blue" />
                            </View>
                            <View>
                                <Text className="text-xl text-black font-semibold">Send Crypto</Text>
                                <Text className='text-xs indent-8'>Send Crypto from your wallet to another wallet</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`flex-row py-4`}
                            onPress={() => handlePress('receive')}
                        >
                            <View className='mr-2'>
                                <MaterialCommunityIcons name="arrow-bottom-left" size={24} color="blue" />
                            </View>
                            <View>
                                <Text className="text-xl text-black font-semibold">Receive Crypto</Text>
                                <Text className='text-xs indent-8'>Receive Crypto from other wallet to your wallet</Text>
                            </View>


                        </TouchableOpacity>

                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

export default ExchangeSelectorBottomSheet