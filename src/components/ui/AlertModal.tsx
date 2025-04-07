import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, fontSizes } from '@/src/constants/theme';
import PrimaryButton from './PrimaryButton';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon?: 'info' | 'error';
  buttonText?: string;
  onPressButton?: () => void;
}

export default function CustomModal({
  visible,
  onClose,
  title,
  description,
  icon = 'info',
  buttonText = 'Aceptar',
  onPressButton,
}: Props) {
  const isError = icon === 'error';
  const iconColor = isError ? colors.red : colors.greenDark;
  const iconName = isError ? 'alert-triangle' : 'check-circle';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <Feather name="x" size={24} color={colors.black} />
          </TouchableOpacity>

          <Feather name={iconName} size={36} color={iconColor} style={styles.icon} />

          <Text style={[styles.title, isError && styles.errorTitle]}>
            {title}
          </Text>

          <Text style={styles.description}>{description}</Text>

          {!isError && (
            <PrimaryButton
              title={buttonText}
              onPress={onPressButton || onClose}
              size="small"
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24
  },
  modal: {
    width: '85%',
    backgroundColor: colors.white,
    padding: 24,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 180,
    alignContent: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: fonts.montrealSemiBold,
    fontSize: fontSizes.base,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontFamily: fonts.montreal,
    fontSize: fontSizes.base,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  errorTitle: {
    color: colors.red,
  },

});
