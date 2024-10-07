import { useCallback, useEffect, useState } from "react"
import TrackPlayer from "react-native-track-player";

export const UseTrackPlayerMode = ()=>{
    const [repeatMode, setRepeatMode] = useState(null);
    
    const ChangeRepeatMode = useCallback(async(repeatMode)=>{
        await TrackPlayer.setRepeatMode(repeatMode);
        setRepeatMode(repeatMode);
    },[]);

    useEffect(()=>{
        TrackPlayer.getRepeatMode().then(setRepeatMode);
    },[]);
    return{ repeatMode, ChangeRepeatMode};
};