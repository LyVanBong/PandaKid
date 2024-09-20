import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { images } from '../../../assets/images/const';
import Container from '../../../components/Container';
import { Controller, useForm } from 'react-hook-form';
import CustomTextInput from '../../../components/Input/TextInput';
import { fontSize } from '../../../utils/Utils';
import Header from '../../../components/header';
import { useNavigation } from '@react-navigation/native';
import LongButton from '../../../components/Button/LongButton';
import auth from '@react-native-firebase/auth';
import useCustomToast from '../../../hooks/useToast';
import toast from '../../../components/Toast/Toast';
import { firebaseError } from '../../../firebaseError/firebase-error';
import * as Keychain from 'react-native-keychain';

const ChangePassword = () => {
  const toast = useCustomToast();
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      reNewPassword: '',
    },
    mode: 'onChange',
  });
  const navigation = useNavigation();

  const updatePassword = async (newPassword: string) => {
    const value = await Keychain.getGenericPassword();

    const credentials = auth.EmailAuthProvider.credential(
      value?.username,
      value?.password
    );
    const valueCredential =
      await auth().currentUser?.reauthenticateWithCredential(credentials);

    auth()
      .currentUser?.updatePassword(newPassword)
      .then((success) => {
        toast.show({ type: 'success', msg: 'Cập nhật thành công' });
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        toast.show({ type: 'error', msg: firebaseError(err) });
      });
  };
  const validatePassword = (password: any) => {
    // const emailRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;

    return passwordRegex.test(password);
  };

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const value = await Keychain.getGenericPassword();
      if (value?.password !== data?.oldPassword) {
        return toast.show({ type: 'error', msg: 'Mật khẫu cũ không đúng' });
      }
      return await updatePassword(data?.newPassword);
    } catch (error: any) {
      toast.show({ type: 'error', msg: error });
    }
  };
  return (
    <Container backgroundSource={images.MainBackground}>
      <Header onBackPress={() => navigation.goBack()} title={'Đổi mật khẩu'} />

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          padding: 20,
          marginTop: 20,
          gap: 25,
          alignContent: 'center',
        }}
      >
        <View style={{ gap: 15, alignItems: 'center' }}>
          <Text>
            Mật khẩu của bạn bao gổm ít nhất 6 ký tự bao gồm chữ cái, chữ số và
            kí tự đặc biệt(!$@%)
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View style={{ gap: 5 }}>
                <CustomTextInput
                  placeholder='Mật khẩu hiện tại '
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  rightIconShow={true}
                />
                {error && (
                  <Text
                    style={{
                      color: 'red',
                      alignSelf: 'flex-end',
                      fontSize: fontSize(3),
                    }}
                  >
                    *Hãy nhập đúng
                  </Text>
                )}
              </View>
            )}
            name='oldPassword'
          />

          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 6,
              validate: (value) => validatePassword(value),
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View style={{ gap: 5 }}>
                <CustomTextInput
                  placeholder='Mật khẩu mới '
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  rightIconShow={true}
                />
                {error && (
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
              </View>
            )}
            name='newPassword'
          />

          <Controller
            control={control}
            rules={{
              required: true,
              validate: (value) => value === watch('newPassword'),
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View style={{ gap: 5 }}>
                <CustomTextInput
                  placeholder='Nhập lại mật khẩu mới '
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  rightIconShow={true}
                />
                {error && (
                  <Text
                    style={{
                      color: 'red',
                      alignSelf: 'flex-end',
                      fontSize: fontSize(3),
                    }}
                  >
                    * Mật khẩu không khớp
                  </Text>
                )}
              </View>
            )}
            name='reNewPassword'
          />
        </View>
        <LongButton
          titleStyle={{ fontSize: fontSize(4.5), fontWeight: 'bold' }}
          onPress={handleSubmit(onSubmit)}
          title={'Xác nhận'}
        />
      </View>
    </Container>
  );
};

export default ChangePassword;
