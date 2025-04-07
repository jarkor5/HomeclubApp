import React from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView } from 'react-native';
import { useReservations } from '@/src/hooks/useReservations';
import ReservationCard from './ReservationCard';
import { colors, fonts, fontSizes } from '@/src/constants/theme';
import { ActivityIndicator } from 'react-native';

export default function ReservationScreen() {
  const { loading, reservations, error } = useReservations();


  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error}>Error al cargar reservas</Text>
      ) : loading ? (
        <ActivityIndicator size="large" color={colors.black} />
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.name}
          ListHeaderComponent={<Text style={styles.title}>Mis Reservas</Text>}
          renderItem={({ item }) => (
            <ReservationCard
              name={item.name}
              url={item.url}
              status={item.status}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: fonts.montrealSemiBold,
    fontSize: fontSizes.title,
    marginBottom: 24,
    color: colors.black,
  },
  loading: {
    fontFamily: fonts.montreal,
    color: colors.gray,
  },
  error: {
    fontFamily: fonts.montreal,
    color: colors.red,
  },
  listContent: {
    padding: 24,
    paddingBottom: 80,
  },
});
