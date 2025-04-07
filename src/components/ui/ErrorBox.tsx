import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, fontSizes } from '@/src/constants/theme';
import { AntDesign } from '@expo/vector-icons';

export default function ErrorBox({ message }: { message: string }) {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <AntDesign name="exclamationcircle" size={16} color={colors.red} style={styles.icon} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  icon: {
    marginTop: 2,
  },
  text: {
    color: colors.red,
    fontFamily: fonts.montreal,
    fontSize: fontSizes.sm,
  },
});
