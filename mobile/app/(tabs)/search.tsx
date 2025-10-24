import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import Feather from '@expo/vector-icons/build/Feather';

const SearchScreen = () => {
  const TRENDING_TOPICS = [
  { topic: "#ReactNative", tweets: "125K" },
  { topic: "#TypeScript", tweets: "89K" },
  { topic: "#WebDevelopment", tweets: "234K" },
  { topic: "#AI", tweets: "567K" },
  { topic: "#TechNews", tweets: "98K" },
];
  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* header component */}
      <View className='px-4 py-3 border-b border-gray-100'>
        <View className='flex-row items-center bg-gray-100 rounded-full px-4 py-3'>
          <Feather name='search' size={20} color='#657786' />
          <TextInput 
            placeholder='Search Twitter'
            className='flex-1 ml-3 text-base'
            placeholderTextColor="#657786"  
          />
        </View>
      </View>
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        <View className='p-4'>
          <Text className='text-xl font-bold text-gray-900 mb-4'>Trending for you</Text>
          {TRENDING_TOPICS.map((item,index)=>(
            <TouchableOpacity key={index} className='border-b py-3 border-gray-100'>
              <Text className='text-gray-500 text-sm'>Trending in Technology</Text>
              <Text className='text-gray-900 font-bold text-lg'>{item.topic}</Text>
              <Text className='text-sm text-gray-500'>{item.tweets} Tweets</Text> 
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen