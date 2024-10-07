import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react'
import {Sizes, Spacing} from '../constants/dimention';
// icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useTheme } from '@react-navigation/native';

const Header = () => {
  const {colors} = useTheme();
  const Navigation = useNavigation();
  const toggleDrawer = () => {
    Navigation.toggleDrawer();
  };
  return (
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer}>
          <FontAwesome5
            name={'grip-lines'}
            color={colors.iconColor}
            size={Sizes.lg}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name={'search1'}
            color={colors.iconColor}
            size={Sizes.lg}
          />
        </TouchableOpacity>
      </View>
  );
}

export default Header

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  }
});