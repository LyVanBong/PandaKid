import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { fontSize } from '../../utils/Utils';
import { Icon } from '../../assets/icons/const';
import { HStack } from 'native-base';

interface IProps {
  title?: string;
  onBackPress?: () => void;
  visible?: boolean;
  source?: any;
  disabledButton?: boolean;
  rightIconShown?: boolean;
  rightIconSource?: any;
  rightOnpress?: () => void;
}

const Header = ({
  title,
  onBackPress,
  visible = true,
  disabledButton = true,
  rightIconShown,
  rightIconSource,
  rightOnpress,
}: IProps) => {
  return (
    <SafeAreaView>
      <View
        style={{
          position: 'relative',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <HStack
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          {visible && (
            <TouchableOpacity onPress={onBackPress}>
              <Image
                source={Icon.arrowLeft}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>
          )}
          <Image
            source={Icon.lyingPanda}
            style={{
              height: 30,
              width: 45,
              resizeMode: 'cover',
            }}
          />
        </HStack>

        <Text
          style={{
            alignSelf: 'center',
            flex: 5,
            textAlign: 'center',
            fontSize: fontSize(5),
            color: '#354853',
            fontWeight: '600',
            // borderWidth: 1,
          }}
        >
          {title}
        </Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {rightIconShown && (
            <TouchableOpacity onPress={rightOnpress}>
              <Image
                source={rightIconSource}
                style={{ width: 25, height: 25, alignSelf: 'center' }}
                resizeMode='cover'
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
