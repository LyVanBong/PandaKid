import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { HStack, Modal, VStack } from 'native-base';
import { sizeWidth, fontSize } from '../../utils/Utils';
import Button from './button';
const ConfirmModal = ({
  isVisible,
  onDismiss,
  title,
  title1,

  btnTitle,
  onConfirmPress,
}: {
  isVisible?: any;
  onDismiss?: () => void;
  title?: string;
  title1?: string;
  btnTitle?: string;
  onConfirmPress?: () => void;
}) => {
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
      isOpen={isVisible}
      onClose={onDismiss}
    >
      <VStack
        style={{
          width: sizeWidth(85),
          //   height: sizeHeight(55),
          borderRadius: sizeWidth(2),
          backgroundColor: 'white',
          alignSelf: 'center',
          paddingVertical: 20,
        }}
      >
        <VStack
          //   style={{ paddingHorizontal: 10, paddingVertical: 10 }}
          alignItems={'flex-end'}
          alignSelf={'center'}
          w={'90%'}
        >
          <TouchableOpacity onPress={onDismiss}>
            <Text style={{ fontSize: fontSize(4), fontWeight: 'bold' }}>X</Text>
          </TouchableOpacity>
        </VStack>
        <VStack
          space={5}
          style={{
            width: '90%',
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#354853',
              fontSize: fontSize(4),
              fontWeight: '600',
            }}
          >
            {title || 'title'}
          </Text>
          {title1 && (
            <Text
              style={{
                color: '#354853',
                fontSize: fontSize(4),
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {title1 || 'title'}
            </Text>
          )}

          <HStack w={'90%'} justifyContent={'space-between'}>
            <Button
              btnTitle='Hủy'
              backgroundColor={'white'}
              titleColor={'#7AA6FE'}
              onPress={onDismiss}
            />
            <Button
              btnTitle='Đồng ý'
              backgroundColor={'#7AA6FE'}
              titleColor={'white'}
              onPress={onConfirmPress}
            />
          </HStack>
        </VStack>
      </VStack>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({});
