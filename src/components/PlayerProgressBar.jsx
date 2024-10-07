import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Sizes, Spacing } from '../constants/dimention';
import { fontFamilies } from '../constants/fonts';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { formateSecToMin } from '../utilis';
import { useTheme } from '@react-navigation/native';

const PlayerProgressBar = () => {
  const { colors} = useTheme();
  const {duration, position} = useProgress();
   const progress = useSharedValue(0.7);
   const min = useSharedValue(0);
   const max = useSharedValue(1);
   const IsSliding = useSharedValue(false);

   if(!IsSliding.value){
    progress.value = duration > 0 ? position / duration : 0;
   }
   const trackRemaining = formateSecToMin(position);
   const remainingTime = formateSecToMin(duration - position);
  return (
    <View>
      <View style={styles.timerow}>
        <Text style={[styles.startTime, {color: colors.active}]}>
          {trackRemaining}
        </Text>
        <Text style={[styles.endTime, {color: colors.active}]}>
          {'-'}
          {remainingTime}
        </Text>
      </View>
      <Slider
        style={styles.container}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        containerStyle={{
          height: 7,
          borderRadius: Spacing.sm,
        }}
        theme={{
          minimumTrackTintColor: colors.TextColor,
          maximumTrackTintColor: colors.active,
        }}
        renderThumb={() => null}
        renderBubble={() => null}
        onSlidingStart={() => {
          IsSliding.value = true;
        }}
        onValueChange={async value => {
          await TrackPlayer.seekTo(value * duration);
        }}
        onSlidingComplete={async value => {
          if (!IsSliding.value) {
            return;
          }
          IsSliding.value = false;
        }}
      />
    </View>
  );
}

export default PlayerProgressBar

const styles = StyleSheet.create({
  timerow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.sm,
    marginTop: Spacing.md
  },
  startTime: {
    fontSize: Sizes.sm,
    fontFamily: fontFamilies.juli,
  },
  endTime: {
    fontSize: Sizes.sm,
    fontFamily: fontFamilies.juli,
  },
  container: {
    marginVertical: Spacing.sm,
  },
});