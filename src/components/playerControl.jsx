import { TouchableOpacity } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Sizes } from "../constants/dimention";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import { useTheme } from "@react-navigation/native";

export const GoToPreviousButton = ({size = Sizes.lg })=>{
  const {colors} = useTheme();
  const handelToGoPrevious = async() =>{
    TrackPlayer.skipToPrevious();
  }
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={handelToGoPrevious}>
        <AntDesign name={'banckward'} size={size} color={colors.iconColor} />
      </TouchableOpacity>
    );
  }
  
  export const GoToplayPause = ({size = Sizes.xl}) => {
  const {colors} = useTheme();
  const { playing } = useIsPlaying();
  const handleToPlayPause = async () => {
    if (playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }
  return (
    <TouchableOpacity activeOpacity={0.35} onPress={handleToPlayPause}>
      <FontAwesome6
        name={playing ? 'pause' : 'play'}
        size={size}
        color={colors.iconColor}
        />
    </TouchableOpacity>
  );
};

export const GoToNextButton = ({size = Sizes.lg}) => {
  const {colors} = useTheme();
  const handelToGoNext = async () => {
    TrackPlayer.skipToNext();
  };
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={handelToGoNext}>
      <AntDesign name={'forward'} size={size} color={colors.iconColor} />
    </TouchableOpacity>
  );
};