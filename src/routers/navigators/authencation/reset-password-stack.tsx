import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../../screens/authenticated/Homescreen/HomeScreen';
import IntroduceScreen from '../../../screens/authentication/IntroduceScreen/IntroduceScreen';
import Test from '../../../screens/authentication/test';
import { Screens } from '../../ScreensName';
import LoginScreen from '../../../screens/authentication/login/LoginScreen';
import RegisterScreen from '../../../screens/authentication/register';
import GetCodeScreen from '../../../screens/authentication/register/get-code-screen';
import EnterPhoneNumber from '../../../screens/authentication/reset-password/enter-phone-number';
import ResetPassword from '../../../screens/authentication/reset-password';

const ResetPassWordStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.EnterPhoneNumber}
        component={EnterPhoneNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.ResetPassword}
        component={ResetPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ResetPassWordStack;

const styles = StyleSheet.create({});
