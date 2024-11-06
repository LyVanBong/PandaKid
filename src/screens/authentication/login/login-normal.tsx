import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { HStack, VStack } from 'native-base';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { images } from '../../../assets/images/const';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import CustomTextInput from '../../../components/Input/TextInput';
import LongButton from '../../../components/Button/LongButton';
import { Screens } from '../../../routers/ScreensName';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import useCustomToast from '../../../hooks/useToast';
import { Icon } from '../../../assets/icons/const';
import asyncStorageService from '../../../service/async-storage';
import { RegisterData } from '../../../model/register';
import { TypeAccount } from '../../../model/type-account';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginNormal = ({
  control,
  errors,
  onLoginPress,
}: {
  control?: Control<any>;
  errors: FieldErrors<{ email: string; password: string }>;
  onLoginPress: () => void;
}) => {
  const navigation = useNavigation();
  const toast = useCustomToast();
  GoogleSignin.configure({
    webClientId: '',
  });
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const { data } = await GoogleSignin.signIn();
      const idToken = data?.idToken;
      if (!!idToken) {
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const response = await auth().signInWithCredential(googleCredential);
        if (!!response) {
          const userProfile: RegisterData = {
            email: response.user.email ?? '',
            phoneNumber: response.user.phoneNumber ?? '',
            displayName: response.user.displayName ?? '',
            typeAccount: TypeAccount.Basic,
          };
          await asyncStorageService.setUserProfile(userProfile);
          const token = await response.user.getIdToken();
          console.log('token', token);
          await AsyncStorage.setItem('access_token', token);

          navigation.navigate(Screens.AuthenticatedNavigator as never);
        }
      }
    } catch (error) {
      toast.show({
        type: 'error',
        msg: 'Error when sign in google',
      });
    }
  }
  const onLoginGooglePress = () => {
    onGoogleButtonPress().then(() => console.log('Signed in with Google!'));
  };
  return (
    <VStack paddingTop={sizeHeight(10)}>
      <Image
        source={images.IntroImage1}
        style={{
          width: sizeWidth(65),
          alignSelf: 'center',
          height: sizeHeight(20),
        }}
        resizeMode='contain'
      />
      <VStack paddingTop={50} alignSelf={'center'} space={3}>
        {/* Email */}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              placeholder='Email'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='email'
        />
        {errors.email && (
          <Text
            style={{
              color: 'red',
              alignSelf: 'flex-end',
              fontSize: fontSize(3),
            }}
          >
            * Hãy nhập email
          </Text>
        )}

        {/* Password */}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              placeholder='Mật khẩu'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              rightIconShow={true}
            />
          )}
          name='password'
        />
        {errors.password && (
          <Text
            style={{
              color: 'red',
              alignSelf: 'flex-end',
              fontSize: fontSize(3),
            }}
          >
            * Hãy nhập password
          </Text>
        )}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(Screens.ResetPasswordStack as never)
          }
          style={{ alignSelf: 'flex-end' }}
        >
          <Text style={{ fontSize: fontSize(3.5) }}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <VStack space={5} style={{ top: sizeHeight(8) }}>
          <LongButton
            titleStyle={{ fontSize: fontSize(4.5), fontWeight: 'bold' }}
            onPress={onLoginPress}
            title='Đăng nhập'
          />
          <LongButton
            titleStyle={{
              fontSize: fontSize(3.5),
              fontWeight: 'bold',
              color: 'black',
            }}
            sourceIcon={Icon.googleIcon}
            onPress={onLoginGooglePress}
            title='Đăng nhập với Google'
            style={{ backgroundColor: 'white' }}
          />
          <HStack space={1} alignSelf={'center'}>
            <Text style={{ fontSize: fontSize(3.5) }}>Bạn chưa tài khoản?</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(Screens.RegisterScreen as never)
              }
            >
              <Text style={{ fontSize: fontSize(3.5), fontWeight: '600' }}>
                Đăng ký ngay
              </Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default LoginNormal;
