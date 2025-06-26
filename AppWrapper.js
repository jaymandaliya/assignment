import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as StoreProvider } from 'react-redux';
import { AppStyle } from './app/theme';
import App from './App';
import { store } from './app/store';
const AppWrapper = () => {
  return (
    <GestureHandlerRootView style={AppStyle.fill}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StoreProvider store={store}>
          <App />
        </StoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default AppWrapper;
