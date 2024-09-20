import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {VStack} from 'native-base';
import {images} from '../../../assets/images/const';
import {fontSize, sizeHeight, sizeWidth} from '../../../utils/Utils';

const IntroCard = ({
  introTitle1,
  introTitle2,
  introImage,
  introTitle3,
  introTitle4,
}: {
  introTitle1?: string;
  introTitle2?: string;
  introImage: any;
  introTitle3?: string;
  introTitle4?: string;
}) => {
  return (
    <>
      <VStack space={sizeHeight(10)} paddingTop={sizeHeight(10)}>
        <Image
          source={introImage}
          style={{
            width: sizeWidth(85),
            alignSelf: 'center',
            height: sizeHeight(30),
          }}
          resizeMode="contain"
        />
        <VStack space={3}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#354853',
              fontWeight: '600',
              fontSize: fontSize(6),
            }}>
            {introTitle1}
          </Text>
          <VStack>
            <Text
              style={{
                alignSelf: 'center',
                color: '#667685',
                fontSize: fontSize(4),
              }}>
              {introTitle2}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: '#667685',
                fontSize: fontSize(4),
              }}>
              {introTitle3}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: '#667685',
                fontSize: fontSize(4),
              }}>
              {introTitle4}
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </>
  );
};

export default IntroCard;

const styles = StyleSheet.create({});
