import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Feather name="home" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="portfolio"
                options={{
                    title: 'Portfolio',
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="pie-chart" color={color} />,
                }}
            />
            <Tabs.Screen
                name="rewards"
                options={{
                    title: 'Rewards',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="gift" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="market"
                options={{
                    title: 'Market',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chart-line" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Feather name="user" size={28} color={color} />,
                }}
            />
        </Tabs>
    )
}

export default TabLayout