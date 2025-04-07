import { StyleSheet } from 'react-native';

export const colors = {
  black: '#000000',
  gray: '#929292',
  lightGray: '#C9C9C9',
  lightGray2: '#F2F2F2',
  white: '#FFFFFF',

  red: '#CC1313',
  redLight: '#FFECEC',

  blue: '#4A809D',
  blueLight: '#E4F5FD',

  greenDark: '#046974',
  greenLight: '#DEFFF9',
};

export const fonts = {
  editorialItalic: 'EditorialNew',
  montreal: 'PPNeueMontreal',
  montrealSemiBold: 'PPNeueMontrealSemiBold',
};

export const fontSizes = {
  xs: 14,
  sm: 16,
  base: 18,
  lg: 24,
  xl: 28,
  title: 32,
};

export const formStyles = StyleSheet.create({
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: colors.gray,
    marginBottom: 24,
    paddingVertical: 4,
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
  inputFocused: {
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
  },

});

export const buttonStyles = StyleSheet.create({
  base: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  small: {
    paddingVertical: 8,
  },
  medium: {
    paddingVertical: 14,
  },
  default: {
    backgroundColor: colors.black,
  },
  hover: {
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  press: {
    backgroundColor: colors.gray,
  },
  disabled: {
    backgroundColor: colors.lightGray,
  },
  textDefault: {
    color: colors.white,
    fontFamily: fonts.montreal,
    fontSize: fontSizes.base,
  },
  textHover: {
    color: colors.white,
    fontFamily: fonts.montreal,
    fontSize: fontSizes.base,
  },
  textPress: {
    color: colors.white,
    fontFamily: fonts.montreal,
    fontSize: fontSizes.base,
  },
  textDisabled: {
    color: colors.gray,
    fontFamily: fonts.montreal,
    fontSize: fontSizes.base,
  },
});
