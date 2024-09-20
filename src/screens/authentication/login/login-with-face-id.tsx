import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { HStack, VStack } from 'native-base';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { images } from '../../../assets/images/const';
import LongButton from '../../../components/Button/LongButton';
import { Screens } from '../../../routers/ScreensName';
import TextInputWithFaceId from './text-input-with-face-id';
import { useNavigation } from '@react-navigation/native';
import asyncStorageService from '../../../service/async-storage';
import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';
import { RegisterData } from '../../../model/register';
import { observer } from 'mobx-react';
import { useQuery } from '@tanstack/react-query';

const LoginWithFaceId = observer(
  ({
    onLoginWithOtherAccountPress,
    handleLoginWithFaceId,
  }: {
    onLoginWithOtherAccountPress: () => void;
    handleLoginWithFaceId: (email: string, password: string) => void;
  }) => {
    const navigation = useNavigation();

    const [value, setValue] = useState('');

    const { data } = useQuery<RegisterData>({
      queryKey: ['getProfile'],
      queryFn: () => asyncStorageService.getUserProfile(),
    });

    const authenticatedWithFaceId = async () => {
      try {
        const authenticate = await TouchID.authenticate();
        const keychainValue = await Keychain.getGenericPassword();
        console.log(keychainValue);
        handleLoginWithFaceId(
          String(keychainValue?.username),
          String(keychainValue?.password)
        );
      } catch (e) {
        console.log(e);
      }
    };

    const onFaceIdPress = async () => {
      await authenticatedWithFaceId();
    };

    const onLoginPress = async () => {
      const keychainValue = await Keychain.getGenericPassword();
      handleLoginWithFaceId(String(keychainValue?.username), value);
    };

    return (
      <VStack style={{ gap: 15 }} paddingTop={sizeHeight(2)}>
        <Image
          source={images.loginFaceIdAvatar}
          style={{
            width: sizeWidth(50),
            alignSelf: 'center',
            height: sizeHeight(15),
          }}
          resizeMode='contain'
        />
        <View style={{ alignSelf: 'center', gap: 5 }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#444444',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Xin chào,
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: '#444444',
              fontSize: 30,
              fontWeight: 'bold',
            }}
          >
            {data?.displayName}
          </Text>
        </View>

        <TextInputWithFaceId
          onFaceIdPress={onFaceIdPress}
          placeholder={'Mật khẩu'}
          rightIconShow={true}
          value={value}
          onChangeText={(e: string) => setValue(e)}
        />

        <LongButton
          titleStyle={{ fontSize: fontSize(4.5), fontWeight: 'bold' }}
          onPress={onLoginPress}
          title='Đăng nhập'
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(Screens.ResetPasswordStack as never)
            }
          >
            <Text style={{ color: '#666666', fontWeight: 'bold' }}>
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onLoginWithOtherAccountPress}>
            <Text style={{ color: '#666666', fontWeight: 'bold' }}>
              Đăng nhập bằng tài khoản khác
            </Text>
          </TouchableOpacity>
        </View>
      </VStack>
    );
  }
);

export default LoginWithFaceId;
