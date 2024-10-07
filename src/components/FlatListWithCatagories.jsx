import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react'
import {FontSizes} from '../constants/dimention';
import {fontFamilies} from '../constants/fonts';
import SongCard from './SongCard';
import { Spacing } from '../constants/dimention';
import TrackPlayer from 'react-native-track-player';
import { useTheme } from '@react-navigation/native';

const FlatListWithCatagories = ({item}) => {
  const {colors} = useTheme();
  const HandelPlayTrack = async (selectedTrack, songs = item.songs) => {
    const TrackIndex = songs.findIndex(
      track => track.url === selectedTrack.url,
    );
    if(TrackIndex === -1) {
      return;
    }
    const beforeTrack = songs.slice(0,TrackIndex);
    const afterTrack = songs.slice(TrackIndex + 1);
    await TrackPlayer.reset();
    await TrackPlayer.add(selectedTrack);
    await TrackPlayer.add(afterTrack);
    await TrackPlayer.add(beforeTrack);

    await TrackPlayer.play();
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.headingText, {color: colors.TextColor}]}>
        {item.title}
      </Text>
      <FlatList
        data={item.songs}
        renderItem={({item}) => (
          <SongCard
            item={item}
            handelPlay={selectedTrack => {
              HandelPlayTrack(selectedTrack);
            }}
          />
        )}
        horizontal={true}
        ItemSeparatorComponent={
          <View style={{marginHorizontal: Spacing.sm}}></View>
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: Spacing.xxxl}}
      />
    </View>
  );
}

export default FlatListWithCatagories

const styles = StyleSheet.create({
    container: {
    flex: 1,
    marginBottom: Spacing.xl
    },
  headingText: {
    fontSize: FontSizes.xxxl,
    fontFamily: fontFamilies.jim,
    marginBottom: Spacing.md,
  },
});