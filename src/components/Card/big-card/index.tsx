import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { VStack } from 'native-base';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { images } from '../../../assets/images/const';

const BigCard = ({
  backgroundColor,
  title,
  source,
  style,
}: {
  backgroundColor?: any;
  title?: string;
  source?: any;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <VStack
      justifyContent={'center'}
      alignItems={'center'}
      margin={2}
      borderWidth={5}
      borderColor={'white'}
      w={sizeWidth(40)}
      h={sizeHeight(23)}
      borderRadius={sizeWidth(4)}
      backgroundColor={backgroundColor || '#9CAEFF'}
      style={style}
    >
      <Image
        source={source || images.Test}
        style={{ width: '90%', height: '80%', borderRadius: sizeWidth(4) }}
        resizeMode='cover'
      />
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
    </VStack>
  );
};

export default BigCard;

const styles = StyleSheet.create({});
