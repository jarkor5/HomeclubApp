import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, formStyles } from '../../constants/theme';
import userData from '../../api/users.json';
import { Feather } from '@expo/vector-icons';
import ErrorBox from '../ui/ErrorBox';
import PrimaryButton from '../ui/PrimaryButton';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'guest' | 'owner'>('guest');
  const [error, setError] = useState<string | null>(null);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
const [isPasswordFocused, setIsPasswordFocused] = useState(false);
const [showPassword, setShowPassword] = useState(false);


  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }
  
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      setError('El correo electrónico no es válido.');
      return;
    }
  
    const userFound = userData.find(
      (user) =>
        user.email === email &&
        user.password === password &&
        user.role === role
    );
  
    if (userFound) {
      router.replace('/account/reservations');
    } else {
      setError('Credenciales inválidas');
    }
  
    setTimeout(() => setError(null), 3000);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.roles}>
        <Pressable onPress={() => setRole('guest')}>
          <Text
            style={[
              styles.roleText,
              {
                textDecorationLine: role === 'guest' ? 'underline' : 'none',
                fontFamily: fonts.editorialItalic,
                color: colors.black,
              },
            ]}
          >
            Guest
          </Text>
        </Pressable>

        <Text style={{ fontFamily: fonts.editorialItalic, marginHorizontal: 8, fontSize: fontSizes.title }}>
          /
        </Text>

        <Pressable onPress={() => setRole('owner')}>
          <Text
            style={[
              styles.roleText,
              {
                fontFamily: fonts.editorialItalic,
                color: colors.black,
                textDecorationLine: role === 'owner' ? 'underline' : 'none',
              },
            ]}
          >
            Owner
          </Text>
        </Pressable>
      </View>
      {error && (
       <ErrorBox message={error} />
      )}
      <TextInput
  style={[
    styles.input,
    isEmailFocused && formStyles.inputFocused
  ]}
  placeholder="Email"
  placeholderTextColor={colors.gray}
  keyboardType="email-address"
  value={email}
  onChangeText={setEmail}
  onFocus={() => setIsEmailFocused(true)}
  onBlur={() => setIsEmailFocused(false)}
  underlineColorAndroid="transparent" 
/>

      <View style={[styles.inputContainer, isPasswordFocused && styles.inputContainerFocused]}>
  <TextInput
    style={styles.passwordInput}
    placeholder="Contraseña"
    placeholderTextColor={colors.gray}
    secureTextEntry={!showPassword}
    value={password}
    onChangeText={setPassword}
    onFocus={() => setIsPasswordFocused(true)}
    onBlur={() => setIsPasswordFocused(false)}
    underlineColorAndroid="transparent"
    selectionColor={colors.black}
  />
  <TouchableOpacity style={{right: 8}} onPress={() => setShowPassword(prev => !prev)}>
    <Feather
      name={showPassword ? 'eye-off' : 'eye'}
      size={26}
      color={colors.gray}
    />
  </TouchableOpacity>
</View>

      <View style={styles.forgot}>
  <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
  <TouchableOpacity onPress={() => router.push('/forgot-password')}>
    <Text style={styles.resetText}>Restablecer</Text>
  </TouchableOpacity>
</View>

  <View style={{marginTop: 16}}>
  <PrimaryButton title="INICIA SESIÓN" onPress={handleLogin} />
  </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: 60,

  },
  header: {
    fontFamily: fonts.montrealSemiBold,
    fontSize: fontSizes.title,
    marginBottom: 24,
    color: colors.black,
  },
  roles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  roleText: {
    fontSize: fontSizes.xl,
    fontWeight: '600'
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: colors.gray, 
    paddingVertical: 12,
    marginBottom: 32,
    fontFamily: fonts.montreal,
    fontSize: fontSizes.base,
    color: colors.black,
    backgroundColor: 'transparent', 
    borderWidth: 0, 

  },
  inputFocused: {
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
    outline: 'none',
  },
  
  forgot: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 32,
    marginTop: 32
  },
  forgotText: {
    fontFamily: fonts.montreal,
    color: colors.gray,
    fontSize: fontSizes.base,
  },
  resetText: {
    fontFamily: fonts.montrealSemiBold,
    color: colors.black,
    fontSize: fontSizes.base,
    marginLeft: 8
  },
  loginButton: {
    backgroundColor: colors.black,
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginText: {
    color: colors.white,
    fontFamily: fonts.montreal,
    fontSize: fontSizes.base,
  },
  errorBox: {
    backgroundColor: colors.redLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.red,
  },
  errorText: {
    color: colors.red,
    fontFamily: fonts.montrealSemiBold,
    fontSize: fontSizes.sm,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: colors.gray,
    marginBottom: 24,
    paddingVertical: 4,
  },
  
  inputContainerFocused: {
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
  },
  
  passwordInput: {
    flex: 1,
    fontSize: fontSizes.base,
    fontFamily: fonts.montreal,
    color: colors.black,
    paddingVertical: 8,
    paddingRight: 8, 
    backgroundColor: 'transparent',
  },
});
