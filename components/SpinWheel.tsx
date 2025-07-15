import { wp } from '@/helpers/common';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    Modal,
    Pressable,
    Text,
    View,
} from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.8;
const CENTER = WHEEL_SIZE / 2;
const SEGMENT_ANGLE = 360 / 8;
const REWARDS = ['0 Token', '1 Token', '10 Token', '100 Token', '500 Token', '1000 Token', '5000 Token', '10000 Token'];
const colors = ['#FFA500', '#FFFFFF'];

const degreesToRadians = (deg: number) => (deg * Math.PI) / 180;

export default function SpinningWheel() {
    const [modalVisible, setModalVisible] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const spinValue = useRef(new Animated.Value(0)).current;

    const spin = () => {
        const spins = Math.floor(Math.random() * 3) + 4;
        const winnerIndex = Math.floor(Math.random() * REWARDS.length);
        const angleToStop = 360 * spins + (360 - winnerIndex * SEGMENT_ANGLE);

        Animated.timing(spinValue, {
            toValue: angleToStop,
            duration: 4000,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start(() => {
            setResult(REWARDS[winnerIndex]);
            setModalVisible(true);
        });
    };

    const rotation = spinValue.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    const renderSlices = () => {
        const elements = [];

        // Border ring
        elements.push(
            <Path
                key="border"
                d={`
        M ${CENTER},0
        A ${CENTER} ${CENTER} 0 1 1 ${CENTER - 0.1} 0
      `}
                fill="none"
                stroke="#007bff"
                strokeWidth={8}
            />
        );

        // Segments
        REWARDS.forEach((label, i) => {
            const startAngle = i * SEGMENT_ANGLE;
            const endAngle = (i + 1) * SEGMENT_ANGLE;
            const largeArc = endAngle - startAngle > 180 ? 1 : 0;

            const x1 = CENTER + CENTER * Math.cos(degreesToRadians(startAngle));
            const y1 = CENTER + CENTER * Math.sin(degreesToRadians(startAngle));
            const x2 = CENTER + CENTER * Math.cos(degreesToRadians(endAngle));
            const y2 = CENTER + CENTER * Math.sin(degreesToRadians(endAngle));
            const midAngle = startAngle + SEGMENT_ANGLE / 2;
            const labelX = CENTER + CENTER * 0.6 * Math.cos(degreesToRadians(midAngle));
            const labelY = CENTER + CENTER * 0.6 * Math.sin(degreesToRadians(midAngle));

            const path = `
      M ${CENTER} ${CENTER}
      L ${x1} ${y1}
      A ${CENTER} ${CENTER} 0 ${largeArc} 1 ${x2} ${y2}
      Z
    `;

            elements.push(
                <G key={i}>
                    <Path d={path} fill={colors[i % 2]} />
                    <SvgText
                        x={labelX}
                        y={labelY}
                        fontSize="14"
                        fill="#000"
                        fontWeight="bold"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        transform={`rotate(${midAngle} ${labelX} ${labelY})`}
                    >
                        {label}
                    </SvgText>
                </G>
            );
        });

        return elements;
    };


    return (
        <View className="flex-1 justify-center items-center bg-white">

            <View style={{ position: 'relative' }}>

                <View
                    style={{
                        position: 'absolute',
                        top: '43%', right: '38%',
                        zIndex: 10,
                        alignSelf: 'center',
                        transform: [{ rotate: '-20deg' }], // rotate slightly right
                    }}
                >
                    <Ionicons name="navigate" size={wp(15)} color="#007bff" />
                </View>


                <Animated.View
                    style={{
                        width: WHEEL_SIZE + 16, // Add padding for border visibility
                        height: WHEEL_SIZE + 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'red', // optional for debug
                    }}
                >
                    <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
                        {renderSlices()}
                    </Svg>
                </Animated.View>
            </View>
            {/* Pointer */}

            <Pressable className="bg-blue-500 rounded-md py-4 px-5 m-4" onPress={spin}>
                <Text className="text-center text-white font-semibold text-lg">
                    Click here to Spin
                </Text>
            </Pressable>

            <Modal visible={modalVisible} transparent animationType="fade">
                <View className="flex-1 justify-center items-center bg-black/60">
                    <View className="bg-white p-6 rounded-2xl items-center">
                        <Text className="text-xl font-bold mb-2">🎉 You won!</Text>
                        <Text className="text-lg mb-4">{result}</Text>
                        <Pressable
                            onPress={() => setModalVisible(false)}
                            className="bg-blue-600 px-6 py-2 rounded-full"
                        >
                            <Text className="text-white font-semibold">Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
