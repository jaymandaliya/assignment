/**
 * @format
 */

import { AppRegistry, LogBox, Platform } from 'react-native';

// import { name as appName } from './app.json';
import AppWrapper from './AppWrapper';
import TestApp from './testApp';
const appName = Platform.select({
  ios: 'RNDynamicIslandDemo',
  android: 'QuickDrop',
});

AppRegistry.registerComponent(appName, () => TestApp);
LogBox.ignoreAllLogs(true)