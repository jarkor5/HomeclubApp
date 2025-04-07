import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, fontSizes } from '@/src/constants/theme';
import ForgotPasswordForm from '@/src/components/auth/ForgotPasswordForm';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <View style={{flex: 1}} >
      <ForgotPasswordForm />
    </View>
  );
}


