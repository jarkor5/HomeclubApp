import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import LoginForm from '@/src/components/auth/LoginForm';

export default function IndexScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <LoginForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
