import { hp, wp } from '@/helpers/common';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const Login = ({ setLogin }: { setLogin: any }) => {
    const insets = useSafeAreaInsets();

    return (
        <View className='flex-1'>
            {/* <StatusBar style="light" /> */}
            <Image source={require('../assets/images/login-bg.jpg')}
                style={styles.bgImage}
                resizeMode="cover"
            />

            <Animated.View entering={FadeInDown.duration(600)} className='flex-1'>
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'white', 'white']}
                    style={styles.gradient}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.8 }}
                />

                <View style={[styles.contentContainer, { marginBottom: insets.top }]} >
                    <Animated.Text entering={FadeInDown.delay(400).springify()} style={styles.title}>Bitnova</Animated.Text>
                    <Animated.Text entering={FadeInDown.delay(500).springify()} style={styles.subtitle}>Ignite Your Crypto Journey</Animated.Text>

                    <View className='w-full p-4 gap-5'>
                        <Animated.View entering={FadeInDown.delay(600).springify()} >
                            <TouchableOpacity className='py-5 rounded-md bg-blue-500 flex-row items-center justify-evenly' onPress={()=>setLogin(true)}>
                                <Text style={styles.startText}>Login with Google</Text>
                                <FontAwesome name="google" size={24} color='#4961B8' className='bg-white p-1 rounded-md' />
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(700).springify()}>
                            <TouchableOpacity className='py-5 rounded-md bg-blue-500 flex-row items-center justify-evenly' onPress={()=>setLogin(true)}>
                                <Text style={styles.startText}>Login with Facebook</Text>
                                <FontAwesome name="facebook" size={24} color='#4961B8' className='bg-white p-1 px-2 rounded-md ' />
                            </TouchableOpacity>
                        </Animated.View>
                    </View>

                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    bgImage: {
        width: wp(100),
        height: hp(100),
        position: 'absolute'
    },
    gradient: {
        width: wp(100),
        height: hp(65),
        position: 'absolute',
        bottom: 0
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 14,
    },
    title: {
        fontSize: hp(7),
        color: 'rgba(10,10,10,0.9)',
        fontWeight: '700'
    },
    subtitle: {
        fontSize: hp(2),
        letterSpacing: 1,
        marginBottom: 10,
        fontWeight: '500'
    },
    startText: {
        color: '#fff',
        fontSize: wp(5),
        fontWeight: '500',
        letterSpacing: 1
    }
})

export default Login