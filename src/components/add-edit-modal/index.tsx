import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
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
import SessionStore from '../../stores/session';
import { images } from '../../assets/images/const';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddEditModal = observer(
  ({
    isVisible,
    onDismiss,
    title,
    btnTitle,
    placeholderTxt,
    onChangeText,
    onAddPress,
    initalValue,
    type = 'add',
    btnEditTitle,
    onEditPress,
  }: {
    isVisible?: any;
    onDismiss?: () => void;
    title?: string;
    btnTitle?: string;
    placeholderTxt?: string;
    onChangeText?: any;
    onAddPress?: any;
    initalValue?: string;
    type?: 'add' | 'edit';
    btnEditTitle?: string;
    onEditPress?: any;
  }) => {
    const uiStore: UIStore = useStores().uiStore;
    const sessionStore: SessionStore = useStores().sessionStore;
    return (
      <Modal
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: uiStore?.cameraOption?.isVisible ? 'none' : 'flex',
        }}
        isOpen={isVisible}
        onClose={onDismiss}
      >
        <VStack
          style={{
            width: sizeWidth(85),
            borderRadius: sizeWidth(2),
            backgroundColor: 'white',
            alignSelf: 'center',
            paddingVertical: 20,
          }}
        >
          <KeyboardAwareScrollView scrollEnabled>
            <VStack alignItems={'flex-end'} alignSelf={'center'} w={'80%'}>
              <TouchableOpacity onPress={onDismiss}>
                <Text style={{ fontSize: fontSize(4), fontWeight: 'bold' }}>
                  X
                </Text>
              </TouchableOpacity>
            </VStack>
            <VStack
              space={5}
              style={{
                width: '80%',
                alignSelf: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#354853',
                  fontSize: fontSize(4.5),
                  fontWeight: '600',
                }}
              >
                {title || 'title'}
              </Text>
              <TouchableOpacity
                onPress={() => uiStore.showCameraOption()}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  paddingVertical: sizeHeight(6),
                  backgroundColor: '#DEE9FF',
                  borderRadius: sizeWidth(4),
                }}
              >
                <Image
                  resizeMode='cover'
                  source={
                    sessionStore?.dataImage?.imageData !== undefined
                      ? { uri: sessionStore?.dataImage?.imageData }
                      : Icon.camera
                  }
                  style={{
                    width: sizeWidth(50),
                    height: undefined,
                    aspectRatio: 1,
                  }}
                />
              </TouchableOpacity>
              <TextInput
                placeholder={placeholderTxt || 'placeholder'}
                onChangeText={onChangeText}
                value={initalValue}
                style={{
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: sizeWidth(4),
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                }}
                placeholderTextColor={'black'}
              />
              {type === 'add' ? (
                <LongButton
                  style={{ width: '100%' }}
                  title={btnTitle || 'btnTitle'}
                  titleStyle={{ fontSize: fontSize(3.5), fontWeight: '600' }}
                  onPress={onAddPress}
                />
              ) : (
                <LongButton
                  style={{ width: '100%' }}
                  title={btnEditTitle || 'btnEditTitle'}
                  onPress={onEditPress}
                  titleStyle={{ fontSize: fontSize(3.5), fontWeight: '600' }}
                />
              )}
            </VStack>
          </KeyboardAwareScrollView>
        </VStack>
      </Modal>
    );
  }
);

export default AddEditModal;

const styles = StyleSheet.create({});
