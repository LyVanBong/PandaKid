import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { images } from '../../assets/images/const';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Container = ({
  children,
  backgroundSource,
}: {
  children?: React.ReactElement | React.ReactElement[];
  backgroundSource?: any;
}) => {
  return (
    <>
      <ImageBackground
        resizeMode='cover'
        style={{ flex: 1 }}
        source={backgroundSource || images.background}
      >
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default Container;

const styles = StyleSheet.create({});
