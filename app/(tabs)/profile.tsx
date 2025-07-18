import InfoCard from '@/components/profile/InfoCard';
import ProfileMenu from '@/components/profile/ProfileMenu';
import { Entypo, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
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

      <InfoCard />

      <ProfileMenu  menuItems={menuItems}/>
      
    </View>
  )
}

export default ProfileScreen