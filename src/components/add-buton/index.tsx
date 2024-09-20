import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fontSize, sizeWidth } from '../../utils/Utils';

const AddButton = ({
  title,
  onPress,
}: {
  title?: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: sizeWidth(50),
        alignSelf: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: sizeWidth(4),
        backgroundColor: '#F2F7FF',
      }}
    >
      <Text
        style={{ fontSize: fontSize(4), color: '#667685', fontWeight: '600' }}
      >
        {title || 'test'}
      </Text>
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({});
