import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  InputModeOptions,
} from 'react-native';
import React from 'react';
import { HStack } from 'native-base';
import { sizeHeight, sizeWidth } from '../../utils/Utils';
import { Icon } from '../../assets/icons/const';
import TouchableOpacity from '../Button/TouchableOpacity';
import { AnimatedTransform } from 'react-native-reanimated';

interface TextInputProps {
  rightIconShow?: boolean;
  placeholder?: string;
  value?: string;
  onBlur?: any;
  onChangeText?: (e: any) => void;
  inputMode?: InputModeOptions;
}

const CustomTextInput = ({
  rightIconShow = false,
  placeholder,
  value,
  onBlur,
  onChangeText,
  inputMode,
}: TextInputProps) => {
  const [hidden, setHidden] = React.useState(true);
  return (
    <>
      <HStack
        backgroundColor={'white'}
        w={sizeWidth(80)}
        h={sizeHeight(5)}
        borderRadius={sizeWidth(3)}
      >
        <TextInput
          autoCapitalize='none'
          value={value}
          inputMode={inputMode}
          onBlur={onBlur}
          placeholderTextColor={'gray'}
          onChangeText={onChangeText}
          secureTextEntry={rightIconShow ? hidden : false}
          style={{
            width: '90%',
            paddingLeft: sizeWidth(5),
          }}
          placeholder={placeholder || 'This is placeholder'}
        />
        {rightIconShow && (
          <TouchableOpacity
            isDoubleTap={true}
            onPress={() => setHidden(!hidden)}
            style={{ alignSelf: 'center' }}
          >
            <Image
              resizeMode='contain'
              style={{ width: 20, height: 20, alignSelf: 'center' }}
              source={hidden ? Icon.unHidden : Icon.hidden}
            />
          </TouchableOpacity>
        )}
      </HStack>
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({});
