import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { sizeHeight, sizeWidth } from '../../utils/Utils';
import TouchableOpacity from './TouchableOpacity';

interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  sourceIcon?: ImageSourcePropType;
}
const LongButton = ({
  title,
  onPress,
  style,
  titleStyle,
  sourceIcon,
}: CustomButtonProps) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={[styles.continueBtn, style]}>
        {!!sourceIcon && (
          <Image
            source={sourceIcon}
            style={{
              width: 25,
              height: undefined,
              aspectRatio: 1,
            }}
          />
        )}
        <Text style={[{ color: 'white' }, titleStyle]}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default LongButton;

const styles = StyleSheet.create({
  continueBtn: {
    bottom: sizeHeight(6),
    backgroundColor: '#7AA6FE',
    width: sizeWidth(80),
    height: sizeHeight(5),
    borderRadius: sizeWidth(6),
    justifyContent: 'center',
    alignItems: 'center',
    top: sizeHeight(0),
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
