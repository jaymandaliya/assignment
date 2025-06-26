import React from 'react';
import { View } from 'react-native';
import { AppStyle, FontFamily, Layouts, Scale, Colors } from '../../theme';
import { TextView } from '../../components';

const LabelValueRow = ({ label, value }) => {
  return (
    <View style={[AppStyle.rowHCenter, AppStyle.justifyContentBetween, Layouts.mt15]}>
      <TextView
        text={label}
        fontFamily={FontFamily.medium}
        fontSize={Scale(16)}
        color={Colors.foundationWhite900}
      />
      <TextView
        text={value}
        fontFamily={FontFamily.medium}
        fontSize={Scale(16)}
        color={Colors.foundationBlack500}
      />
    </View>
  );
};

export default LabelValueRow;
