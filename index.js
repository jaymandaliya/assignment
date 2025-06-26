/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';

import { name as appName } from './app.json';
import AppWrapper from './AppWrapper';

AppRegistry.registerComponent(appName, () => AppWrapper);
LogBox.ignoreAllLogs(true)