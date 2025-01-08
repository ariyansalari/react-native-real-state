import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const index = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text className='font-bold my-10 font-rubik text-3xl '>Welcome to ReState</Text>
      <Link href={'/sign-in'}>Sign in</Link>
      <Link href={'/explore'}>Explore</Link>
      <Link href={'/profile'}>Profile</Link>
      <Link href="/properties/1">Property</Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
