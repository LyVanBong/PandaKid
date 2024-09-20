import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../../../ScreensName';
import HomeScreen from '../../../../screens/authenticated/Homescreen/HomeScreen';
import StorageWord from '../../../../screens/authenticated/storage';


const StorageStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={Screens.StorageWord}
                component={StorageWord}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

export default StorageStack