import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import TabsHeader from './TabsHeader';
import { colors } from '@/src/constants/theme';

export default function ProfileTabs() {
  return (
    <View style={styles.container}>
      <TabsHeader />
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
