import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { VStack } from 'native-base';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { images } from '../../../assets/images/const';
import { Icon } from '../../../assets/icons/const';

const BigCardWithVoice = ({
  backgroundColor,
  title,
  source,
  onPressVoiceIcon,
}: {
  backgroundColor?: any;
  title?: string;
  source?: any;
  onPressVoiceIcon?: (e: any) => void;
}) => {
  return (
    <VStack
      space={3}
      justifyContent={'center'}
      alignItems={'center'}
      margin={2}
      borderWidth={3}
      borderColor={'white'}
      w={sizeWidth(42)}
      h={sizeHeight(25)}
      borderRadius={sizeWidth(4)}
      backgroundColor={backgroundColor || '#9CAEFF'}
    >
      <Text
        style={{
          fontSize: fontSize(4),
          color: 'white',
          fontWeight: 'bold',
          paddingTop: 5,
        }}
      >
        {title || 'Test'}
      </Text>

      <Image
        source={source || images.Test}
        style={{
          width: '90%',
          height: '50%',
          borderRadius: sizeWidth(4),
          alignSelf: 'center',
        }}
        resizeMode='cover'
      />
      <TouchableOpacity onPress={onPressVoiceIcon}>
        <Image
          source={Icon.voice}
          style={{ width: 130, height: 35 }}
          resizeMode='contain'
        />
      </TouchableOpacity>
    </VStack>
  );
};

export default BigCardWithVoice;

const styles = StyleSheet.create({});
