import { create } from "zustand";
import { IsExist } from "../utilis";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLikeSong = create((set)=>(
    {
        likeSongs: [],
        addLikeSong: async(Likesong) => {
            set((state) => {
                const Exist = IsExist(state.likeSongs, Likesong);
                const updateSong = Exist
                  ? state.likeSongs.filter((item)=> item.url !== Likesong.url)
                  : [...state.likeSongs, Likesong];
                  AsyncStorage.setItem("likedSongs", JSON.stringify(updateSong))
                return {
                    likeSongs: updateSong,
                }
            })
        },
        loadLikeSong: async() => {
            try{
                const likeSong = await AsyncStorage.getItem("likedSongs")
                if(likeSong){
                    set({likeSongs: JSON.parse(likeSong)})
                }
            }catch(err){
                console.log(err)
            }
        }
    }
))