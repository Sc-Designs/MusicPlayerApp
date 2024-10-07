import { useEffect, useRef } from "react";
import TrackPlayer, {
  RatingType,
  RepeatMode,
  Capability,
} from 'react-native-track-player';

const setupPlayer = async()=>{
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
  });
  await TrackPlayer.updateOptions({
    ratingType: RatingType.Heart,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
  await TrackPlayer.setVolume(0.5);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}
export const UseSetupPlayer = ({onLoad})=>{
    const isInitialized = useRef(false);

    useEffect(()=>{
        setupPlayer().then(()=>{
          if(isInitialized. current === true) return;
            isInitialized.current = true;
            onLoad();
        }).catch((error)=>{
            isInitialized.current = false;
            console.error(error);
        })
    },[])
}