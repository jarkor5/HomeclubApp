import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, fonts, fontSizes, formStyles } from '@/src/constants/theme';
import PrimaryButton from '@/src/components/ui/PrimaryButton';
import CustomModal from '@/src/components/ui/AlertModal';
import ErrorBox from '../ui/ErrorBox';

export default function CheckInForm() {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFocusedDate, setIsFocusedDate] = useState(false);
  const [isFocusedTime, setIsFocusedTime] = useState(false);

  const handleSave = () => {
    if (!checkInDate || !checkInTime) {
      setError('La fecha y hora de check-in son requeridas.');
      return;
    }

    setError(null);
    setModalVisible(true);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '';
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      {error && <ErrorBox message={error} />}
      <Text style={styles.title}>CHECK - IN</Text>

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        onPressIn={() => setIsFocusedDate(true)}
        onBlur={() => setIsFocusedDate(false)}
      >
        <TextInput
          placeholder="Fecha del check-in"
          placeholderTextColor={colors.gray}
          style={[formStyles.input, isFocusedDate && formStyles.inputFocused]}
          value={formatDate(checkInDate)}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={checkInDate || new Date()}
          mode="date"
          display="default"
          onChange={(e, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setCheckInDate(selectedDate);
          }}
        />
      )}
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        onPressIn={() => setIsFocusedTime(true)}
        onBlur={() => setIsFocusedTime(false)}
      >
        <TextInput
          placeholder="Hora del Check-in"
          placeholderTextColor={colors.gray}
          style={[formStyles.input, isFocusedTime && formStyles.inputFocused]}
          value={formatTime(checkInTime)}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={checkInTime || new Date()}
          mode="time"
          display="default"
          onChange={(e, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setCheckInTime(selectedTime);
          }}
        />
      )}
      <Text style={[styles.note]}>
        Lorem ipsum dolor sit amet, cons ect etuer adipi scing eliam no um my nibh euismod tincid laoree dolores.
      </Text>

      <PrimaryButton title="GUARDAR" onPress={handleSave} />
      <Text style={[styles.note, { fontSize: fontSizes.sm }]}>
        Lorem ipsum dolor sit amet, cons ect etuer <Text style={styles.noteBold}>adipi scing eliam</Text> no um my nibh euismod tincid laoree dolores.
      </Text>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        icon="info"
        title="¡Check-in guardado con éxito!"
        description="La fecha y hora de tu llegada han sido registradas correctamente."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  title: {
    fontFamily: fonts.montreal,
    fontSize: fontSizes.base,
    color: colors.black,
    marginBottom: 12,
  },
  note: {
    fontFamily: fonts.montreal,
    fontSize: fontSizes.base,
    color: colors.black,
    marginTop: 16,
    marginBottom: 24,
  },
  noteBold: {
    fontFamily: fonts.montrealSemiBold,
    color: colors.black,
  },
});
