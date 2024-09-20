import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import Header from '../../../components/header';
import BigCard from '../../../components/Card/big-card';
import { VStack } from 'native-base';
import { randomColor, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../routers/ScreensName';
import { Icon } from '../../../assets/icons/const';
import firestore from '@react-native-firebase/firestore';
import UIStore from '../../../stores/ui';
import useStores from '../../../hooks/use-stores';
import auth from '@react-native-firebase/auth';
import asyncStorageService from '../../../service/async-storage';
import { RegisterData } from '../../../model/register';
import { TypeAccount } from '../../../model/type-account';
import SessionStore from '../../../stores/session';

const HomeScreen = () => {
  const uiStore: UIStore = useStores().uiStore;
  const [data, setData] = React.useState<any>([]);
  const email = auth().currentUser?.email as any;
  const sessionStore: SessionStore = useStores().sessionStore;
  const isBasicAccount = async () => {
    const data = await firestore().collection('account').doc(email).get();
    sessionStore.setTypeAccount({ typeAccount: data.data()?.typeAccount });
    return data.data()?.typeAccount === TypeAccount.Basic;
  };
  React.useEffect(() => {
    // handleGetCategory();
    // getUserCategory();
    uiStore.showLoading();
    setTimeout(async () => {
      if (await isBasicAccount()) {
        uiStore.showUpdateModal();
      }
    }, 3000);
    const subscriber = firestore()
      .collection('Category')
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
      });
    // console.log(data);

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const navigation = useNavigation();
  const [searchValue, setSearchValue] = React.useState('');

  const handleAdd = async () => {
    if (await isBasicAccount()) {
      uiStore.showUpdateModal();
    } else {
      navigation.navigate(
        Screens.AddCategory as never,
        { data: data } as never
      );
      // const typeAccount = await AsyncStorage.getItem('type_account');
      // console.log(typeAccount);
    }
  };
  const loadMore = () => {};
  const listFooterComponent = () => {
    return <ActivityIndicator size='large' color={'blue'} />;
  };
  return (
    <Container backgroundSource={images.MainBackground}>
      <Header
        visible={false}
        title='Trang chủ'
        rightIconShown={true}
        rightIconSource={Icon.add}
        rightOnpress={handleAdd}
      />

      <VStack
        paddingTop={5}
        alignSelf={'center'}
        style={{ paddingHorizontal: 10 }}
        h={sizeHeight(80)}
      >
        {/* <SearchInput onChangText={(e) => setSearchValue(e)} /> */}

        <FlatList
          data={data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          snapToEnd={true}
          contentContainerStyle={{ alignSelf: 'center', width: sizeWidth(90) }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate(
                    Screens.WordScreens as never,
                    { title: item?.key, color: randomColor() } as never
                  )
                }
                activeOpacity={0.2}
              >
                <BigCard
                  source={{ uri: item?.url }}
                  title={item?.type === 'admin' ? item?.key : item?.name}
                  backgroundColor={randomColor()}
                />
              </TouchableOpacity>
            );
          }}
        />
      </VStack>
    </Container>
  );
};

export default HomeScreen;
