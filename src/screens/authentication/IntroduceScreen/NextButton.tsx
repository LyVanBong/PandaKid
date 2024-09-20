import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fontSize, sizeHeight, sizeWidth} from '../../../utils/Utils';
import {HStack} from 'native-base';
import {Icon} from '../../../assets/icons/const';
import TouchableOpacity from '../../../components/Button/TouchableOpacity';

const NextButton = ({onPress}: {onPress: () => void}) => {
  return (
    <>
      <TouchableOpacity
        isDoubleTap={true}
        onPress={onPress}
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: sizeWidth(40),
          backgroundColor: '#7AA6FE',
          height: sizeHeight(5),
          borderRadius: sizeWidth(6),
          top: sizeHeight(5),
        }}>
        <HStack space={5} alignItems={'center'}>
          <Text
            style={{color: 'white', fontSize: fontSize(4), fontWeight: '600'}}>
            Tiếp theo
          </Text>
          <Image source={Icon.arrowRight} style={{width: 20, height: 20}} />
        </HStack>
      </TouchableOpacity>
    </>
  );
};

export default NextButton;

const styles = StyleSheet.create({});
