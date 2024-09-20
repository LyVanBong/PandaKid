import { StyleSheet } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../ScreensName';
import AuthenticationNavigatior from './authencation/AuthenticationNavigatior';
import AuthencatedNavigator from './authencated/AuthencatedNavigator';

const AppNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.AuthenticationNavigator}
        component={AuthenticationNavigatior}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.AuthenticatedNavigator}
        component={AuthencatedNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
