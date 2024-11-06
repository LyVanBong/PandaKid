import {
  Button,
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { HStack, VStack, useToast } from 'native-base';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { images } from '../../../assets/images/const';
import CustomTextInput from '../../../components/Input/TextInput';
import { Controller, useForm } from 'react-hook-form';
import Header from '../../../components/header';
import LongButton from '../../../components/Button/LongButton';
import Toast from '../../../components/Toast/Toast';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../routers/ScreensName';
import UIStore from '../../../stores/ui';
import useStores from '../../../hooks/use-stores';
import asyncStorageService from '../../../service/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import useCustomToast from '../../../hooks/useToast';
import LoginNormal from './login-normal';
import LoginWithFaceId from './login-with-face-id';
import firestore from '@react-native-firebase/firestore';
import * as Keychain from 'react-native-keychain';
import { firebaseError } from '../../../firebaseError/firebase-error';

const LoginScreen = () => {
  const [value, setvalue] = React.useState('');

  const toast = useCustomToast();
  const uiStore: UIStore = useStores().uiStore;
  const isLogin = async () => {
    const token = await AsyncStorage.getItem('access_token');
    console.log('token', token);
    if (token != null) {
      return true;
    }
    return false;
  };

  const {} = useQuery({
    queryKey: ['isLogin'],
    queryFn: isLogin,
    onSuccess: (res) => {
      if (res) {
        navigation.navigate(Screens.AuthenticatedNavigator as never);
      }
      // console.log(res);
    },
  });

  const { data: isFaceIdEnabled, refetch } = useQuery({
    queryKey: ['checkIsFaceIdEnabled'],
    queryFn: () => asyncStorageService.getFaceIdIsEnabled(),
    // onSuccess: (success) => {
    //   console.log('success', success);
    // },
  });

  const getTypeAccount = async (email: any) => {
    const data = await firestore().collection('account').doc(email).get();
    return data.data();
  };

  // const createCustomToken =()=>{
  //   auth().
  // }
  const handleLogin = (email: string, password: any) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (e: FirebaseAuthTypes.UserCredential) => {
        if (e.user) {
          uiStore.hideLoading();
          const profile = (await getTypeAccount(getValues('email'))) as any;
          await asyncStorageService.setUserProfile({
            ...profile,
          });
          const token = await e.user.getIdToken();
          console.log('token', token);
          await Keychain.resetGenericPassword();
          await Keychain.setGenericPassword(email, password);
          await AsyncStorage.setItem('access_token', token);
          toast.show({ type: 'success', msg: 'Đăng nhập thành công !' });

          navigation.navigate(Screens.AuthenticatedNavigator as never);
        } else {
          uiStore.hideLoading();
        }
        toast.show({ type: 'error', msg: 'Đăng nhập thất bại !' });
      })
      .catch((err) => {
        console.log(err);
        uiStore.hideLoading();
        toast.show({ type: 'error', msg: firebaseError(err) });
      });
  };

  const handleLoginWithFaceId = (email: string, password: any) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (e) => {
        if (e.user) {
          uiStore.hideLoading();
          await AsyncStorage.setItem('access_token', '123123123');
          toast.show({ type: 'success', msg: 'Đăng nhập thành công !' });

          navigation.navigate(Screens.AuthenticatedNavigator as never);
        } else {
          uiStore.hideLoading();

          toast.show({ type: 'error', msg: 'Đăng nhập thất bại1 !' });
        }
      })
      .catch((err) => {
        console.log(err);
        uiStore.hideLoading();
        toast.show({ type: 'error', msg: firebaseError(err) });
      });
  };
  const {
    watch,
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigation = useNavigation();
  const onSubmit = (data: any) => {
    uiStore.showLoading();
    handleLogin(data?.email, data?.password);
  };
  return (
    <ImageBackground
      resizeMode='stretch'
      style={{ flex: 1 }}
      source={images.background}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView>
          <Header visible={false} title='Đăng nhập' />
          {isFaceIdEnabled ? (
            <LoginWithFaceId
              handleLoginWithFaceId={handleLoginWithFaceId}
              onLoginWithOtherAccountPress={async () => {
                await asyncStorageService.setIsFaceIdIsEnabled(false);
                await refetch();
              }}
            />
          ) : (
            <LoginNormal
              onLoginPress={handleSubmit(onSubmit)}
              control={control}
              errors={errors}
            />
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textInput: {
    width: sizeWidth(50),
    height: sizeHeight(5),
    borderWidth: 1,
  },
});
