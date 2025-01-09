import {
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { settings } from '@/constants/data';
import { userGlobalContext } from '@/providers/global-provider';
import { logout } from '@/lib/appwrite';

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const profile = () => {
  const { user, refetch } = userGlobalContext();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert('Success', 'You have been logged out successfully');
      refetch();
    } else {
      Alert.alert('Error', 'An error occurred while logging out');
    }
  };

  const SettingsItem = ({
    icon,
    title,
    onPress,
    showArrow,
    textStyle,
  }: SettingsItemProps) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row items-center justify-between py-3"
    >
      <View className="flex flex-row items-center gap-3">
        <Image className="size-6" source={icon} />
        <Text
          className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}
        >
          {title}
        </Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
  );
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold ">Profile</Text>
          <Image className="size-5" source={icons.bell} />
        </View>

        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{
                uri: user?.avatar,
              }}
              className="size-44 rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>
        <View className="flex flex-col mt-10">
          <SettingsItem showArrow icon={icons.calendar} title="My Bookings" />
          <SettingsItem showArrow icon={icons.wallet} title="Payments" />
        </View>
        <View className=" flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem showArrow key={index} {...item} />
          ))}
        </View>

        <View className=" flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            showArrow
            textStyle="text-danger"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
