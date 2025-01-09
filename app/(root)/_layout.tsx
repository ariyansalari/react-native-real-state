import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { userGlobalContext } from '@/providers/global-provider';
import { Redirect, Slot } from 'expo-router';

const AppLayout = () => {
  const { loading, isLoggedIn } = userGlobalContext();

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) return <Redirect href={'/sign-in'} />;
  return <Slot />;
};

export default AppLayout;

