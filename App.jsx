import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { UseSetupPlayer } from './src/hooks/UseSetupTrackPlayer';
import { useLikeSong } from './src/store/likeStore';
import { useEffect } from 'react';
import { darkTheme } from './src/theme/darkTheme';
import { lightTheme } from './src/theme/lightTheme';
import { useThemeStore } from './src/store/themeStore';
import { useColorScheme } from 'react-native';

// The player is ready to be used
const App = () => {
  const scheme = useColorScheme();
  const {isDarkMode , toggleTheme} = useThemeStore();
  const {loadLikeSong} = useLikeSong();
  useEffect(() => {
    loadLikeSong();
    scheme === 'dark' ? toggleTheme(false) : toggleTheme(true);
  }, [scheme]);
  const onLoad = () => {
    console.log("TrackPlayer Setup Started");
  }
  UseSetupPlayer({onLoad})
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
        <DrawerNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
