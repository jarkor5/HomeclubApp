import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors, fonts, fontSizes, formStyles } from '@/src/constants/theme';
import PrimaryButton from '@/src/components/ui/PrimaryButton';
import CustomModal from '@/src/components/ui/AlertModal';
import ErrorBox from '../ui/ErrorBox';


export default function PersonalInfoForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [documentType, setDocumentType] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedSurname, setIsFocusedSurname] = useState(false);
  const [isFocusedDate, setIsFocusedDate] = useState(false);


  const documentOptions = [
    { label: 'ID', value: 'id' },
    { label: 'Cédula de ciudadanía', value: 'cc' },
  ];

  const handleSave = () => {
    if (!name || !surname || !documentType || !date) {
      setError('Faltan datos por rellenar');
      return;
    }

    setError(null);
    setModalVisible(true);

  };



  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <View style={styles.formContainer}>
      {error && <ErrorBox message={error} />}
      <Text style={styles.sectionTitle}>DATOS PERSONALES</Text>



      <TextInput
        placeholder="Nombre"
        style={[formStyles.input, isFocusedName && formStyles.inputFocused]}
        placeholderTextColor={colors.gray}
        value={name}
        onChangeText={setName}
        onFocus={() => setIsFocusedName(true)}
        onBlur={() => setIsFocusedName(false)}
      />

      <TextInput
        placeholder="Apellidos"
        style={[formStyles.input, isFocusedSurname && formStyles.inputFocused]}
        placeholderTextColor={colors.gray}
        value={surname}
        onChangeText={setSurname}
        onFocus={() => setIsFocusedSurname(true)}
        onBlur={() => setIsFocusedSurname(false)}
      />

      <DropDownPicker
        open={open}
        value={documentType}
        items={documentOptions}
        setOpen={setOpen}
        setValue={setDocumentType}
        placeholder="Tipo de documento"
        style={{
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: colors.gray,
          paddingHorizontal: 0,
          paddingVertical: 12,
          marginBottom: 24,
          width: '101%',

        }}
        textStyle={styles.dropdownText}
        dropDownContainerStyle={{
          borderWidth: 1,
          borderColor: colors.gray,
        }}
        listItemLabelStyle={{ fontFamily: fonts.montreal }}
        zIndex={1000}
      />

      {Platform.OS === 'web' ? (
        <input
          type="date"
          value={formatDateForInput(date)}
          onChange={(e) => setDate(new Date(e.target.value))}
          style={styles.webInput}
        />
      ) : (
        <>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              placeholder="Fecha de nacimiento"
              style={[formStyles.input, isFocusedDate && formStyles.inputFocused]}
              placeholderTextColor={colors.gray}
              value={formatDate(date)}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}
        </>
      )}

      <PrimaryButton title="GUARDAR" onPress={handleSave} />

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        icon="info"
        title="Datos guardados"
        description="Tus datos personales han sido guardados correctamente."
      />

    </View>


  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 16,
  },
  sectionTitle: {
    fontFamily: fonts.montrealSemiBold,
    fontSize: fontSizes.base,
    color: colors.black,
    marginBottom: 12,
    marginTop: 16
  },
  dropdown: {
    ...formStyles.input,
    zIndex: 10,
  },
  dropdownText: {
    fontFamily: fonts.montreal,
    fontSize: fontSizes.base,
    color: colors.gray,
  },
  webInput: {
    ...formStyles.input,
    fontFamily: fonts.montreal,
    fontSize: fontSizes.base,
    paddingHorizontal: 8,
    height: 48,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
    marginBottom: 16,
  },
  error: {
    color: colors.red,
    fontFamily: fonts.montreal,
    fontSize: fontSizes.sm,
    marginBottom: 12,
  },
});
