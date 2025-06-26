import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { navigationRef } from './utils';
import Products from '../screens/products';
import ProductDetail from '../screens/productDetail';
import OrderDetail from '../screens/orderDetail';
import TrackOrder from '../screens/trackOrder';
import Delivered from '../screens/delivered';

const Stack = createSharedElementStackNavigator();

const ApplicationNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        theme={{
          ...DefaultTheme,
          dark: false,
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            orientation: 'portrait',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          }}>
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            sharedElements={(route) => {
              const { productId } = route.params;
              return [
                {
                  id: `product.${productId}.image`,
                  animation: 'move',
                  resize: 'clip',
                },
                {
                  id: `product.${productId}.title`,
                  animation: 'fade',
                  resize: 'clip',
                },
              ];
            }}
          />
          <Stack.Screen name="OrderDetail" component={OrderDetail} />
          <Stack.Screen name="TrackOrder" component={TrackOrder} />
          <Stack.Screen name="Delivered" component={Delivered} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;