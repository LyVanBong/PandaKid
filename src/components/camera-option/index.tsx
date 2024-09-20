import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { HStack, VStack } from 'native-base';
import { sizeWidth, fontSize } from '../../utils/Utils';
import Choice from './choice';
import { Icon } from '../../assets/icons/const';
import { observer } from 'mobx-react';
import UIStore from '../../stores/ui';
import useStores from '../../hooks/use-stores';
import Modal from 'react-native-modal/dist/modal';
import { requestCameraPermission } from './Permission';
import { CAMERA_OPTION, IMAGE_LIBRARY_OPTION } from '../add-edit-modal/const';
import * as ImagePicker from 'react-native-image-picker';
import SessionStore from '../../stores/session';

const CameraOption = observer(() => {
  const uiStore: UIStore = useStores().uiStore;
  const sessionStore: SessionStore = useStores().sessionStore;
  const takePhoto = async () => {
    if (await requestCameraPermission()) {
      ImagePicker.launchCamera(CAMERA_OPTION)
        .then((response: any) => {
          if (response.didCancel) {
            console.log('CANCEL');
          }

          if (!response.errorMessage) {
            // console.log(response?.assets[0]?.base64);
            sessionStore?.setImageData({
              imageData: `data:image/jpg;base64,${response?.assets[0].base64}`,
            });
            uiStore.hideCameraOption();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const chooseImage = async () => {
    ImagePicker.launchImageLibrary(IMAGE_LIBRARY_OPTION, (response?: any) => {
      if (response.didCancel) {
        console.log('CANCEL');
      } else {
        if (!response.errorMessage) {
          // console.log(response?.assets[0].base64);
          sessionStore?.setImageData({
            imageData: `data:image/jpg;base64,${response?.assets[0].base64}`,
          });
          uiStore.hideCameraOption();
        } else {
          console.log('that bai');
        }
      }
    });
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
      isVisible={uiStore?.cameraOption?.isVisible}
      onDismiss={() => uiStore.hideCameraOption()}
    >
      <VStack
        style={{
          width: sizeWidth(85),
          borderRadius: sizeWidth(2),
          backgroundColor: 'white',
          alignSelf: 'center',
          padding: 20,
        }}
        space={3}
      >
        <TouchableOpacity onPress={() => uiStore.hideCameraOption()}>
          <Text style={{ fontSize: fontSize(4), fontWeight: 'bold' }}>X</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: fontSize(4),
            alignSelf: 'center',
            color: '#354853',
            fontWeight: '600',
          }}
        >
          Chọn ảnh
        </Text>
        <Choice
          onPress={takePhoto}
          source={Icon.cameraOptions}
          title='Chụp ảnh'
        />
        <Choice
          onPress={chooseImage}
          source={Icon.libraryOptions}
          title='Thư viện ảnh'
        />
      </VStack>
    </Modal>
  );
});

export default CameraOption;

const styles = StyleSheet.create({});
