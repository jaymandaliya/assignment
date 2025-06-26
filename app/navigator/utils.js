import {
  StackActions,
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {Platform} from 'react-native';

export const navigationRef = createNavigationContainerRef();
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
const hapticOptions = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: true,
};
const hapticTriggerType = Platform.select({
  ios: 'impactLight',
  android: 'impactMedium',
});
export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    RNReactNativeHapticFeedback.trigger(hapticTriggerType, hapticOptions);
    navigationRef.navigate(name, params);
  }
};
export const navigateReplace = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef?.current.dispatch(StackActions.replace(name, params));
  }
};

export const navigateAndReset = (routes = [], index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  }
};

export const navigateAndSimpleReset = (name, index = 0, params = undefined) => {
  if (navigationRef.isReady()) {
    RNReactNativeHapticFeedback.trigger(hapticTriggerType, hapticOptions);
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{name, params: params}],
      }),
    );
  }
};

export const goBack = () => {
  RNReactNativeHapticFeedback.trigger(hapticTriggerType, hapticOptions);
  navigationRef.goBack();
};
