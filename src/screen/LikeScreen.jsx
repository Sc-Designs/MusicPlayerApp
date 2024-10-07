import {StyleSheet, TouchableOpacity, Text, View, FlatList} from 'react-native';
import React from 'react';

import SongCard from '../components/SongCard';
import FlotingLayer from '../components/FlotingLayer';
// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

// Constants
import { Sizes } from '../constants/dimention';
import { fontFamilies } from '../constants/fonts';
import { Spacing } from '../constants/dimention';
import { useLikeSong } from '../store/likeStore';
import { useNavigation, useTheme } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';

const LikeScreen = ({item}) => {
  const {colors} = useTheme();
  const {likeSongs, addLikeSong} = useLikeSong();
  const navigation = useNavigation();
  const handelBack = ()=>{
    navigation.goBack();
  }
  const HandelPlayTrack = async (selectedTrack, songs = likeSongs) => {
    const TrackIndex = songs.findIndex(
      track => track.url === selectedTrack.url,
    );
    if (TrackIndex === -1) {
      return;
    }
    const beforeTrack = songs.slice(0, TrackIndex);
    const afterTrack = songs.slice(TrackIndex + 1);
    await TrackPlayer.reset();
    await TrackPlayer.add(selectedTrack);
    await TrackPlayer.add(afterTrack);
    await TrackPlayer.add(beforeTrack);

    await TrackPlayer.play();
  };
return (
  <View style={[styles.container, {backgroundColor: colors.body}]}>
    <View style={styles.head}>
      <TouchableOpacity activeOpacity={0.65} onPress={handelBack}>
        <MaterialIcons
          name={'keyboard-backspace'}
          color={colors.iconColor}
          size={Sizes.lg}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.65}>
        <Fontisto
          name={'equalizer'}
          color={colors.iconColor}
          size={Sizes.md}
          style={{transform: [{rotate: '90deg'}]}}
        />
      </TouchableOpacity>
    </View>
    <FlatList
      ListHeaderComponent={
        <Text style={[styles.text, {color: colors.TextColor}]}>
          Liked Song...........
        </Text>
      }
      data={likeSongs}
      renderItem={({item}) => (
        <SongCard
          item={item}
          containerStyle={{width: '55%'}}
          imageHeight={{height: 200, width: 160}}
          handelPlay={item => {
            HandelPlayTrack(item);
          }}
        />
      )}
      numColumns={2}
      contentContainerStyle={{paddingBottom: 50, paddingHorizontal: 10}}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        marginHorizontal: Sizes.sm,
        marginVertical: Spacing.lg,
      }}
    />
    <FlotingLayer />
  </View>
);};

export default LikeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: Sizes.xs,
        paddingVertical: Sizes.xs,
        alignItems: "center",
    },
    text:{
        fontFamily: fontFamilies.jim,
        paddingLeft: Sizes.xs,
        fontSize: Sizes.xl
    },
});