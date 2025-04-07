import { View, Image, StyleSheet } from 'react-native';
import { usePathname } from 'expo-router';
import { colors } from '@/src/constants/theme';

export default function NavBar() {
  const pathname = usePathname();

  const isRoot = pathname === '/';

  return (
    <View style={[styles.navBar, !isRoot && styles.withBorder]}>
      <Image
        source={require('@/assets/images/logo-header.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },

  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  logo: {
    width: 180,
  },
});
