/**
 * Sample React Native TestApp
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  NativeModules,
  Button,
  Linking,
  Alert,
} from 'react-native';

const {DynamicIslandModule} = NativeModules;
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const TestApp = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handlerDeepLink = url => {
    const action = url.replace('dynamicisland://', '');
    DynamicIslandModule.endFoodOrderActivity();
    Alert.alert(action);
  };

  useEffect(() => {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          handlerDeepLink(url);
        }
      })
      .catch(err => {
        console.warn('An error occurred', err);
      });
    Linking.addEventListener('url', ({url}) => {
      if (url) {
        handlerDeepLink(url);
      }
    });
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button
            title="Start Activity"
            onPress={() =>
              DynamicIslandModule.startFoodOrderActivity(
                '8 min',
                'Hoà Phan Dev',
                '8 min',
              )
            }
          />
          <Button
            title="Update Activity"
            onPress={() =>
              DynamicIslandModule.updateFoodOrderActivity(
                'Food is any substance consumed to provide nutritional support for an organism',
              )
            }
          />
          <Button
            title="End Activity"
            onPress={() => DynamicIslandModule.endFoodOrderActivity()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestApp;
