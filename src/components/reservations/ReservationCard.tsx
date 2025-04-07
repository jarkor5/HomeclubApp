import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, } from 'react-native';
import { colors, fonts, fontSizes } from '@/src/constants/theme';
import PrimaryButton from '@/src/components/ui/PrimaryButton';
import CustomModal from '../ui/AlertModal';


interface Props {
  name: string;
  url: string;
  status: 'reserved' | 'free';
}

export default function ReservationCard({ name, url, status }: Props) {
  const isReserved = status === 'reserved';
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.card}>
      <Image source={{ uri: url }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <View style={[
            styles.statusPill,
            isReserved ? styles.reserved : styles.free
          ]}>
            <Text style={[
              styles.statusText,
              isReserved ? styles.reservedText : styles.freeText
            ]}>
              {isReserved ? 'Reservado' : 'Disponible'}
            </Text>
          </View>
        </View>

        <PrimaryButton
          title="Ver detalles"
          onPress={() => setModalVisible(true)}
          size='small'
        />


        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          icon={status === 'reserved' ? 'error' : 'info'}
          title={`Detalles de ${name}`}
          description={`Esta propiedad está actualmente ${status === 'reserved' ? 'reservada' : 'disponible'}.`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.05)',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },

  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  details: {
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontFamily: fonts.editorialItalic,
    fontSize: fontSizes.title,
    color: colors.black,
  },

  statusPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 100,
    borderWidth: 1,
  },
  statusText: {
    fontFamily: fonts.montrealSemiBold,
    fontSize: fontSizes.sm,
  },

  reserved: {
    backgroundColor: colors.redLight,
    borderColor: colors.red,
  },
  free: {
    backgroundColor: colors.greenLight,
    borderColor: colors.greenDark,
  },
  reservedText: {
    color: colors.red,
  },
  freeText: {
    color: colors.greenDark,
  },

});
