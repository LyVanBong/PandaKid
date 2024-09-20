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
import ResetPassWordStack from './reset-password-stack';

const AuthenticationNavigatior = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.IntroduceScreen}
        component={IntroduceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.LoginScreen}
        component={LoginScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={Screens.RegisterScreen}
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={Screens.ResetPasswordStack}
        component={ResetPassWordStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.GetCodeScreen}
        component={GetCodeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigatior;

const styles = StyleSheet.create({});
