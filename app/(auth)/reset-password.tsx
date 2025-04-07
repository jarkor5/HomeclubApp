import React from 'react';
import { View } from 'react-native';
import ResetPasswordForm from '@/src/components/auth/ResetPassword';

export default function ResetPasswordRoute() {
  return (
    <View style={{ flex: 1 }}>
      <ResetPasswordForm />
    </View>
  );
}
