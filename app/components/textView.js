import React from 'react';
import {Platform, Text} from 'react-native';
import {Colors, FontFamily, Scale} from '../theme';
const TextView = ({
  text,
  fontSize,
  fontFamily,
  color,
  style,
  textAlignVertical,
  fontWeight,
  alignItems,
  textAlign,
  textTransform,
  subText,
  ...rest
}) => {
  return (
    <Text
      {...rest}
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          fontSize: fontSize,
          textTransform: textTransform ? textTransform : 'none',
          fontFamily: fontFamily ? fontFamily : FontFamily.regular,
          color: color ? color : Colors.black,
          textAlign: textAlign,
          alignItems: alignItems,
          textAlignVertical: textAlignVertical,
          fontWeight: Platform.OS === 'ios' ? fontWeight : 'normal',
        },
        style,
      ]}>
      {text}
    </Text>
  );
};
export default TextView;
