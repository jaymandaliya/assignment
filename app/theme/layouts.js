import {Platform, StyleSheet} from 'react-native';
import {Scale} from './scaling';

const Layouts = StyleSheet.create({
  /* Margin */
  mtn5: {
    marginTop: Platform.OS === 'ios' ? 0 : Scale(-5),
  },
  mt2: {
    marginTop: Scale(2),
  },
  mt3: {
    marginTop: Scale(3),
  },
  mt4: {
    marginTop: Scale(3),
  },
  mt5: {
    marginTop: Scale(5),
  },
  mt8: {
    marginTop: Scale(7),
  },
  mt10: {
    marginTop: Scale(10),
  },
  mt15: {
    marginTop: Scale(15),
  },
  mt18: {
    marginTop: Scale(19),
  },
  mt20: {
    marginTop: Scale(20),
  },
  mt25: {
    marginTop: Scale(25),
  },
  mt28: {
    marginTop: Scale(28),
  },
  mt30: {
    marginTop: Scale(30),
  },
  mt35: {
    marginTop: Scale(35),
  },
  mt45: {
    marginTop: Scale(45),
  },
  mt100: {
    marginTop: Scale(100),
  },
  mb0: {marginBottom: 0},
  mb2: {
    marginBottom: Scale(2),
  },
  mb3: {
    marginBottom: Scale(3),
  },
  mb4: {
    marginBottom: Scale(3),
  },
  mb5: {
    marginBottom: Scale(5),
  },
  mb6: {
    marginBottom: Scale(6),
  },
  mb10: {
    marginBottom: Scale(10),
  },
  mb15: {
    marginBottom: Scale(15),
  },
  mb20: {
    marginBottom: Scale(20),
  },
  mb30: {
    marginBottom: Scale(30),
  },

  ml2: {
    marginLeft: Scale(2),
  },
  ml3: {
    marginLeft: Scale(3),
  },
  ml4: {
    marginLeft: Scale(3),
  },
  ml5: {
    marginLeft: Scale(5),
  },
  ml6: {
    marginLeft: Scale(6),
  },
  ml7: {
    marginLeft: Scale(7),
  },
  ml8: {
    marginLeft: Scale(8),
  },
  ml10: {
    marginLeft: Scale(10),
  },
  ml15: {
    marginLeft: Scale(15),
  },
  ml20: {
    marginLeft: Scale(20),
  },
  ml25: {
    marginLeft: Scale(25),
  },
  mr2: {
    marginRight: Scale(2),
  },
  mr3: {
    marginRight: Scale(3),
  },
  mr4: {
    marginRight: Scale(3),
  },
  mr5: {
    marginRight: Scale(5),
  },
  mr7: {
    marginRight: Scale(7),
  },
  mr10: {
    marginRight: Scale(10),
  },
  mr15: {
    marginRight: Scale(15),
  },
  mr20: {
    marginRight: Scale(20),
  },
  mr30: {
    marginRight: Scale(30),
  },
  mr40: {
    marginRight: Scale(40),
  },

  vMargin2: {
    marginVertical: Scale(2.5),
  },
  vMargin5: {
    marginVertical: Scale(5),
  },
  vMargin7: {
    marginVertical: Scale(7),
  },
  vMargin10: {
    marginVertical: Scale(10),
  },
  vMargin15: {
    marginVertical: Scale(15),
  },
  vMargin20: {
    marginVertical: Scale(20),
  },
  vMargin25: {
    marginVertical: Scale(25),
  },
  vMargin30: {
    marginVertical: Scale(30),
  },

  hMargin5: {
    marginHorizontal: Scale(5),
  },
  hMargin0: {
    marginHorizontal: 0,
  },
  hMargin10: {
    marginHorizontal: Scale(10),
  },
  hMargin15: {
    marginHorizontal: Scale(15),
  },
  hMargin20: {
    marginHorizontal: Scale(20),
  },
  /* Padding */
  pt2: {
    paddingTop: Scale(2),
  },
  pt3: {
    paddingTop: Scale(3),
  },
  pt4: {
    paddingTop: Scale(3),
  },
  pt5: {
    paddingTop: Scale(5),
  },
  pt7: {
    paddingTop: Scale(7),
  },
  pt10: {
    paddingTop: Scale(10),
  },
  pt15: {
    paddingTop: Scale(15),
  },
  pt20: {
    paddingTop: Scale(20),
  },

  pb2: {
    paddingBottom: Scale(2),
  },
  pb3: {
    paddingBottom: Scale(3),
  },
  pb4: {
    paddingBottom: Scale(3),
  },
  pb5: {
    paddingBottom: Scale(5),
  },
  pb10: {
    paddingBottom: Scale(10),
  },
  pb15: {
    paddingBottom: Scale(15),
  },
  pb20: {
    paddingBottom: Scale(20),
  },

  pl2: {
    paddingLeft: Scale(2),
  },
  pl3: {
    paddingLeft: Scale(3),
  },
  pl4: {
    paddingLeft: Scale(3),
  },
  pl5: {
    paddingLeft: Scale(5),
  },
  pl10: {
    paddingLeft: Scale(10),
  },
  pl15: {
    paddingLeft: Scale(15),
  },
  pl16: {
    paddingLeft: Scale(16),
  },
  pl20: {
    paddingLeft: Scale(20),
  },

  pr2: {
    paddingRight: Scale(2),
  },
  pr3: {
    paddingRight: Scale(3),
  },
  pr4: {
    paddingRight: Scale(3),
  },
  pr5: {
    paddingRight: Scale(5),
  },
  pr10: {
    paddingRight: Scale(10),
  },
  pr15: {
    paddingRight: Scale(15),
  },
  pr20: {
    paddingRight: Scale(20),
  },
  vPadding3: {
    paddingVertical: Scale(3),
  },
  vPadding4: {
    paddingVertical: Scale(4),
  },
  vPadding5: {
    paddingVertical: Scale(5),
  },
  vPadding10: {
    paddingVertical: Scale(10),
  },
  vPadding15: {
    paddingVertical: Scale(15),
  },
  vPadding20: {
    paddingVertical: Scale(20),
  },

  vPadding25: {
    paddingVertical: Scale(25),
  },
  hPadding5: {
    paddingHorizontal: Scale(5),
  },
  hPadding3: {
    paddingHorizontal: Scale(3),
  },
  hPadding10: {
    paddingHorizontal: Scale(10),
  },
  hPadding15: {
    paddingHorizontal: Scale(15),
  },
  hPadding16: {
    paddingHorizontal: Scale(16),
  },
  hPadding20: {
    paddingHorizontal: Scale(20),
  },
  hPadding25: {
    paddingHorizontal: Scale(25),
  },
  hPadding30: {
    paddingHorizontal: Scale(30),
  },
  hPadding35: {
    paddingHorizontal: Scale(35),
  },
  hPadding40: {
    paddingHorizontal: Scale(40),
  },
  mb100: {marginBottom: 100},
});

export {Layouts};
