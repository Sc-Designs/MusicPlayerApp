import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Sizes, Spacing } from '../constants/dimention';
import { fontFamilies } from '../constants/fonts';
import { useTheme } from '@react-navigation/native';
import { useThemeStore } from '../store/themeStore';

const CustomDrawerContent = (props) => {
  const {isDarkMode, toggleTheme} = useThemeStore();
  const {colors} = useTheme();
    const toggleDrawer = ()=>{
        props.navigation.toggleDrawer();
    };
  return (
    <DrawerContentScrollView
      style={[styles.drawerContainer, {backgroundColor: colors.body}]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.55} onPress={toggleDrawer}>
          <AntDesign name={'close'} color={colors.iconColor} size={Sizes.lg} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>toggleTheme()} activeOpacity={0.55}>
          <Octicons
            name={isDarkMode ? 'sun' : 'moon'}
            color={colors.iconColor}
            size={Sizes.lg}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.DrawerItems}>
        <DrawerItem
          label={'PROFILE'}
          icon={() => (
            <Feather name={'user'} color={colors.active} size={Sizes.lg} />
          )}
          labelStyle={[styles.labelStyle, {color: colors.TextColor,}]}
          style={styles.drawerItems}
        />
        <DrawerItem
          label={'LIKED SONGS'}
          icon={() => (
            <AntDesign name={'hearto'} color={colors.active} size={Sizes.lg} />
          )}
          labelStyle={[styles.labelStyle, {color: colors.TextColor,}]}
          style={styles.drawerItems}
          onPress={() => {
            props.navigation.navigate('Like_Screen');
          }}
        />
        <DrawerItem
          label={'LANGUAGE'}
          icon={() => (
            <Ionicons name={'language'} color={colors.active} size={Sizes.lg} />
          )}
          labelStyle={[styles.labelStyle, {color: colors.TextColor,}]}
          style={styles.drawerItems}
        />
        <DrawerItem
          label={'CONTACT US'}
          icon={() => (
            <AntDesign
              name={'contacts'}
              color={colors.active}
              size={Sizes.lg}
            />
          )}
          labelStyle={[styles.labelStyle, {color: colors.TextColor}]}
          style={styles.drawerItems}
        />
        <DrawerItem
          label={'SETTING'}
          icon={() => (
            <Octicons name={'gear'} color={colors.active} size={Sizes.lg} />
          )}
          labelStyle={[styles.labelStyle, {color: colors.TextColor}]}
          style={styles.drawerItems}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent

const styles = StyleSheet.create({
  drawerContainer: {
    padding: Spacing.md,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DrawerItems: {
    marginVertical: Spacing.lg,
},
labelStyle: {
    fontSize: Sizes.md,
    fontFamily: fontFamilies.goudy,
},
drawerItems:{
    marginVertical: Spacing.md,
  },
});