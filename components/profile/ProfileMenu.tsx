import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';


const ProfileMenu = ({menuItems}:{menuItems:any}) => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }} >
        {menuItems.map((item:any, index:number) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between bg-white px-4 py-6 mb-3 rounded-xl shadow-sm"
            onPress={() => console.log(`${item.label} pressed`)}
          >
            <View className="flex-row items-center gap-4">
              {item.icon}
              <Text className="text-black  text-xl">{item.label}</Text>
            </View>
            <Feather name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
        ))}
      </ScrollView>
  )
}

export default ProfileMenu