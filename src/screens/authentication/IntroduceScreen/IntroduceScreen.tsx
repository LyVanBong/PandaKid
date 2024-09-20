import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../routers/ScreensName';
import Swiper from 'react-native-swiper';
import { images } from '../../../assets/images/const';
import { Stack, VStack } from 'native-base';
import IntroCard from './IntroCard';
import { sizeHeight, sizeWidth } from '../../../utils/Utils';
import NextButton from './NextButton';
import LongButton from '../../../components/Button/LongButton';
import Container from '../../../components/Container';
import asyncStorageService from '../../../service/async-storage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useIsFocused } from '@react-navigation/native';
const IntroduceScreen = () => {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const handleNext = () => {
    if (index < 3) {
      return setIndex(index + 1);
    } else {
      return setIndex(0);
    }
    // navigation.navigate(Screens.LoginScreen as never)
  };
  const mutation = useMutation({
    mutationFn: asyncStorageService.setFirstLaunch,
    onSuccess: () => {
      console.log('Mutate success');
    },
  });
  const {} = useQuery({
    queryKey: ['isFirstLaunch'],
    queryFn: () => asyncStorageService.fetchIsFirstLaunch(),

    onSuccess: (data: any) => {
      console.log('data', data);
      if (!!data) {
        navigation.navigate(Screens.LoginScreen as never);
      } else {
        console.log('1213');
        mutation.mutate();
      }
    },
  });

  return (
    <Container backgroundSource={images.IntroduceScreen}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack style={{ width: sizeWidth(100), height: sizeHeight(65) }}>
          <Swiper
            dotStyle={{ top: 30 }}
            activeDotStyle={{ top: 30 }}
            loop={false}
            onIndexChanged={(e) => setIndex(e)}
            index={index}
          >
            <IntroCard
              introImage={images.IntroImage1}
              introTitle1='Chào mừng đến với Panda Kid'
              introTitle2='Ứng dụng học từ dành cho trẻ từ 3 - 6 tuổi '
            />
            <IntroCard
              introImage={images.IntroImage2}
              introTitle1='Đến với Panda Kid'
              introTitle2={`Bé có thể nghe, đọc các từ vựng, với các${'\n'} hình ảnh minh hoạ vô cùng sống động.`}
            />
            <IntroCard
              introImage={images.IntroImage3}
              introTitle1='Panda Kid'
              introTitle2={`Đồng hành cùng bé trong hành trình chinh `}
              introTitle3='phục tiếng Việt'
            />
            <IntroCard
              introImage={images.IntroImage4}
              introTitle1='Cùng nhau học nào!'
              introTitle2={`Nâng cao khả năng vận dụng ngôn ngữ, phát `}
              introTitle3={`huy trí tưởng tượng và khơi dậy tình yêu Tiếng `}
              introTitle4='Việt cho trẻ'
            />
          </Swiper>
        </Stack>
        <VStack space={3} marginTop={10}>
          {index < 3 ? (
            <NextButton onPress={handleNext} />
          ) : (
            <VStack paddingTop={10} space={3}>
              <LongButton
                onPress={() =>
                  navigation.navigate(Screens.LoginScreen as never)
                }
                title='Đăng nhập'
              />
              <LongButton
                onPress={() =>
                  navigation.navigate(Screens.RegisterScreen as never)
                }
                titleStyle={{ color: '#7AA6FE' }}
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#7AA6FE',
                }}
                title='Đăng ký'
              />
            </VStack>
          )}
        </VStack>
      </SafeAreaView>
    </Container>
  );
};

export default IntroduceScreen;

const styles = StyleSheet.create({});
