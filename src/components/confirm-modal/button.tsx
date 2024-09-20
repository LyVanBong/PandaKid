import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fontSize, sizeWidth } from '../../utils/Utils';

const Button = ({
  btnTitle,
  backgroundColor,
  titleColor,
  onPress,
}: {
  btnTitle?: string;
  backgroundColor?: any;
  titleColor?: any;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 1,
        width: sizeWidth(32),
        padding: 10,
        borderRadius: sizeWidth(4),
        alignItems: 'center',
        backgroundColor: backgroundColor || 'white',
        borderColor: '#7AA6FE',
      }}
    >
      <Text
        style={{ fontSize: fontSize(4), color: titleColor, fontWeight: '600' }}
      >
        {btnTitle || 'title'}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
