import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { fontSize, sizeHeight, sizeWidth } from '../../utils/Utils';
import { images } from '../../assets/images/const';

const MediumCard = ({
  backgroundColor,
  title,
  source,
  style,
  onPress,
  disabled = false,
}: {
  backgroundColor?: any;
  title?: string;
  source?: any;
  style?: StyleProp<ViewStyle>;
  onPress?: (e: any) => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        style,
        {
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 3,
          borderColor: 'white',
          borderRadius: sizeWidth(4),
          backgroundColor: backgroundColor || '#9CAEFF',
          padding: 5,
          width: '30%',
          marginHorizontal: 5,
        },
      ]}
    >
      <Image
        source={source || images.Test}
        style={{
          width: sizeWidth(23),
          height: sizeHeight(12),
          borderRadius: sizeWidth(4),
        }}
        resizeMode='cover'
      />
      <Text
        style={{
          fontSize: fontSize(4),
          color: 'white',
          fontWeight: 'bold',
          paddingTop: 5,
          textAlign: 'center',
        }}
        numberOfLines={2}
      >
        {title || 'Test'}
      </Text>
    </TouchableOpacity>
  );
};

export default MediumCard;

const styles = StyleSheet.create({});
