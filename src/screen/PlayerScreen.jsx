import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Sizes, Spacing } from '../constants/dimention';
import { fontFamilies } from '../constants/fonts';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PlayShuffle from '../components/PlayShuffle';
import PlaingReapeatToggle from '../components/PlaingReapeatToggle';
import PlayerProgressBar from '../components/PlayerProgressBar';
import {  GoToNextButton, GoToplayPause,  GoToPreviousButton } from '../components/playerControl';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useActiveTrack } from 'react-native-track-player';
import { useLikeSong } from '../store/likeStore';
import { IsExist } from '../utilis';


const PlayerScreen = () => {
  const {colors} = useTheme();
  const { likeSongs, addLikeSong } = useLikeSong();
  const activeTrack = useActiveTrack();
  const Navigate = useNavigation();
  const IsLiked = false;
    const ClickHandener = () => {
      Navigate.goBack();
    }

    if(!activeTrack){
      return(
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.body,
        }}>
          <ActivityIndicator size={"large"} color={colors.TextColor}/>
        </View>
      )
    }
      return (
        <View style={[styles.container, {backgroundColor: colors.body}]}>
          <View style={styles.headerpart}>
            <TouchableOpacity onPress={ClickHandener} activeOpacity={0.55}>
              <MaterialIcons
                name={'keyboard-backspace'}
                color={colors.iconColor}
                size={Sizes.lg}
              />
            </TouchableOpacity>
            <Text style={[styles.text, {color: colors.TextColor}]}>
              Plaing Now
            </Text>
          </View>
          <View style={styles.ImageContainer}>
            <Image
              source={{uri: activeTrack.artwork}}
              style={styles.coverImage}
            />
          </View>
          <View>
            <Text style={[styles.title, {color: colors.TextColor}]}>
              {activeTrack.title}
            </Text>
            <Text style={[styles.Artist, {color: colors.TextColor}]}>
              {activeTrack.artist}
            </Text>
          </View>
          <View style={styles.userControler}>
            <TouchableOpacity
              onPress={() => addLikeSong(activeTrack)}
              activeOpacity={0.55}
              style={{marginTop: 10}}>
              <FontAwesome
                name={IsExist(likeSongs, activeTrack) ? 'heart' : 'heart-o'}
                size={Sizes.lg}
                color={colors.iconColor}
              />
            </TouchableOpacity>
            <View style={styles.playerCntroler}>
              <PlaingReapeatToggle />
              <PlayShuffle />
            </View>
          </View>
          <PlayerProgressBar />
          <View style={styles.playPauseContainer}>
            <GoToPreviousButton size={Sizes.xl} />
            <GoToplayPause size={Sizes.xxl} />
            <GoToNextButton size={Sizes.xl} />
          </View>
        </View>
      );
}

export default PlayerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
  },
  headerpart: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontFamily: fontFamilies.jura,
    fontSize: Sizes.md,
    flex: 1,
    textAlign: 'center',
  },
  ImageContainer: {
    alignItems: 'center',
    justifyItems: 'center',
    marginVertical: Spacing.md,
  },
  coverImage: {
    width: 250,
    height: 250,
    borderRadius: 15,
  },
  title: {
    textAlign: 'center',
    fontFamily: fontFamilies.goudy,
    fontSize: Sizes.xl,
  },
  Artist: {
    textAlign: 'center',
    fontFamily: fontFamilies.jura,
    marginTop: -5,
    fontSize: Sizes.sm,
  },
  userControler: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: Spacing.sm,
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  playerCntroler: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  playPauseContainer:{
    flexDirection: "row",
    gap: Spacing.xxl,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Spacing.xl,
    marginTop: Spacing.xl
  }
});