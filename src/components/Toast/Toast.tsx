import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { VStack, HStack, Center } from 'native-base';
import { images } from '../../assets/images/const';
import { fontSize, sizeHeight, sizeWidth } from '../../utils/Utils';
// import { SafeAreaView } from 'react-native-safe-area-context'

const Toast = ({ message, type }: { message?: string; type?: string }) => {
  const typeToast = (type?: any) => {
    switch (type) {
      case 'success':
        return {
          color: 'green',
          imgSource: images.SuccessLabel,
        };
      case 'error':
        return {
          color: 'red',
          imgSource: images.FailedLabel,
        };
      case 'warn':
        return {
          color: 'yellow',
          imgSource: images.warning,
        };

      default:
        return {
          color: 'black',
          imgSource: images.SuccessLabel,
        };
    }
  };
  return (
    <>
      <SafeAreaView
        style={{
          borderLeftWidth: 5,
          borderColor: typeToast(type)?.color,
          backgroundColor: 'white',
          width: sizeWidth(90),
          padding: 5,
          justifyContent: 'center',
        }}
      >
        <HStack style={{ padding: 5 }}>
          <Image
            source={typeToast(type)?.imgSource}
            style={{ width: 70, height: 55 }}
            resizeMode='cover'
          />
          <Text style={{ alignSelf: 'center', fontSize: fontSize(4) }}>
            {message || 'Thành công!'}
          </Text>
        </HStack>
      </SafeAreaView>
    </>
  );
};

export default Toast;

const styles = StyleSheet.create({});
