import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Container from '../../../components/Container';
import Header from '../../../components/header';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../../components/Input/TextInput';
import LongButton from '../../../components/Button/LongButton';
import { Screens } from '../../../routers/ScreensName';
import { Controller, useForm } from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import useCustomToast from '../../../hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { RegisterData } from '../../../model/register';
import { authService } from '../../../service/auth';
import { firebaseError } from '../../../firebaseError/firebase-error';

const EnterPhoneNumber = () => {
  const navigation = useNavigation();

  const toast = useCustomToast();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const checkIsExistedEmail = async (email: string) => {
    const value = await firestore().collection('account').doc(email).get();
    return value.exists;
  };
  const getAccountDetails = async (email: any) => {
    const data = await firestore().collection('account').doc(email).get();
    return data.data();
  };

  const onSubmit = async (data: any) => {
    const isExisted = await checkIsExistedEmail(data?.email);
    if (isExisted) {
      const details = await getAccountDetails(data?.email);
      return navigation.navigate(
        Screens.ResetPassword as never,
        {
          data: details,
        } as never
      );
    }
    return toast.show({
      type: 'error',
      msg: 'Tải khoản sai',
    });
    // navigation.navigate(Screens.ResetPassword as never);
  };
  return (
    <Container>
      <Header
        onBackPress={() => navigation.goBack()}
        visible={true}
        title={'Quên mật khẩu'}
      />

      <View
        style={{
          padding: 25,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <Text>Nhập email đã đăng kí </Text>

        <Controller
          name={'email'}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View style={{ gap: 5 }}>
              <CustomTextInput
                value={value}
                onChangeText={onChange}
                placeholder={'Nhập email đã đăng kí'}
              />
              {error && (
                <Text style={{ alignSelf: 'flex-end', color: 'red' }}>
                  * Hãy nhập email
                </Text>
              )}
            </View>
          )}
        />

        <LongButton
          title={'Tiếp tục'}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Container>
  );
};

export default EnterPhoneNumber;
