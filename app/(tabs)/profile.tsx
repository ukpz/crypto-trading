import { Entypo, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();

  const menuItems = [
    { label: 'History', icon: <Ionicons name="time-outline" size={24} color="#0063F5" /> },
    { label: 'Bank Details', icon: <FontAwesome5 name="university" size={22} color="#0063F5" /> },
    { label: 'Notifications', icon: <Ionicons name="notifications-outline" size={24} color="#0063F5" /> },
    { label: 'Security', icon: <MaterialIcons name="security" size={24} color="#0063F5" /> },
    { label: 'Help and Support', icon: <Entypo name="help-with-circle" size={24} color="#0063F5" /> },
    { label: 'Terms and Conditions', icon: <Feather name="file-text" size={24} color="#0063F5" /> },
  ];


  return (
    <View className='flex-1 m-4 gap-9' style={{ top: insets.top }}>

      {/* User Info Card */}
      <View className="bg-blue-600 rounded-xl items-center py-6">
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg' }} // Replace with user avatar
          className="w-20 h-20 rounded-full mb-3"
        />
        <Text className="text-white text-xl font-bold mb-4">Agilan Senthil</Text>
        <Text className="text-white text-sm font-semobold">agilansenthilkumar@gmail.com</Text>
        <Text className="text-white text-sm font-semobold">+91 9444977118</Text>
      </View>


      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} >

        {/* Menu Items */}
        {menuItems.map((item, index) => (
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
    </View>
  )
}

export default ProfileScreen