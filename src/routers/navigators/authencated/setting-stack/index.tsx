import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../../../ScreensName';
import SettingScreen from '../../../../screens/authenticated/setting';
import ChangePassword from '../../../../screens/authenticated/change-password';

const SettingStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Screens.SettingsScreen}
        component={SettingScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={Screens.ChangePassword}
        component={ChangePassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
