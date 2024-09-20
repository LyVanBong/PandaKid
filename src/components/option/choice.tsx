import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { HStack } from 'native-base';
import { fontSize, sizeWidth } from '../../utils/Utils';

interface IProps {
  title?: string;
  source?: any;
  onPress?: () => void;
}
const Choice = ({ title, source, onPress }: IProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '90%',
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#DEE9FF',
        borderRadius: sizeWidth(4),
      }}
    >
      <HStack space={1} alignItems={'center'}>
        {source && (
          <Image
            source={source}
            style={{ width: 25, height: 25 }}
            resizeMode='cover'
          />
        )}

        <Text style={{ color: '#354853', fontSize: fontSize(3.5) }}>
          {title || 'title'}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default Choice;

const styles = StyleSheet.create({});
