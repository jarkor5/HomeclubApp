import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, formStyles } from '@/src/constants/theme';
import ErrorBox from '@/src/components/ui/ErrorBox';
import SuccessBox from '../ui/SuccesBox';
import PrimaryButton from '@/src/components/ui/PrimaryButton';

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);

  const router = useRouter();

  const handleReset = () => {
    if (!password || !confirmPassword) {
      return setError('Por favor completa todos los campos.');
    }

    if (password !== confirmPassword) {
      return setError('Las contraseñas no coinciden.');
    }

    setError(null);
    setSuccess(true);

    setTimeout(() => {
      router.replace('/');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color={colors.black} />
      </TouchableOpacity>

      <Text style={styles.title}>Restablecer contraseña</Text>

      {!success ? (
        <>
          {error && <ErrorBox message={error} />}
          <View
            style={[
              formStyles.inputContainer,
              isPasswordFocused && formStyles.inputFocused,
            ]}
          >
            <TextInput
              style={formStyles.passwordInput}
              placeholder="Nueva contraseña"
              placeholderTextColor={colors.gray}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              underlineColorAndroid="transparent"
              selectionColor={colors.black}
            />
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
              <Feather
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color={colors.gray}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              formStyles.inputContainer,
              isConfirmFocused && formStyles.inputFocused,
            ]}
          >
            <TextInput
              style={formStyles.passwordInput}
              placeholder="Confirmar contraseña"
              placeholderTextColor={colors.gray}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={() => setIsConfirmFocused(true)}
              onBlur={() => setIsConfirmFocused(false)}
              underlineColorAndroid="transparent"
              selectionColor={colors.black}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword((prev) => !prev)}
            >
              <Feather
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={24}
                color={colors.gray}
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 16 }}>
            <PrimaryButton title="RESTABLECER" onPress={handleReset} />
          </View>
        </>
      ) : (
        <SuccessBox message="Contraseña restablecida con éxito" />
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
    textAlign: 'center',
  },
});
