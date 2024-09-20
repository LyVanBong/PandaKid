/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigator from './src/routers/navigators/AppNavigator';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'mobx-react';
import stores from './src/stores';
import LoadingSpinner from './src/components/loading-spinner';
import CameraOption from './src/components/camera-option';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './src/service/query-client';
import UpdateModal from './src/components/update-modal';
import DescriptionUpdateModal from './src/components/description-update-modal';
import { LogBox } from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs();
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider {...stores}>
          <NativeBaseProvider>
            <NavigationContainer>
              <AppNavigator />
              <LoadingSpinner />
              <CameraOption />
              <UpdateModal />
              <DescriptionUpdateModal />
            </NavigationContainer>
          </NativeBaseProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
};
export default App;
