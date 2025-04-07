import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, fontSizes, formStyles } from '@/src/constants/theme';
import ErrorBox from '@/src/components/ui/ErrorBox';
import SuccessBox from '@/src/components/ui/SuccesBox';
import PrimaryButton from '@/src/components/ui/PrimaryButton';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (email.trim() === '') {
      setError('Por favor ingresa un correo electrónico.');
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    setError(null);
    setIsSubmitted(true);

    setTimeout(() => {
      router.replace('/(auth)/reset-password');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color={colors.black} />
      </TouchableOpacity>

      <Text style={styles.title}>Recuperar contraseña</Text>


      {!isSubmitted ? (
        <View>
          {error && <ErrorBox message={error} />}
          <Text style={styles.label}>
            Ingresa tu correo electrónico para restablecer tu contraseña:
          </Text>

          <TextInput
            style={[formStyles.input, isEmailFocused && formStyles.inputFocused]}
            placeholder="Email"
            placeholderTextColor={colors.gray}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            underlineColorAndroid="transparent"
            selectionColor={colors.black}
          />

          <View style={{ marginTop: 16 }}>
            <PrimaryButton title="ENVIAR" onPress={handleSubmit} />
          </View>


        </View>
      ) : (
        <View>
          <SuccessBox message="¡Correo enviado! Revisa tu bandeja de entrada." />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.white,
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    fontSize: fontSizes.title,
    fontFamily: fonts.montrealSemiBold,
    color: colors.black,
    marginBottom: 24,
    textAlign: 'left'
  },
  label: {
    fontSize: fontSizes.base,
    fontFamily: fonts.montreal,
    color: colors.black,
    marginBottom: 24,
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: colors.gray,
    fontSize: fontSizes.base,
    fontFamily: fonts.montreal,
    paddingVertical: 12,
    marginBottom: 24,
    color: colors.black,
  },
  submitButton: {
    backgroundColor: colors.black,
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    color: colors.white,
    fontFamily: fonts.montrealSemiBold,
    fontSize: fontSizes.base,
  },
  successBox: {
    padding: 20,
    backgroundColor: colors.greenLight ?? '#d4edda',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.greenLight ?? '#28a745',
  },
  successText: {
    fontSize: fontSizes.base,
    color: colors.black ?? '#28a745',
    fontFamily: fonts.montrealSemiBold,
    textAlign: 'center',
  },
  errorText: {
    color: colors.red,
    fontFamily: fonts.montrealSemiBold,
    fontSize: fontSizes.sm,
    marginBottom: 12,
  },
});
