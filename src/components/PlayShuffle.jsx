import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Sizes } from '../constants/dimention';
import TrackPlayer from 'react-native-track-player';
import { useTheme } from '@react-navigation/native';

const PlayShuffle = () => {
  const {colors} = useTheme();
    const shuffleSongs = async()=>{
       let queue = await TrackPlayer.getQueue();
       await TrackPlayer.reset();
       queue.sort(() => Math.random() - 0.5);
       await TrackPlayer.add(queue);
       await TrackPlayer.play();
    }
  return (
    <TouchableOpacity activeOpacity={0.55} onPress={shuffleSongs}>
      <MaterialCommunityIcons
        name={'shuffle'}
        size={Sizes.lg}
        color={colors.iconColor}
      />
    </TouchableOpacity>
  );
}

export default PlayShuffle

const styles = StyleSheet.create({})