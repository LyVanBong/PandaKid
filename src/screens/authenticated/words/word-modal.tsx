import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { Stack, VStack } from 'native-base';
import Swiper from 'react-native-swiper';
import { Icon } from '../../../assets/icons/const';
import { images } from '../../../assets/images/const';
import useLogicWords from './useLogicWords';
import Modal from 'react-native-modal/dist/modal';

const WordModal = ({
  isVisible,
  onDismiss,
  data,
  index = 0,
  onIndexChange,
}: {
  isVisible?: any;
  onDismiss?: () => void;
  data?: Array<any>;
  index?: number;
  onIndexChange?: (e: any) => void;
}) => {
  // const [indexs, setIndex] = React.useState(0);
  const { playSound, handlePlaySound } = useLogicWords();
  // React.useEffect(() => {
  //   setIndex(index);
  //   console.log('data', data);
  //   return () => {};
  // }, [index]);

  return (
    <Modal
      customBackdrop={
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
        </TouchableWithoutFeedback>
      }
      isVisible={isVisible}
      onDismiss={onDismiss}
    >
      <VStack
        style={{
          width: sizeWidth(85),
          height: sizeHeight(55),
          borderWidth: 3,
          borderColor: 'white',
          borderRadius: sizeWidth(2),
          backgroundColor: '#9CAEFF',
          alignSelf: 'center',
        }}
      >
        <Stack
          style={{ paddingHorizontal: 10, paddingVertical: 10 }}
          alignItems={'flex-end'}
          w={'100%'}
        >
          <TouchableOpacity onPress={onDismiss}>
            <Image
              source={Icon.close}
              style={{ width: 20, height: 20 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </Stack>
        <Swiper
          activeDotStyle={{ top: 10 }}
          dotStyle={{ top: 10 }}
          index={index}
          onIndexChanged={onIndexChange}
          showsButtons={true}
        >
          {data?.map((item, index) => {
            return (
              <VStack
                key={index}
                space={3}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: fontSize(6),
                    fontWeight: '600',
                    color: 'white',
                  }}
                >
                  {item?.type === 'admin' ? item?.key : item?.name}
                </Text>

                <Image
                  source={{ uri: `${item?.url}` }}
                  style={{
                    borderRadius: sizeWidth(3),
                    width: sizeWidth(60),
                    height: sizeHeight(30),
                  }}
                  resizeMode='cover'
                />
                <TouchableOpacity onPress={() => handlePlaySound(item)}>
                  <Image
                    source={Icon.voice}
                    resizeMode='cover'
                    style={{
                      width: sizeWidth(40),
                      height: sizeHeight(8),
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
              </VStack>
            );
          })}
        </Swiper>
      </VStack>
    </Modal>
  );
};

export default WordModal;

const styles = StyleSheet.create({});
