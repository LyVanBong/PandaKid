import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import Header from '../../../components/header';
import { sizeWidth } from '../../../utils/Utils';
import BigCardWithVoice from '../../../components/Card/big-card-with-voice';
import WordModal from './word-modal';
import { Screens } from '../../../routers/ScreensName';
import { Icon } from '../../../assets/icons/const';
import firestore from '@react-native-firebase/firestore';
import UIStore from '../../../stores/ui';
import useStores from '../../../hooks/use-stores';
import useLogicWords from './useLogicWords';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { TypeAccount } from '../../../model/type-account';

const WordScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [data, setData] = React.useState<Array<any>>([]);
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [swiperIndex, setSwiperIndex] = React.useState(0);
  const { playSound, handlePlaySound } = useLogicWords();
  const uiStore: UIStore = useStores().uiStore;
  const email = auth().currentUser?.email as any;
  const isBasicAccount = async () => {
    const data = await firestore().collection('account').doc(email).get();
    return data.data()?.typeAccount === TypeAccount.Basic;
  };

  const params = route?.params as any;
  React.useEffect(() => {
    uiStore.showLoading();
    firestore()
      .collection('Category')
      .doc(params?.title)
      .collection(params?.title)
      .orderBy('id', 'desc')
      .onSnapshot((querySnapshot) => {
        const users: any = [];

        querySnapshot.forEach((documentSnapshot) => {
          if (
            documentSnapshot?.data()?.type === 'admin' ||
            documentSnapshot?.data()?.type === email
          ) {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          }
        });
        setData(users);
        uiStore.hideLoading();
        // console.log(users);
      });
    return () => {};
  }, []);
  const handleAdd = async () => {
    if (await isBasicAccount()) {
      uiStore.showUpdateModal();
    } else {
      navigation.navigate(
        Screens.AddWord as never,
        { data: data, title: params?.title } as never
      );
    }
  };
  return (
    <Container backgroundSource={images.Background2}>
      <Header
        onBackPress={() => navigation.goBack()}
        title={params?.title}
        rightIconShown={true}
        rightIconSource={Icon.add}
        rightOnpress={handleAdd}
      />
      <FlatList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        snapToEnd={true}
        contentContainerStyle={{
          alignSelf: 'center',
          width: sizeWidth(90),
          paddingTop: 10,
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSwiperIndex(index);
                setIsVisibleModal(!isVisibleModal);
              }}
              key={index}
              activeOpacity={0.2}
            >
              <BigCardWithVoice
                key={index}
                onPressVoiceIcon={async () => {
                  await handlePlaySound(item);
                }}
                title={item?.type === 'admin' ? item?.key : item?.name}
                source={{ uri: item.url }}
              />
            </TouchableOpacity>
          );
        }}
      />

      <WordModal
        isVisible={isVisibleModal}
        data={data}
        onDismiss={() => setIsVisibleModal(false)}
        index={swiperIndex}
        // onIndexChange={(e) => setIndex(e)}
      />
    </Container>
  );
};

export default WordScreen;

const styles = StyleSheet.create({});
