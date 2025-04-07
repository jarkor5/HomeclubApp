import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, fontSizes } from '@/src/constants/theme';

export default function SuccessBox({ message }: { message: string }) {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greenLight ?? '#d4edda',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.greenLight ?? '#28a745',
    marginTop: 12,
  },
  text: {
    fontSize: fontSizes.base,
    color: colors.black ?? '#28a745',
    fontFamily: fonts.montrealSemiBold,
    textAlign: 'center',
  },
});
