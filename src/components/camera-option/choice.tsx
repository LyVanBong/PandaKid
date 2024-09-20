import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { HStack } from 'native-base';
import { fontSize, sizeWidth } from '../../utils/Utils';

const Choice = ({
  title,
  source,
  onPress,
}: {
  title?: string;
  source?: any;
  onPress?: () => void;
}) => {
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
            style={{ width: 20, height: 20 }}
            resizeMode='contain'
          />
        )}

        <Text style={{ color: '#354853', fontSize: fontSize(3) }}>
          {title || 'title'}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default Choice;

const styles = StyleSheet.create({});
