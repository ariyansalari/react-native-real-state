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

const index = () => {
  const { user } = userGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });
  const {
    data: properties,
    loading: propertiesLoading,
    refetch,
  } = useAppwrite({
    fn: getPropertis,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
  });

  const handlePress = (id: string) => router.push(`/properties/${id}`);
  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full ">
      <ScrollView className="mb-24">
        <View className="px-5">
          <View className=" flex flex-row items-center justify-between mt-5">
            <View className="flex flex-row items-center">
              <Image
                source={{
                  uri: user?.avatar,
                }}
                className="size-12 rounded-full"
              />
              <View className="flex flex-col items-start ml-2 justify-center">
                <Text className="text-xs font-rubik text-black-100 ">
                  Good Morning
                </Text>
                <Text className="text-base font-rubik-medium text-black-300">
                  {user?.name}
                </Text>
              </View>
            </View>
            <Image source={icons.bell} className="size-6" />
          </View>
        </View>

        <View className="px-4">
          <Search />
        </View>
        <View className="px-5">
          <View className="flex flex-row items-center justify-between mt-4">
            <Text className="text-xl font-rubik-bold text-black-300 ">
              Featured
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-primary-300 ">
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={latestProperties as any}
            ListEmptyComponent={
              latestPropertiesLoading ? (
                <ActivityIndicator
                  size={'large'}
                  className="text-primary-300 mt-5"
                />
              ) : (
                <NoResults />
              )
            }
            renderItem={({ item, index }) => (
              <FeaturedCard
                key={`latest-property-${index}`}
                item={item}
                onPress={() => handlePress}
              />
            )}
            horizontal
            bounces={false}
            keyExtractor={(item) => item.$id}
            contentContainerClassName="flex gap-5 mt-5"
          />

          <View className="flex flex-row items-center justify-between mt-4">
            <Text className="text-xl font-rubik-bold text-black-300 ">
              Our Recommendation
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-primary-300 ">
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <Filters />

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
            keyExtractor={(item) => item.$id}
            columnWrapperClassName="gap-4"
            renderItem={({ item, index }) => (
              <Card key={`property-item-${index}`} item={item} />
            )}
            numColumns={2}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
