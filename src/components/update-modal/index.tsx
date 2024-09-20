import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import { Modal, Stack, VStack } from 'native-base';
import Swiper from 'react-native-swiper';
import { sizeWidth, sizeHeight, fontSize } from '../../utils/Utils';
import { Icon } from '../../assets/icons/const';
import LongButton from '../Button/LongButton';
import UIStore from '../../stores/ui';
import useStores from '../../hooks/use-stores';
import { observer } from 'mobx-react';
import { images } from '../../assets/images/const';

const UpdateModal = observer(
  ({
    isVisible = true,
    onDismiss,
    title,
    btnTitle,
  }: {
    isVisible?: any;
    onDismiss?: () => void;
    title?: string;
    btnTitle?: string;
  }) => {
    const uiStore: UIStore = useStores().uiStore;
    return (
      <Modal
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        isOpen={uiStore?.updateModal?.isVisible}
        // onClose={() => uiStore?.hideUpdateModal()}
      >
        <ImageBackground
          source={images.update}
          resizeMode='contain'
          style={{
            width: sizeWidth(70),
            height: sizeHeight(40),
            alignSelf: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity onPress={() => uiStore?.hideUpdateModal()}>
            <Image
              style={{
                width: 30,
                height: 30,
                position: 'absolute',
                bottom: 250,
                left: 270,
              }}
              resizeMode='cover'
              source={Icon.redCancel}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              uiStore.showDescriptionUpdateModal();
              uiStore.hideUpdateModal();
            }}
            style={{ alignSelf: 'center' }}
          >
            <Image
              style={{
                width: sizeWidth(30),
                height: sizeHeight(5),
                alignSelf: 'center',
              }}
              resizeMode='contain'
              source={Icon.updateBlue}
            />
          </TouchableOpacity>
        </ImageBackground>
      </Modal>
    );
  }
);

export default UpdateModal;

const styles = StyleSheet.create({});
