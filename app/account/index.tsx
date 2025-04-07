import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyAccount from '@/src/components/profile/MyAccount';
import { colors } from '@/src/constants/theme';
import TabsHeader from '@/src/components/profile/TabsHeader';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <MyAccount />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 24,
  },
});
