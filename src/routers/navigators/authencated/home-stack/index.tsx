import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../../../ScreensName';
import HomeScreen from '../../../../screens/authenticated/Homescreen/HomeScreen';
import WordScreen from '../../../../screens/authenticated/words';

const HomeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Screens.HomeScreen}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
