import {
  Button,
  Image,
  Linking,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import { VStack } from 'native-base';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import Header from '../../../components/header';
import ExitButton from './buton';
import ConfirmModal from '../../../components/confirm-modal';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../routers/ScreensName';
import { Icon } from '../../../assets/icons/const';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UIStore from '../../../stores/ui';
import useStores from '../../../hooks/use-stores';
import SessionStore from '../../../stores/session';
import useCustomToast from '../../../hooks/useToast';
import TouchID from 'react-native-touch-id';
import asyncStorageService from '../../../service/async-storage';
import { useQuery } from '@tanstack/react-query';
import { observer } from 'mobx-react';
import { TypeAccount } from '../../../model/type-account';
import { RegisterData } from '../../../model/register';
import * as Keychain from 'react-native-keychain';
import moment from 'moment';

const SettingScreen = observer(() => {
  const [confirmModal, setConfirmModal] = React.useState(false);
  const navigation = useNavigation();
  const uiStore: UIStore = useStores().uiStore;
  const sessionStore: SessionStore = useStores().sessionStore;
  const [isEnabled, setIsEnabled] = useState(false);
  const { typeAccount } = sessionStore.typeAccount;
  const toast = useCustomToast();

  const {} = useQuery({
    queryKey: ['checkIsFaceIdEnabled'],
    queryFn: () => asyncStorageService.getFaceIdIsEnabled(),
    onSuccess: (data) => {
      setIsEnabled(data);
    },
  });

  const { data: isFaceIdEnabled, refetch } = useQuery({
    queryKey: ['checkIsFaceIdEnabled'],
    queryFn: () => asyncStorageService.getFaceIdIsEnabled(),
    onSuccess: (success) => {
      setIsEnabled(isFaceIdEnabled);
    },
  });

  const handleLogout = () => {
    setConfirmModal(!confirmModal);
    auth()
      .signOut()
      .then(async (success) => {
        sessionStore.setData({ storage: [] });
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('type_account');
        navigation.reset({
          index: 0,
          routes: [{ name: Screens.AuthenticationNavigator as never }],
        });
      })
      .catch((err) => toast.show({ type: 'error', msg: err }));
  };

  const { data } = useQuery<RegisterData>({
    queryKey: ['getProfile'],
    queryFn: () => asyncStorageService.getUserProfile(),
  });

  const authenticatedWithFaceId = async () => {
    TouchID.isSupported()
      .then(async (biometryType) => {
        try {
          const value = await TouchID.authenticate();
          await asyncStorageService.setIsFaceIdIsEnabled(true);
        } catch (e) {
          console.log(e);
          setIsEnabled((previousState) => !previousState);
        }
      })
      .catch((err) => {
        toast.show({ type: 'error', msg: 'Thiết bị không hỗ trợ FaceID' });
      });
  };

  const clearKeychain = async () => {
    // await Keychain.resetGenericPassword();
    await asyncStorageService.setIsFaceIdIsEnabled(false);
  };

  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);

    if (!isEnabled) {
      // await storeAccountKeyChain();
      return await authenticatedWithFaceId();
    }
    return await clearKeychain();
  };

  const onPress = async () => {
    const creatTime = moment().format('yyyyMMDDHHmmss').toString();
    const url = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Version=2.1.0&vnp_Command=pay&vnp_TmnCode=N2UC4LTH&vnp_Amount=1806000&vnp_CreateDate=${creatTime}&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang1+%3A5&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fdomainmerchant.vn%2FReturnUrl&vnp_TxnRef=5&vnp_SecureHash=LFORJHTAXAVQHAMQORAQXQRGOOPRQGZE`;
    await Linking.openURL(url);
    console.log(creatTime);
  };

  return (
    <Container backgroundSource={images.MainBackground}>
      <Header visible={false} title='Cài đặt' />
      {/*<Button title={'test'} onPress={onPress} />*/}
      <VStack
        marginTop={sizeHeight(8)}
        w={'90%'}
        style={{ paddingVertical: 20 }}
        alignSelf={'center'}
        borderWidth={3}
        borderColor={'white'}
        borderRadius={sizeWidth(2)}
        backgroundColor={'#A4B8E1'}
        alignItems={'center'}
        space={2}
      >
        <Image
          source={
            typeAccount === TypeAccount.Basic
              ? images.Avatar
              : images.PremiumAvatar
          }
          style={{ width: 100, height: 100, alignSelf: 'center' }}
          resizeMode='contain'
        />
        <Text
          style={{ fontSize: fontSize(5), fontWeight: 'bold', color: 'white' }}
        >
          {data?.displayName}
        </Text>
        <Text style={{ fontSize: fontSize(4), color: 'white' }}>
          {data?.email}
        </Text>
      </VStack>

      <VStack margin={5} space={1}>
        {typeAccount === TypeAccount.Basic && (
          <ExitButton
            onPress={() => uiStore.showDescriptionUpdateModal()}
            title={'Nâng cấp tài khoản'}
            source={Icon.update}
          />
        )}
        <ExitButton
          title={'Đổi mật khẩu'}
          source={Icon.lockIcon}
          onPress={() => {
            const currentUser = auth().currentUser;
            if (!!currentUser?.phoneNumber) {
              navigation.navigate(Screens.ChangePassword as never);
            } else {
              toast.show({
                type: 'error',
                msg: 'Tài khoản này không thể đổi mật khẩu',
              });
            }
            console.log('currentUser');
          }}
        />

        <View
          style={{
            width: sizeWidth(90),
            borderWidth: 3,
            alignSelf: 'center',
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignItems: 'flex-start',
            borderColor: 'white',
            borderRadius: sizeWidth(5),
            backgroundColor: '#A4B8E1',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              alignSelf: 'center',
            }}
          >
            <Image
              source={Icon.faceIdIcon}
              style={{ width: 20, height: 20 }}
              resizeMode='contain'
            />
            <Text
              style={{
                fontSize: fontSize(4),
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {'Đăng nhập bằng FaceID'}
            </Text>
          </View>

          <Switch
            trackColor={{ false: '9B9B9B', true: '#81b0ff' }}
            // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor='#9B9B9B'
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <ExitButton
          title={'Đăng xuất'}
          source={Icon.logout}
          onPress={() => setConfirmModal(!confirmModal)}
        />
      </VStack>
      <ConfirmModal
        isVisible={confirmModal}
        onDismiss={() => setConfirmModal(!confirmModal)}
        title='Bạn có chắc chắn muốn thoát ?'
        onConfirmPress={handleLogout}
      />
    </Container>
  );
});

export default SettingScreen;

const styles = StyleSheet.create({});
