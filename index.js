/**
 * @format
 */

import { AppRegistry, LogBox, Platform } from 'react-native';
import AppWrapper from './AppWrapper';
import TestApp from './testApp';
const appName = Platform.select({
  ios: 'RNDynamicIslandDemo',
  android: 'QuickDrop',
});

AppRegistry.registerComponent(appName, () => AppWrapper);
LogBox.ignoreAllLogs(true)