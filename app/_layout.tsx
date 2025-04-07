import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { colors } from '@/src/constants/theme';
import NavBar from '@/src/components/navigation/Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    EditorialNew: require('../assets/fonts/EditorialNew-UltralightItalic.otf'),
    PPNeueMontreal: require('../assets/fonts/PPNeueMontreal-Book.otf'),
    PPNeueMontrealSemiBold: require('../assets/fonts/PPNeueMontreal-SemiBold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SafeAreaView style={styles.container}>
    <View>
      <NavBar />
    </View>
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.white,
    flex: 1
  },
});
