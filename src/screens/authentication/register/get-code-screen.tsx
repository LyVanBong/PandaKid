import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import Container from '../../../components/Container';
import Header from '../../../components/header';
import LongButton from '../../../components/Button/LongButton';
import SquareTextInput from '../../../components/square-text-input';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RegisterData } from '../../../model/register';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../service/auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Screens } from '../../../routers/ScreensName';
import useCustomToast from '../../../hooks/useToast';
import { firebaseError } from '../../../firebaseError/firebase-error';
import { TypeAccount } from '../../../model/type-account';

const GetCodeScreen = () => {
  const route = useRoute();
  const params = route.params as any;
  const data: RegisterData = params?.data;

  const navigation = useNavigation();

  const toast = useCustomToast();

  const {
    getValues,
    setFocus,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
    },
    mode: 'onChange',
  });

  const validateCodeError =
    errors.value1 ||
    errors.value2 ||
    errors.value3 ||
    errors.value4 ||
    errors.value5 ||
    errors.value6;

  const insertDataToFirebase = () => {
    const newData: RegisterData = {
      email: data.email,
      phoneNumber: data.phoneNumber,
      displayName: data.displayName,
      typeAccount: TypeAccount.Basic,
    };
    firestore()
      .collection('account')
      .doc(data.email)
      .set(newData)
      .then((success) => {
        toast.show({ type: 'success', msg: 'Đăng kí thành công' });
        navigation.navigate(Screens.LoginScreen as never);
      })
      .catch((error) => toast.show({ type: 'error', msg: error }));
  };

  const confirmCodeMutation = useMutation({
    mutationFn: ({
      phoneNumber,
      code,
    }: {
      phoneNumber: string;
      code: string;
    }) => authService.confirmVerificationCode(phoneNumber, code),
    onSuccess: (e) => {
      signUpAccount();
      insertDataToFirebase();
    },
    onError: (error: any) => {
      console.log(error?.code);
      toast.show({ type: 'error', msg: firebaseError(error) });
    },
  });

  const signUpAccount = () => {
    auth()
      .createUserWithEmailAndPassword(data.email, String(data.password))
      .then((e: any) => {})
      .catch((error) => {
        toast.show({ type: 'error', msg: firebaseError(error) });
      });
  };

  const signUp = (validateCodeData: any) => {
    let validateCode = '';
    for (const [key, value] of Object.entries(validateCodeData)) {
      validateCode = validateCode + value;
    }

    console.log(validateCode);
    confirmCodeMutation.mutate({
      phoneNumber: String(data.phoneNumber),
      code: validateCode,
    });
  };

  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();
  const ref5 = useRef<any>();
  const ref6 = useRef<any>();

  useEffect(() => {
    getValues('value1').length === 1 ? ref2?.current?.focus() : null;
    getValues('value2').length === 1 ? ref3?.current?.focus() : null;
    getValues('value3').length === 1 ? ref4?.current?.focus() : null;
    getValues('value4').length === 1 ? ref5?.current?.focus() : null;
    getValues('value5').length === 1 ? ref6?.current?.focus() : null;
  }, [watch()]);

  return (
    <Container>
      <Header visible={false} title={'Nhập mã xác minh'} />
      <View
        style={{
          flex: 1,
          padding: 15,
          top: 50,
          gap: 40,
        }}
      >
        <Text style={{ color: '#636363', alignSelf: 'center' }}>
          Nhập mã xác minh được gửi đến số {data.phoneNumber}
        </Text>
        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <SquareTextInput
                  value={value}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name={'value1'}
            />

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <SquareTextInput
                  value={value}
                  ref={ref2}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name={'value2'}
            />

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <SquareTextInput
                  value={value}
                  ref={ref3}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name={'value3'}
            />

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <SquareTextInput
                  value={value}
                  ref={ref4}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name={'value4'}
            />

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <SquareTextInput
                  value={value}
                  ref={ref5}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name={'value5'}
            />

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <SquareTextInput
                  value={value}
                  ref={ref6}
                  onChangeText={(text) => onChange(text)}
                />
              )}
              name={'value6'}
            />
          </View>
          {validateCodeError && (
            <Text style={{ textAlign: 'right', color: 'red' }}>
              Hãy nhập đủ 6 kí tự
            </Text>
          )}
        </View>

        <LongButton onPress={handleSubmit(signUp)} title={'Xác nhận'} />
      </View>
    </Container>
  );
};

export default GetCodeScreen;
