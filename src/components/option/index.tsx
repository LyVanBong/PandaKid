import { StyleSheet } from 'react-native';
import React from 'react';
import { Modal, VStack } from 'native-base';
import { sizeWidth } from '../../utils/Utils';
import { Icon } from '../../assets/icons/const';
import Choice from './choice';

const Option = ({
  isVisible,
  onDismiss,
  option1Title,
  option2Title,
  option3Title,
  onEditPress,
  onDeletePress,
  onCancelPress,
}: {
  isVisible?: any;
  onDismiss?: () => void;
  option1Title?: string;
  option2Title?: string;
  option3Title?: string;
  onEditPress?: () => void;
  onDeletePress?: () => void;
  onCancelPress?: () => void;
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
        justifyContent: 'flex-end',
      }}
      isOpen={isVisible}
      onClose={onDismiss}
    >
      <VStack
        style={{
          width: sizeWidth(100),
          //   height: sizeHeight(55),
          borderRadius: sizeWidth(2),
          backgroundColor: 'white',
          alignSelf: 'center',
          paddingVertical: 20,
          paddingHorizontal: 20,
          // marginBottom: 10,
        }}
        space={3}
      >
        <Choice
          onPress={onEditPress}
          source={Icon.edit}
          title={option1Title || 'option1'}
        />
        <Choice
          onPress={onDeletePress}
          source={Icon.delete}
          title={option2Title || 'option2'}
        />
        <Choice
          onPress={onCancelPress}
          source={Icon.blackClose}
          title={option3Title || 'option3'}
        />
      </VStack>
    </Modal>
  );
};

export default Option;

const styles = StyleSheet.create({});
