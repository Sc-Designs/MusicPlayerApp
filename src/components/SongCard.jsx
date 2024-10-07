import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontSizes } from '../constants/dimention';
import { fontFamilies } from '../constants/fonts';
import { useTheme } from '@react-navigation/native';

const SongCard = ({containerStyle, imageHeight, item, handelPlay}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      className="mt-4"
      onPress={() => handelPlay(item)}>
      <View>
        <Image
          source={{uri: item.artwork}}
          style={[styles.coverImage, imageHeight]}
        />
        <Text
          className="font-black text-center"
          style={[styles.SongName, {color: colors.TextColor}]}>
          {item.title}
        </Text>
        <Text
          className="text-center"
          style={[styles.Artist, {color: colors.TextColor}]}>
          {item.artist}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SongCard

const styles = StyleSheet.create({
  container: {
    width: 144,
    height:220,
  },
  coverImage: {
    width: 144,
    height: 202,
    borderRadius: 15,
    marginBottom: 5,
  },
  SongName: {
    fontSize: FontSizes.xl,
    fontFamily: fontFamilies.jura,
    marginBottom: 5,
    
  },
  Artist: {
    fontSize: FontSizes.sm,
    fontFamily: fontFamilies.juli,
  },
});