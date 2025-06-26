import { StyleSheet } from 'react-native';
import { FontFamily } from './variables';
import { Scale } from './scaling';

const FontStyle = StyleSheet.create({
  lightFont: {
    fontFamily: FontFamily.light,
  },
  regularFont: {
    fontFamily: FontFamily.regular,
  },
  mediumFont: {
    fontFamily: FontFamily.medium,
  },
  boldFont: {
    fontFamily: FontFamily.bold,
  },
  italicFonts: { fontStyle: 'italic' },
  /* Text Alignment */
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
  },
  txtVCenter: {
    textAlignVertical: 'center',
  },
  /* Text Tranform */
  txtCapitalize: {
    textTransform: 'capitalize',
  },
  txtUpper: {
    textTransform: 'uppercase',
  },
  txtUnderline: {
    textDecorationLine: 'underline',
  },
  noTransform: {
    textTransform: 'none',
  },
  /* Text Specific Size */
  fs11: {
    fontSize: Scale(11),
  },
  fs12: {
    fontSize: Scale(12),
  },
  fs13: {
    fontSize: Scale(13),
  },
  fs14: {
    fontSize: Scale(14),
  },
  fs15: {
    fontSize: Scale(15),
  },
  fs16: {
    fontSize: Scale(16),
  },
  fs18: {
    fontSize: Scale(18),
  },
  fs20: {
    fontSize: Scale(20),
  },
  fs22: {
    fontSize: Scale(22),
  },
  fs24: {
    fontSize: Scale(24),
  },
  fs26: {
    fontSize: Scale(26),
  },
  fs28: {
    fontSize: Scale(28),
  },
  fs30: {
    fontSize: Scale(30),
  },
  /* Text Weight */
  w100: {
    fontWeight: '100',
  },
  w200: {
    fontWeight: '200',
  },
  w300: {
    fontWeight: '300',
  },
  w400: {
    fontWeight: '400',
  },
  w500: {
    fontWeight: '500',
  },
  w600: {
    fontWeight: '600',
  },
  w700: {
    fontWeight: '700',
  },
  w800: {
    fontWeight: '800',
  },
  w900: {
    fontWeight: '900',
  },
  wBold: {
    fontWeight: 'bold',
  },
  wNormal: {
    fontWeight: 'normal',
  },
});

export { FontStyle };
