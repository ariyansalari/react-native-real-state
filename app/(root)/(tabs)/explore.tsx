import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import images from '@/constants/images';
import icons from '@/constants/icons';
import Search from '@/components/Search';
import FeaturedCard, { Card } from '@/components/Cards';
import Filters from '@/components/Filters';
import { userGlobalContext } from '@/providers/global-provider';
import { useAppwrite } from '@/lib/useAppWrite';
import { getLatestProperties, getPropertis } from '@/lib/appwrite';
import NoResults from '@/components/NoResults';

const ExplorePage = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading: propertiesLoading,
    refetch,
  } = useAppwrite({
    fn: getPropertis,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
  });

  const handlePress = (id: string) => router.push(`/properties/${id}`);
  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full ">
      <ScrollView className="mb-24">
        <FlatList
          data={properties}
          ListEmptyComponent={
            propertiesLoading ? (
              <ActivityIndicator size="large" className="text-primary-300" />
            ) : (
              <NoResults />
            )
          }
          contentContainerClassName="pt-4 px-2 "
          columnWrapperClassName="gap-4"
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item) => item.$id}
          numColumns={2}
          ListHeaderComponent={
            <View className="px-2 ">
              <View className="flex flex-row items-center justify-between mt-5">
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                >
                  <Image source={icons.backArrow} className="size-5" />
                </TouchableOpacity>
                <Text className="text-base mr-2 font-rubik-medium text-center text-black-300">
                  Search for Your Ideal Home
                </Text>
                <Image source={icons.bell} className="w-6 h-6" />
              </View>
              <Search />
              <View className="mt-5">
                <Filters />

                <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                  Found {properties?.length}
                </Text>
              </View>
            </View>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExplorePage;
