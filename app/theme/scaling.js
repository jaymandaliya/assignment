import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const Scale = size => (shortDimension / guidelineBaseWidth) * size;
const VerticalScale = size => (longDimension / guidelineBaseHeight) * size;
const ModerateScale = (size, factor = 0.5) =>
  size + (Scale(size) - size) * factor;

export {Scale, VerticalScale, ModerateScale, width, height};
