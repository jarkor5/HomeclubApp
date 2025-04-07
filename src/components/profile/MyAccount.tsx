import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, formStyles } from '@/src/constants/theme';
import PrimaryButton from '@/src/components/ui/PrimaryButton';
import CustomModal from '@/src/components/ui/AlertModal';
import { Feather } from '@expo/vector-icons';
import ErrorBox from '../ui/ErrorBox';

const userData = {
  currentPassword: '123456',
};

export default function MyAccount() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [isFocusedCurrent, setIsFocusedCurrent] = useState(false);
  const [isFocusedNew, setIsFocusedNew] = useState(false);
  const [isFocusedConfirm, setIsFocusedConfirm] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  const handleSave = () => {
    const allEmpty = !currentPassword && !newPassword && !confirmPassword;

    if (allEmpty) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setError(null); // Ocultar mensaje general si no aplica

    if (currentPassword !== userData.currentPassword) {
      setModalType('error');
      setModalMessage('La contraseña actual es incorrecta.');
      setModalVisible(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalType('error');
      setModalMessage('Las nuevas contraseñas no coinciden.');
      setModalVisible(true);
      return;
    }

    // Éxito
    setModalType('success');
    setModalMessage('Tu nueva contraseña ha sido guardada correctamente.');
    setModalVisible(true);
  };


  const handleCloseModal = () => {
    setModalVisible(false);
    if (modalType === 'success') {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
    setModalMessage('');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>CAMBIAR CONTRASEÑA</Text>
      {error && <ErrorBox message={error} />}


      <TextInput
        placeholder="Contraseña actual"
        placeholderTextColor={colors.gray}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
        onFocus={() => setIsFocusedCurrent(true)}
        onBlur={() => setIsFocusedCurrent(false)}
        style={[formStyles.input, isFocusedCurrent && formStyles.inputFocused]}
      />

      <TextInput
        placeholder="Nueva contraseña"
        placeholderTextColor={colors.gray}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        onFocus={() => setIsFocusedNew(true)}
        onBlur={() => setIsFocusedNew(false)}
        style={[formStyles.input, isFocusedNew && formStyles.inputFocused]}
      />

      <TextInput
        placeholder="Confirmar contraseña"
        placeholderTextColor={colors.gray}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onFocus={() => setIsFocusedConfirm(true)}
        onBlur={() => setIsFocusedConfirm(false)}
        style={[formStyles.input, isFocusedConfirm && formStyles.inputFocused]}
      />

      <View style={styles.note}>
        <Feather name="info" size={18} color={colors.gray} style={{ marginRight: 0, top: 2, left: 4 }} />
        <Text style={styles.noteText}>
          Lorem ipsum dolor sit amet, cons ect etuer adipi scing eliam no um my nibh euismod tincid laoree dolores.
        </Text>
      </View>

      <PrimaryButton title="GUARDAR" onPress={handleSave} />

      <CustomModal
        visible={modalVisible}
        onClose={handleCloseModal}
        icon={modalType === 'success' ? 'info' : 'error'}
        title={
          modalType === 'success'
            ? 'Contraseña cambiada con éxito'
            : 'Error al cambiar la contraseña'
        }
        description={modalMessage}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 0,
  },
  title: {
    fontFamily: fonts.montreal,
    fontSize: 20,
    color: colors.black,
    marginBottom: 16,

  },
  error: {
    color: colors.red,
    fontFamily: fonts.montreal,
    fontSize: fontSizes.sm,
    marginBottom: 12,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 24,
  },
  noteText: {
    fontSize: fontSizes.base,
    fontFamily: fonts.montreal,
    color: colors.gray,
    flex: 1,
  },
});
