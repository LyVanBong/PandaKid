import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
// import Modal from 'react-native-modal/dist/modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HStack, Modal, Radio } from 'native-base';
import { images } from '../../assets/images/const';
import { fontSize, sizeHeight, sizeWidth } from '../../utils/Utils';
import { Icon } from '../../assets/icons/const';
import LongButton from '../Button/LongButton';
import UIStore from '../../stores/ui';
import useStores from '../../hooks/use-stores';
import { observer } from 'mobx-react';
import ConfirmModal from '../confirm-modal';
import useCustomToast from '../../hooks/useToast';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import asyncStorageService from '../../service/async-storage';

const DescriptionUpdateModal = observer(() => {
  const [value, setValue] = React.useState('1');
  const uiStore: UIStore = useStores().uiStore;
  const [confirmModal, setConfirmModal] = React.useState(false);
  const toast = useCustomToast();
  const onConfirmBuy = async () => {
    // auth().currentUser?.updateProfile({
    //   displayName: 'Premium',
    // });
    uiStore.hideDescriptionUpdateModal();
    // await asyncStorageService.setTypeAccount('Premium');
    toast.show({
      type: 'success',
      msg: 'Tính năng này đang phát triển\n Vui lòng liên hệ admin',
    });
    setConfirmModal(!confirmModal);
  };
  return (
    <Modal
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex: 1,
      }}
      // isVisible={true}
      isOpen={uiStore?.descriptionUpdateModal?.isVisible}
      onClose={() => uiStore.hideDescriptionUpdateModal()}
    >
      <View style={{ flex: 1, width: '100%' }}>
        <ImageBackground
          source={images.updateBackground}
          style={{ flex: 1, width: '100%', height: '100%' }}
          resizeMode='cover'
        >
          <SafeAreaView style={{ padding: 15 }}>
            <TouchableOpacity
              onPress={() => uiStore.hideDescriptionUpdateModal()}
              style={{ alignSelf: 'flex-start' }}
            >
              <Text
                style={{
                  fontSize: fontSize(5),
                  color: 'white',
                  fontWeight: '600',
                }}
              >
                X
              </Text>
            </TouchableOpacity>
            <View style={{ marginTop: sizeHeight(14), gap: sizeHeight(5) }}>
              <View style={{ paddingHorizontal: 40, alignSelf: 'center' }}>
                <Text
                  style={{
                    textAlign: 'center',

                    fontSize: 12,
                    color: 'white',
                  }}
                >
                  Tính năng với 1.453 người đang sử dụng và trải nghiệm ứng
                  dụng.
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'white',
                  fontWeight: '600',
                }}
              >
                Tận hưởng các tính năng
              </Text>
              <View style={{ gap: 15 }}>
                <DescriptionField
                  source={Icon.updateIcon1}
                  txt='Cá nhân hóa kho từ của bạn'
                />
                <DescriptionField
                  source={Icon.updateIcon2}
                  txt='Thêm không giới hạn từ về chủ đề'
                />
                <DescriptionField
                  source={Icon.updateIcon3}
                  txt='Cập nhật từ ngữ và hình ảnh theo sở thích'
                />
              </View>
              <Radio.Group
                name='myRadioGroup'
                accessibilityLabel='favorite number'
                value={value}
                onChange={(nextValue) => {
                  setValue(nextValue);
                }}
              >
                <OptionPursacheChoice
                  txt1='Mỗi năm 279.000 đ ( 23.250 đ/tháng)'
                  txt2={`ÍT HƠN${'\n'} 27%`}
                  isChoosed={value === '1'}
                  value='1'
                />
                <OptionPursacheChoice
                  txt1='30.000đ hàng tháng'
                  isChoosed={value === '2'}
                  value='2'
                />
              </Radio.Group>

              <LongButton
                titleStyle={{
                  fontWeight: '600',
                  fontSize: 15,
                }}
                onPress={() => setConfirmModal(!confirmModal)}
                title='Nâng cấp'
                style={{ width: '100%' }}
              />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
      <ConfirmModal
        isVisible={confirmModal}
        onDismiss={() => setConfirmModal(!confirmModal)}
        onConfirmPress={onConfirmBuy}
        title='Thông báo'
        title1={
          value === '1'
            ? 'Xác nhận thanh toán 279.000đ để nâng cấp lên tài khoản Premium?'
            : 'Xác nhận thanh toán 30.000đ/tháng để nâng cấp lên tài khoản Premium?'
        }
      />
    </Modal>
  );
});

export default DescriptionUpdateModal;

const styles = StyleSheet.create({});
const DescriptionField = ({ txt, source }: { txt?: string; source?: any }) => {
  return (
    <>
      <View style={{ flexDirection: 'row', gap: 5 }}>
        <Image
          source={source}
          style={{ width: 30, height: 30 }}
          resizeMode='cover'
        />
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
            fontSize: 15,
            fontWeight: '400',
          }}
        >
          {txt}
        </Text>
      </View>
    </>
  );
};
const OptionPursacheChoice = ({
  value,
  isChoosed = false,
  txt1,
  txt2,
}: {
  value?: any;
  isChoosed?: boolean;
  txt1?: string;
  txt2?: string;
}) => {
  return (
    <View
      style={{
        paddingVertical: 10,
        backgroundColor: isChoosed ? 'white' : 'transparent',
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: sizeWidth(4),
        margin: 5,
        borderWidth: 1,
        borderColor: 'white',
        width: sizeWidth(93),
      }}
    >
      <HStack space={3} justifyContent={'center'} alignItems={'center'}>
        <Radio style={{ left: 5 }} value={value} aria-label={value} my={1} />
        <Text style={{ color: isChoosed ? '#667685' : 'white', fontSize: 15 }}>
          {txt1}
        </Text>
      </HStack>
      <View
        style={{
          borderLeftWidth: 0.5,
          borderColor: '#667685',
          paddingHorizontal: 3,
        }}
      >
        <Text style={{ color: isChoosed ? '#667685' : 'white', fontSize: 15 }}>
          {txt2}
        </Text>
      </View>
    </View>
  );
};
