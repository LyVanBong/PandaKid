import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { HStack } from 'native-base';
import { sizeHeight, sizeWidth } from '../../utils/Utils';
import { TextInput } from 'react-native';
import { Image } from 'react-native';
import { Icon } from '../../assets/icons/const';

const SearchInput = ({
  onChangText,
}: {
  onChangText?: (text: string) => void;
}) => {
  return (
    <>
      <HStack
        backgroundColor={'#F2F7FF'}
        borderRadius={sizeWidth(4)}
        space={4}
        paddingLeft={3}
        padding={3}
        width={sizeWidth(80)}
        alignSelf={'center'}
      >
        <Image
          source={Icon.search}
          style={{ width: 20, height: 20, alignSelf: 'center' }}
        />
        <TextInput
          onChangeText={onChangText}
          placeholder='Tìm kiếm'
          placeholderTextColor={'gray'}
        />
      </HStack>
    </>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});
