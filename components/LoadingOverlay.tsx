// src/components/LoadingOverlay.tsx
import { RootState } from '@/store';
import React from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSelector } from 'react-redux';

const LoadingOverlay = () => {
    const isLoading = useSelector((state: RootState) => state.loading.globalLoading);
    const { width, height } = useWindowDimensions();

    if (!isLoading) return null;

    return (
        <View style={styles.overlay}>
            <Image source={require('@/assets/images/bitcoin-loading.gif')} width={width/2} height={width/2}/>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.76)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
});

export default LoadingOverlay;
