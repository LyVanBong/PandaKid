import React, { useEffect, useRef } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../../components/Container';
import Header from '../../../components/header';
import CustomTextInput from '../../../components/Input/TextInput';
import LongButton from '../../../components/Button/LongButton';
import { Screens } from '../../../routers/ScreensName';
import { useNavigation, useRoute } from '@react-navigation/native';
import SquareTextInput from '../../../components/square-text-input';
import { RegisterData } from '../../../model/register';
import useCustomToast from '../../../hooks/useToast';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../service/auth';
import { firebaseError } from '../../../firebaseError/firebase-error';
import auth from '@react-native-firebase/auth';

const ResetPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as any;
  const data: RegisterData = params?.data;

  const toast = useCustomToast();

  const sendEmailReset = () => {
    auth()
      .sendPasswordResetEmail(data.email)
      .then((success) => console.log(success))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    sendEmailReset();
  }, []);

  return (
    <Container>
      <Header
        onBackPress={() => navigation.goBack()}
        visible={true}
        title={'Đặt lại mật khẩu'}
      />
      <View
        style={{
          flex: 1,
          padding: 15,
          top: 50,
          gap: 40,
        }}
      >
        <Text style={{ color: '#636363', alignSelf: 'center' }}>
          Hãy làm theo các bước hướng dẫn đã được gửi về email {data?.email} để
          đặt lại mật khẩu
        </Text>

        <LongButton
          onPress={() => navigation.navigate(Screens.LoginScreen as never)}
          title={'Xác nhận'}
        />
      </View>
    </Container>
  );
};

export default ResetPassword;
