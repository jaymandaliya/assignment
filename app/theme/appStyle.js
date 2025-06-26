import { StyleSheet } from 'react-native';
import { Colors } from './colors';

const AppStyle = StyleSheet.create({
  /* Column Layouts */
  column: {
    flexDirection: 'column',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  colCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colVCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  colHCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  /* Row Layouts */
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowVCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowHCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fillRowCenter: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fillRowSpace: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fillRow: {
    flex: 1,
    flexDirection: 'row',
  },
  fillRowCross: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  fillRowMain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  col: {
    flexGrow: 1,
    flexBasis: 0,
  },
  flexGrow: { flexGrow: 1 },
  displayInBlock: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  /* Default Layouts */
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  alignItemsStretch: {
    alignItems: 'stretch',
  },
  alignItemsEnd: {
    alignItems: 'flex-end',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentRight: {
    justifyContent: 'flex-end',
  },
  justifyContentLeft: {
    justifyContent: 'flex-start',
  },
  justifyContentAround: {
    justifyContent: 'space-around',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  scrollSpaceAround: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  scrollSpaceBetween: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  selfStretch: {
    alignSelf: 'stretch',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  /* Sizes Layouts */
  fill: {
    flex: 1,
  },
  fillBg: {
    flex: 1,
    backgroundColor: Colors.white
  },
  hideOverFlow: {
    overflow: 'hidden',
  },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  /* Operation Layout */
  mirror: {
    transform: [{ scaleX: -1 }],
  },
  rotate90: {
    transform: [{ rotate: '90deg' }],
  },
  rotate90Inverse: {
    transform: [{ rotate: '-90deg' }],
  },
});

export { AppStyle };
