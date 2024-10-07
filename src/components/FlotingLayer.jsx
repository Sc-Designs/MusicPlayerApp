import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontSizes, Sizes, Spacing } from '../constants/dimention';
import { fontFamilies } from '../constants/fonts';
import { GoToPreviousButton } from './playerControl';
import { GoToNextButton } from './playerControl';
import { GoToplayPause } from './playerControl';
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
import MovingText from './MovingText';
import { useNavigation, useTheme } from '@react-navigation/native';
import TrackPlayer, { useActiveTrack, useProgress } from 'react-native-track-player';

const FlotingLayer = () => {
  const {colors} = useTheme();
  const Navigation = useNavigation();
  const activeTrack = useActiveTrack();

  const {duration, position} = useProgress();

    const progress = useSharedValue(0);
    const min = useSharedValue(0);
    const max = useSharedValue(1);
    const IsSliding = useSharedValue(false);

    if (!IsSliding.value) {
      progress.value = duration > 0 ? position / duration : 0;
    }
    const handelOpenPlayerScreen = () => {
        Navigation.navigate('Player_Screen');
    }
    if(!activeTrack){
      return null;
    }
    return (
      <View>
        <View style={{zIndex: 1}}>
          <Slider
            style={styles.container}
            progress={progress}
            minimumValue={min}
            maximumValue={max}
            containerStyle={{
              height: 6,
            }}
            theme={{
              minimumTrackTintColor: colors.TextColor,
              maximumTrackTintColor: colors.line,
            }}
            renderThumb={() => null}
            renderBubble={() => null}
            onSlidingStart={() => (IsSliding.value = true)}
            onValueChange={async value => {
              await TrackPlayer.seekTo(value * duration);
            }}
            onSlidingComplete={async value => {
              if (!IsSliding.value) {
                return;
              }
              IsSliding.value = false;
              await TrackPlayer.seekTo(value * duration);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={handelOpenPlayerScreen}
          style={[styles.imageWindow, {backgroundColor: colors.row}]}
          activeOpacity={0.55}>
          <Image
            source={{uri: activeTrack.artwork}}
            style={styles.coverImage}
          />
          <View style={styles.titleContainer}>
            <MovingText
              style={[styles.title, {color: colors.TextColor}]}
              text={activeTrack.title}
              animationThreshold={13}
            />
            <Text style={[styles.artist, {color: colors.TextColor}]}>
              {activeTrack.artist}
            </Text>
          </View>
          <View style={styles.playPauseOption}>
            <GoToPreviousButton size={Sizes.lg} />
            <GoToplayPause size={Sizes.xl} />
            <GoToNextButton size={Sizes.lg} />
          </View>
        </TouchableOpacity>
      </View>
    );
}

export default FlotingLayer

const styles = StyleSheet.create({
    imageWindow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coverImage: {
        height: 55,
        width: 55,
        borderRadius: 10,
        marginLeft: Spacing.xs,
        marginVertical: Spacing.sm,
        resizeMode: "cover",
    },
    titleContainer: {
        flex: 1,
        paddingHorizontal: Spacing.sm,
        overflow: "hidden",
        marginRight: Spacing.sm,
        marginLeft: Spacing.xs
    },
    title: {
        fontFamily: fontFamilies.jura,
        fontSize: FontSizes.xl,
        marginBottom: Spacing.xs,
    },
    artist: {
        fontFamily: fontFamilies.juli,
        fontSize: FontSizes.sm,
        marginBottom: Spacing.xs,
    },
    playPauseOption:{
        flexDirection: 'row',
        gap: Spacing.lg,
        paddingVertical: Spacing.sm,
        alignItems: "center",
        paddingRight: Spacing.md
    }
});