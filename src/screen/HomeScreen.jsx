import { StyleSheet ,View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/Header';
import { Spacing } from '../constants/dimention';
import FlatListWithCatagories from '../components/FlatListWithCatagories';
import FlotingLayer from '../components/FlotingLayer';
import { SongWithCatagory } from '../data/SongWithCategory';
import { useTheme } from '@react-navigation/native';
const HomeScreen = () => {
  const {colors} = useTheme()
  return (
    <View style={[styles.container,{backgroundColor: colors.body}]}>
      <Header />
      <FlatList
        data={SongWithCatagory}
        renderItem={({item})=><FlatListWithCatagories item={item}/>}
        contentContainerStyle={{paddingBottom: 10, paddingHorizontal: Spacing.md}}
        showsVerticalScrollIndicator={false}
      />
      <FlotingLayer/>
    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});