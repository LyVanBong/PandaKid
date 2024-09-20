import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import Header from '../../../components/header';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { HStack, VStack, useToast } from 'native-base';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { images } from '../../../assets/images/const';
import CustomTextInput from '../../../components/Input/TextInput';
import { Controller, useForm } from 'react-hook-form';
import LongButton from '../../../components/Button/LongButton';
import Toast from '../../../components/Toast/Toast';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../routers/ScreensName';
import useCustomToast from '../../../hooks/useToast';
import { firebaseError } from '../../../firebaseError/firebase-error';
import firestore, { Filter } from '@react-native-firebase/firestore';
import { TypeAccount } from '../../../model/type-account';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RegisterData } from '../../../model/register';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../service/auth';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<RegisterData>({
    defaultValues: {
      email: '',
      displayName: '',
      phoneNumber: '',
      password: '',
      rePassword: '',
      typeAccount: TypeAccount.Basic,
    },
    mode: 'onChange',
  });
  const navigation = useNavigation();
  const toast = useCustomToast();

  // const signIn = (email: string, password: string) => {
  //   auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((e: any) => {
  //       // console.log(e?.user);
  //       e?.user.updateProfile({
  //         displayName: 'Basic',
  //       });
  //       toast.show({ type: 'success', msg: 'Đăng kí thành công' });
  //       navigation.navigate(Screens.LoginScreen as never);
  //     })
  //     .catch((error) => {
  //       toast.show({ type: 'error', msg: firebaseError(error) });
  //     });
  // };

  const validateEmail = (email: any) => {
    // const emailRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    return emailRegex.test(email);
  };

  const validateViPhoneNumber = (phoneNumber: any) => {
    // const emailRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneNumberRegex = /^(0[1-9][0-9]{8}|84[1-9][0-9]{8})$/;

    return phoneNumberRegex.test(phoneNumber);
  };
  // Kiểm tra mật khẩu trong React Native và đảm bảo rằng nó phải chứa ít nhất 6 kí tự, bao gồm chữ cái, chữ số và kí tự đặc biệt
  const validatePassword = (password: any) => {
    // const emailRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;

    return passwordRegex.test(password);
  };

  const checkIsExistedEmail = async (email: string) => {
    const value = await firestore().collection('account').doc(email).get();
    return value.exists;
  };

  const checkIsExistedPhoneNumber = async (phoneNumber: string) => {
    let isExistedPhoneNumber = false;
    const database = await firestore().collection('account').get();
    database?.forEach((data) => {
      if (data?.data()?.phoneNumber === phoneNumber) {
        isExistedPhoneNumber = true;
      }
    });
    return isExistedPhoneNumber;
  };

  const sendVerificationCodeMutation = useMutation<
    FirebaseAuthTypes.ConfirmationResult,
    any,
    RegisterData,
    any
  >({
    mutationFn: (registerData) =>
      authService.sendVerificationCodeToPhoneNumber(
        String(registerData.phoneNumber)
      ),
    onSuccess: (res, registerData) => {
      navigation.navigate(
        Screens.GetCodeScreen as never,
        {
          data: registerData,
        } as never
      );
    },
    onError: (error: any) => {
      console.warn('err', error);
      toast.show({ type: 'error', msg: firebaseError(error) });
    },
  });

  const onSubmit = async (data: RegisterData) => {
    const isExistEmail = await checkIsExistedEmail(String(data?.email).trim());
    const isExistedPhoneNumber = await checkIsExistedPhoneNumber(
      String(data?.phoneNumber).trim()
    );
    if (isExistEmail) {
      return toast.show({ type: 'error', msg: 'Email đã được sử dụng' });
    }
    if (isExistedPhoneNumber) {
      return toast.show({ type: 'error', msg: 'SDT đã được sử dụng' });
    }

    return sendVerificationCodeMutation.mutate(data);
  };

  // const test = async () => {
  //   const value = await firestore().collection('account').get();
  //
  //   value?.forEach((e) => console.log(e.data()));
  //   console.log(value);
  // };

  return (
    <Container>
      <Header visible={false} title='Đăng ký' />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <VStack paddingTop={sizeHeight(0)}>
          <VStack paddingTop={sizeHeight(5)} alignSelf={'center'} space={3}>
            {/* Email */}
            <Controller
              control={control}
              rules={{
                required: true,
                validate: (value) => validateEmail(value),
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
                * Hãy nhập đúng
              </Text>
            )}

            {/*DisplayName*/}

            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 50,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  placeholder='Tên hiển thị'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='displayName'
            />
            {errors.displayName && (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'flex-end',
                  fontSize: fontSize(3),
                }}
              >
                * Hãy nhập đúng
              </Text>
            )}

            {/* PhoneNumber */}

            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 10,
                maxLength: 10,

                validate: (value) => validateViPhoneNumber(value),
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  placeholder='Số điện thoại'
                  onBlur={onBlur}
                  inputMode={'tel'}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='phoneNumber'
            />
            {errors.phoneNumber && (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'flex-end',
                  fontSize: fontSize(3),
                }}
              >
                * Hãy nhập đúng
              </Text>
            )}

            {/* Password */}
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 6,
                validate: (value) => validatePassword(value),
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
                * Hãy nhập đúng
              </Text>
            )}
            <Controller
              control={control}
              rules={{
                validate: (value) => value === watch('password'),
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  placeholder='Xác nhận mật khẩu'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  rightIconShow={true}
                />
              )}
              name='rePassword'
            />
            {errors.rePassword && (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'flex-end',
                  fontSize: fontSize(3),
                }}
              >
                * Hãy nhập đúng
              </Text>
            )}

            <VStack space={5} style={{ top: sizeHeight(3) }}>
              <LongButton
                titleStyle={{ fontSize: fontSize(4.5), fontWeight: 'bold' }}
                onPress={handleSubmit(onSubmit)}
                // onPress={() =>
                //   navigation.navigate(Screens.GetCodeScreen as never)
                // }
                title='Đăng ký'
              />
              <HStack space={1} alignSelf={'center'}>
                <Text style={{ fontSize: fontSize(3.5) }}>
                  Bạn đã có tài khoản?
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(Screens.LoginScreen as never)
                  }
                >
                  <Text style={{ fontSize: fontSize(3.5), fontWeight: '600' }}>
                    Đăng nhập
                  </Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
