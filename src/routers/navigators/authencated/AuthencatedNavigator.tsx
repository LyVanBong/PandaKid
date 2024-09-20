import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../../screens/authenticated/Homescreen/HomeScreen';
import IntroduceScreen from '../../../screens/authentication/IntroduceScreen/IntroduceScreen';
import Test from '../../../screens/authentication/test';
import { Screens } from '../../ScreensName';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './home-stack';
import SettingScreen from '../../../screens/authenticated/setting';
import StorageStack from './storage-stack';
import ArrangeWordsScreen from '../../../screens/authenticated/arrange-words';
import { HStack, VStack } from 'native-base';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { images } from '../../../assets/images/const';
import { Icon } from '../../../assets/icons/const';
import WordScreen from '../../../screens/authenticated/words';
import AddCategory from '../../../screens/authenticated/add-category';
import AddWord from '../../../screens/authenticated/add-word';
import AddWordToStorage from '../../../screens/authenticated/add-word-to-storage';
import SettingStack from './setting-stack';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // borderWidth: 1,
          bottom: 20,
          width: sizeWidth(90),
          left: sizeWidth(5),
          right: sizeWidth(5),
          position: 'absolute',
          borderRadius: 15,
          height: sizeHeight(8),
          ...styles.shadow,
          // alignContent: 'center'
        },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <VStack style={{ top: Platform.OS === 'android' ? 0 : 15 }}>
                  <Image
                    style={styles.icon}
                    source={focused ? Icon.focusHouse : Icon.house}
                    resizeMode='contain'
                  />
                  <Text
                    style={{
                      fontSize: fontSize(3),
                      fontWeight: '400',
                      color: focused ? '#7AA6FE' : 'black',
                    }}
                  >
                    Trang chủ
                  </Text>
                </VStack>
              </>
            );
          },
          tabBarShowLabel: false,
          // tabBarStyle: {
          //   display: 'none'
          // }
        }}
        name={Screens.HomeStack}
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <VStack style={{ top: Platform.OS === 'android' ? 0 : 15 }}>
                  <Image
                    style={styles.icon}
                    source={focused ? Icon.focusBook : Icon.book}
                    resizeMode='contain'
                  />
                  <Text
                    style={{
                      fontSize: fontSize(3),
                      fontWeight: '400',
                      color: focused ? '#7AA6FE' : 'black',
                    }}
                  >
                    Ghép từ
                  </Text>
                </VStack>
              </>
            );
          },
          tabBarShowLabel: false,
        }}
        name={Screens.ArrangeWord}
        component={ArrangeWordsScreen}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <VStack style={{ top: Platform.OS === 'android' ? 0 : 15 }}>
                  <Image
                    style={styles.icon}
                    source={focused ? Icon.focusStar : Icon.star}
                    resizeMode='contain'
                  />
                  <Text
                    style={{
                      fontSize: fontSize(3),
                      fontWeight: '400',
                      color: focused ? '#7AA6FE' : 'black',
                    }}
                  >
                    Kho ghép từ
                  </Text>
                </VStack>
              </>
            );
          },
          tabBarShowLabel: false,
        }}
        name={Screens.StorageStack}
        component={StorageStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <VStack style={{ top: Platform.OS === 'android' ? 0 : 15 }}>
                  <Image
                    style={styles.icon}
                    source={focused ? Icon.focusPanda : Icon.panda}
                    resizeMode='contain'
                  />
                  <Text
                    style={{
                      fontSize: fontSize(3),
                      fontWeight: '400',
                      color: focused ? '#7AA6FE' : 'black',
                    }}
                  >
                    Cài đặt
                  </Text>
                </VStack>
              </>
            );
          },
          tabBarShowLabel: false,
        }}
        name={Screens.SettingStack}
        component={SettingStack}
      />
    </Tab.Navigator>
  );
};
const AuthencatedNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.BottomTabNavigator}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.WordScreens}
        component={WordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'test'}
        component={Test}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.AddCategory}
        component={AddCategory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.AddWord}
        component={AddWord}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.AddWordToStorage}
        component={AddWordToStorage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthencatedNavigator;

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  shadow: {
    shadowColor: 'gray',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
