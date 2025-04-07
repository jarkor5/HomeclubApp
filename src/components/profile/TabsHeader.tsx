import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { colors, fonts, fontSizes } from '@/src/constants/theme';

type TabPath = '/account/reservations' | '/account/documents' | '/account/favorites' | '/account';

const tabs: { label: string; path: TabPath }[] = [
  { label: 'Mis reservas', path: '/account/reservations' },
  { label: 'Mis documentos', path: '/account/documents' },
  { label: 'Favoritos', path: '/account/favorites' },
  { label: 'Mi cuenta', path: '/account' },
];

export default function TabsHeader() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Pressable
              key={tab.path}
              onPress={() => router.push(tab.path as any)}
              style={styles.tabItem}
            >
              <Text style={[styles.tabText, isActive && styles.activeTab]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeUnderline} />}
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={styles.baseUnderline} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 16,
    paddingTop: 8,
  },
  tabItem: {
    alignItems: 'center',
    paddingBottom: 12,
    marginRight: 12
  },
  tabText: {
    fontFamily: fonts.montreal,
    fontSize: 20,
    color: colors.gray,
  },
  activeTab: {
    fontFamily: fonts.montrealSemiBold,
    color: '#000000',
  },
  baseUnderline: {
    height: 1,
    backgroundColor: colors.gray,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: '73%'
  },
  activeUnderline: {
    marginTop: 6,
    height: 2,
    width: '100%',
    backgroundColor: '#000000',
  },
});
