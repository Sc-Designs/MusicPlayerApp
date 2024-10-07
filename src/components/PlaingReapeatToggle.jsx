import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Sizes} from '../constants/dimention';
import { UseTrackPlayerMode } from '../hooks/UseTrackPlayerRepeatMode';
import { RepeatMode } from 'react-native-track-player';
import { useTheme } from '@react-navigation/native';


const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue]
const PlaingReapeatToggle = () => {
  const {colors} = useTheme();
      const {repeatMode, ChangeRepeatMode} = UseTrackPlayerMode();

      const toggleRepeateMode = ()=>{
        if(repeatMode == null){
          return;
        }
        const CurrentIndex = repeatOrder.indexOf(repeatMode);
        const nextIndex = (CurrentIndex + 1) % repeatOrder.length;
        ChangeRepeatMode(nextIndex);
      }
      let iconName = "repeat";
      switch(repeatMode){
        case RepeatMode.Off:
          iconName = "repeat-off"
          break;
        case RepeatMode.Queue:
          iconName = 'repeat'
          break;
        case RepeatMode.Track:
          iconName = 'repeat-once'
          break;
      }
  return (
    <TouchableOpacity onPress={toggleRepeateMode}>
      <MaterialCommunityIcons
        name={iconName}
        size={Sizes.lg}
        color={colors.iconColor}
      />
    </TouchableOpacity>
  );
}

export default PlaingReapeatToggle

