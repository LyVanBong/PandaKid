import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import Header from '../../../components/header';
import AddButton from '../../../components/add-buton';
import { VStack } from 'native-base';
import MediumCard from '../../../components/medium-card';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Screens } from '../../../routers/ScreensName';
import firestore from '@react-native-firebase/firestore';
import { observer } from 'mobx-react';
import SessionStore from '../../../stores/session';
import useStores from '../../../hooks/use-stores';
import { sizeHeight } from '../../../utils/Utils';

const StorageWord = observer(() => {
  // const data = [
  //   { id: 1, title: 'word1' },
  //   { id: 2, title: 'word2' },
  //   { id: 3, title: 'word3' },
  //   { id: 4, title: 'word4' },
  //   { id: 5, title: 'word5' },
  //   { id: 6, title: 'word6' },
  //   { id: 7, title: 'word7' },
  // ];
  const focused = useIsFocused();
  const addCollectionToFireBase = () => {
    firestore().collection('userData').add({
      name: 'Ada Lovelace',
      age: 30,
    });
  };
  const checkIfCollectionExists = () => {};
  React.useEffect(() => {
    focused === true ? setData(sessionStore?.storageWords.storage) : null;
    return () => {};
  }, [focused]);

  const navigation = useNavigation();
  const sessionStore: SessionStore = useStores().sessionStore;
  const [data, setData] = React.useState(sessionStore?.storageWords.storage);
  return (
    <Container backgroundSource={images.MainBackground}>
      <Header visible={false} title='Kho ghép từ' />
      <VStack space={3} style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        <AddButton
          onPress={() => navigation.navigate(Screens.AddWordToStorage as never)}
          title='Thêm từ vào kho'
        />
        <View
          style={{
            height: sizeHeight(72),
            paddingHorizontal: 10,
          }}
        >
          <FlatList
            data={data}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            snapToEnd={true}
            contentContainerStyle={{
              gap: 5,
            }}
            renderItem={({ item, index }) => {
              return (
                <MediumCard
                  source={{ uri: item?.url }}
                  disabled={true}
                  title={item?.key}
                />
              );
            }}
          />
        </View>
      </VStack>
    </Container>
  );
});

export default StorageWord;
