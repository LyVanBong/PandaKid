import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React from 'react';
import { HStack } from 'native-base';
import { sizeHeight, sizeWidth } from '../../../utils/Utils';
import TouchableOpacity from '../../../components/Button/TouchableOpacity';
import { Icon } from '../../../assets/icons/const';

interface TextInputProps {
  rightIconShow?: boolean;
  placeholder?: string;
  value?: string;
  onBlur?: any;
  onChangeText?: (e: any) => void;
  onFaceIdPress: () => void;
}

const TextInputWithFaceId = ({
  rightIconShow = false,
  placeholder,
  value,
  onBlur,
  onChangeText,
  onFaceIdPress,
}: TextInputProps) => {
  const [hidden, setHidden] = React.useState(true);
  return (
    <>
      <HStack
        backgroundColor={'white'}
        w={sizeWidth(80)}
        h={sizeHeight(5)}
        borderRadius={sizeWidth(3)}
        style={{ alignSelf: 'center', paddingHorizontal: 10 }}
      >
        <TextInput
          autoCapitalize='none'
          value={value}
          onBlur={onBlur}
          placeholderTextColor={'gray'}
          onChangeText={onChangeText}
          secureTextEntry={rightIconShow ? hidden : false}
          style={{ flex: 1 }}
          placeholder={placeholder || 'This is placeholder'}
        />

        <View
          style={{ justifyContent: 'center', flexDirection: 'row', gap: 10 }}
        >
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
          <TouchableOpacity
            onPress={onFaceIdPress}
            style={{ justifyContent: 'center' }}
          >
            <Image
              resizeMode='contain'
              style={{ width: 30, height: 30, alignSelf: 'center' }}
              source={Icon.grayFaceIdIcon}
            />
          </TouchableOpacity>
        </View>
      </HStack>
    </>
  );
};

export default TextInputWithFaceId;

const styles = StyleSheet.create({});
