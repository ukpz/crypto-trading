// src/components/LoadingOverlay.tsx
import { wp } from '@/helpers/common';
import { RootState } from '@/store';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSelector } from 'react-redux';

const LoadingOverlay = () => {
    const isLoading = useSelector((state: RootState) => state.loading.globalLoading);
    const { width, height } = useWindowDimensions();

    if (!isLoading) return null;

    return (
        <View style={styles.overlay}>
            <LottieView
                source={require('../assets/loader.json')}
                autoPlay
                loop
                style={{ width: wp(50), height: wp(50) }}
            />
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
