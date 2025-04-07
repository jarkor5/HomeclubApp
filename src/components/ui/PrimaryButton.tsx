import React from 'react';
import { Text, Pressable, GestureResponderEvent } from 'react-native';
import { buttonStyles } from '@/src/constants/theme';

type ButtonSize = 'small' | 'medium';

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  size?: ButtonSize;
}

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  size,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ hovered, pressed }) => [
        buttonStyles.base,
        size === 'small' && buttonStyles.small,
        size === 'medium' && buttonStyles.medium,
        disabled
          ? buttonStyles.disabled
          : pressed
            ? buttonStyles.press
            : hovered
              ? buttonStyles.hover
              : buttonStyles.default,
      ]}
    >
      {({ hovered, pressed }) => (
        <Text
          style={
            disabled
              ? buttonStyles.textDisabled
              : pressed
                ? buttonStyles.textPress
                : hovered
                  ? buttonStyles.textHover
                  : buttonStyles.textDefault
          }
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
