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
    View
} from 'react-native';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.8;
const BORDER_WIDTH = 24; // can be 10–16

// const CENTER = WHEEL_SIZE / 2;
const CENTER = (WHEEL_SIZE + BORDER_WIDTH) / 2;

const SEGMENT_ANGLE = 360 / 8;
const REWARDS = ['0 Token', '1 Token', '10 Token', '100 Token', '500 Token', '1000 Token', '5000 Token', '10000 Token'];
const colors = ['#FFA500', '#FFFFFF'];

const degreesToRadians = (deg: number) => (deg * Math.PI) / 180;

export default function SpinningWheel() {
    const [modalVisible, setModalVisible] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const spinValue = useRef(new Animated.Value(0)).current;
    const [totalSpin, setTotalSpin] = useState(0);


    const spin = () => {
        const spins = 5; // Number of full spins for animation
        const predefinedReward = '500 Token';
        const winnerIndex = REWARDS.findIndex(r => r === predefinedReward);

        if (winnerIndex === -1) {
            console.warn('Invalid reward value');
            return;
        }

        const segmentAngle = 360 / REWARDS.length;

        // Calculate mid-angle of the segment
        const rewardMidAngle = winnerIndex * segmentAngle + segmentAngle / 2;

        // Because SVG 0deg is at 3 o'clock, and pointer is at 270deg (top),
        // we want rewardMidAngle to land at 270
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
            setModalVisible(true);
        });
    };




    const rotation = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', `${totalSpin}deg`],
    });

    const renderSlices = () => {
        const elements = [];

        // Border ring
        elements.push(
            // <Circle
            //     cx={CENTER}
            //     cy={CENTER}
            //     r={CENTER}
            //     stroke="#007bff"
            //     strokeWidth={10}
            //     fill="transparent"
            // />
            <Circle
                key="border"
                cx={CENTER}
                cy={CENTER}
                r={CENTER - BORDER_WIDTH / 2.5} // prevents clipping
                stroke="#0057d8"
                strokeWidth={BORDER_WIDTH}
                fill="transparent"
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

        return elements;
    };


    return (
        <View className="flex-1 justify-center items-center bg-white">

            <View style={{ position: 'relative' }}>

                <View
                    style={{
                        position: 'absolute',
                        top: CENTER - wp(9),
                        left: CENTER - wp(7.9),
                        zIndex: 10,
                        // transform: [{ rotate: '2deg' }],
                    }}
                >
                    <MaterialCommunityIcons name="navigation" size={wp(15)} color="#007bff" />
                </View>

                {/* <Animated.View
                    style={{
                        width: WHEEL_SIZE,
                        height: WHEEL_SIZE,
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: [{ rotate: rotation }],
                    }}
                >
                    <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
                        {renderSlices()}
                    </Svg>
                </Animated.View> */}
                <Animated.View
                    style={{
                        // padding:'20',
                        width: WHEEL_SIZE + BORDER_WIDTH,
                        height: WHEEL_SIZE + BORDER_WIDTH,
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: [{ rotate: rotation }],
                    }}
                >
                    <Svg
                        width={WHEEL_SIZE + BORDER_WIDTH}
                        height={WHEEL_SIZE + BORDER_WIDTH}
                    >
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
