import { wp } from '@/helpers/common';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
import ConfettiCannon from 'react-native-confetti-cannon';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';


const { width } = Dimensions.get('window');
const REWARDS = ['0 Token', '1 Token', '10 Token', '100 Token', '500 Token', '1000 Token', '5000 Token', '10000 Token'];
const SEGMENT_ANGLE = 360 / REWARDS.length;
const COLORS = ['#FFA500', '#FFFFFF'];
const BORDER_WIDTH = 10;

const WHEEL_SIZE = width * 0.8;
const SVG_SIZE = WHEEL_SIZE + BORDER_WIDTH; // extra padding for stroke
const CENTER = SVG_SIZE / 2;

const degreesToRadians = (deg: number) => (deg * Math.PI) / 180;

export default function SpinningWheel() {
    const [modalVisible, setModalVisible] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const spinValue = useRef(new Animated.Value(0)).current;
    const [totalSpin, setTotalSpin] = useState(0);
    const [confettiVisible, setConfettiVisible] = useState(false);

    const spin = () => {
        const spins = 5;
        const predefinedReward = '500 Token';
        const winnerIndex = REWARDS.findIndex(r => r === predefinedReward);

        const rewardMidAngle = winnerIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
        const offsetToPointer = rewardMidAngle - 270;
        const angleToStop = spins * 360 - offsetToPointer;

        spinValue.setValue(0);
        setTotalSpin(angleToStop);

        Animated.timing(spinValue, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start(() => {
            setResult(REWARDS[winnerIndex]);
            setConfettiVisible(true);
            setModalVisible(true);
        });
    };

    const rotation = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', `${totalSpin}deg`],
    });

    const renderSlices = () => {
        const elements = [];

        // Segments
        REWARDS.forEach((label, i) => {
            const startAngle = i * SEGMENT_ANGLE;
            const endAngle = (i + 1) * SEGMENT_ANGLE;
            const largeArc = endAngle - startAngle > 180 ? 1 : 0;

            const x1 = CENTER + CENTER * Math.cos(degreesToRadians(startAngle));
            const y1 = CENTER + CENTER * Math.sin(degreesToRadians(startAngle));
            const x2 = CENTER + CENTER * Math.cos(degreesToRadians(endAngle));
            const y2 = CENTER + CENTER * Math.sin(degreesToRadians(endAngle));

            const path = `
        M ${CENTER} ${CENTER}
        L ${x1} ${y1}
        A ${CENTER} ${CENTER} 0 ${largeArc} 1 ${x2} ${y2}
        Z
      `;

            const midAngle = startAngle + SEGMENT_ANGLE / 2;
            const labelX = CENTER + CENTER * 0.6 * Math.cos(degreesToRadians(midAngle));
            const labelY = CENTER + CENTER * 0.6 * Math.sin(degreesToRadians(midAngle));

            elements.push(
                <G key={i}>
                    <Path d={path} fill={COLORS[i % 2]} />
                    <SvgText
                        x={labelX}
                        y={labelY}
                        fontSize={14}
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

        // Bold border (added last to appear on top)
        elements.push(
            <Circle
                key="border"
                cx={CENTER}
                cy={CENTER}
                r={CENTER - BORDER_WIDTH / 2}
                stroke="#007bff"
                strokeWidth={BORDER_WIDTH}
                fill="transparent"
            />
        );

        return elements;
    };

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <View style={{ position: 'relative' }}>
                {/* Pointer */}
                <View
                    style={{
                        position: 'absolute',
                        top: CENTER - wp(11),   // Half of icon size
                        left: CENTER - wp(10),  // Half of icon size
                        zIndex: 10,
                    }}
                >
                    <MaterialCommunityIcons name="navigation" size={wp(20)} color="#007bff" />
                </View>

                {/* Wheel */}
                <Animated.View
                    style={{
                        width: SVG_SIZE,
                        height: SVG_SIZE,
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: [{ rotate: rotation }],
                    }}
                >
                    <Svg width={SVG_SIZE} height={SVG_SIZE}>
                        {renderSlices()}
                    </Svg>
                </Animated.View>
            </View>

            <Pressable className="bg-blue-500 rounded-md py-4 px-5 m-4" onPress={spin}>
                <Text className="text-center text-white font-semibold text-lg">
                    Click here to Spin
                </Text>
            </Pressable>



            <Modal visible={modalVisible} transparent animationType="fade">
                <View className="flex-1 justify-center items-center bg-black/60">
                    {confettiVisible && (
                        <ConfettiCannon
                            count={150}
                            origin={{ x: width / 2, y: 0 }}
                            fallSpeed={3000}
                            explosionSpeed={300}
                            fadeOut
                            autoStart
                            onAnimationEnd={() => setConfettiVisible(false)}
                        />
                    )}
                    <View className="bg-neutral-200 p-6 rounded-2xl items-center rounded-lg">
                        <Text className="text-2xl font-bold mb-2">🎉 You won!</Text>
                        <Text className="text-lg mb-4 font-semibold">{result}</Text>
                        <Pressable
                            onPress={() => setModalVisible(false)}
                            className="bg-blue-600 px-6 py-2 rounded-md"
                        >
                            <Text className="text-white font-semibold">Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
