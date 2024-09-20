import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import Header from '../../../components/header';
import { useNavigation, useRoute } from '@react-navigation/native';
import BigCard from '../../../components/Card/big-card';
import { HStack, VStack } from 'native-base';
import { randomColor, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { Screens } from '../../../routers/ScreensName';
import SearchInput from '../../../components/search-input';
import { Icon } from '../../../assets/icons/const';
import AddButton from '../../../components/add-buton';
import AddEditModal from '../../../components/add-edit-modal';
import Option from '../../../components/option';
import SessionStore from '../../../stores/session';
import auth from '@react-native-firebase/auth';
import useCustomToast from '../../../hooks/useToast';
import { firebase } from '@react-native-firebase/firestore';
import UIStore from '../../../stores/ui';
import useStores from '../../../hooks/use-stores';
import firestore from '@react-native-firebase/firestore';

const AddWord = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [list, setList] = React.useState([]);
  const [addModalVisible, setAddModalVisible] = React.useState(false);
  const [choiceModal, setChoiceModal] = React.useState(false);
  const [text, setText] = React.useState<any>();
  const sessionStore: SessionStore = useStores().sessionStore;
  const uiStore: UIStore = useStores().uiStore;
  const [data, setData] = React.useState<any>(route.params?.data);
  const handleClick = (item: any) => {
    const index = item?.id;
    if (list.find((item: any) => item?.id === index)) {
      const newList = list.filter((item: any) => item?.id !== index);

      return setList(newList);
    } else {
      return setList([...list, item]);
    }
  };
  const [randomColors, setRandomColors] = React.useState(randomColor());
  const [isEditMode, setIsEditMode] = React.useState(false);
  const color = randomColor();
  const db = firebase.firestore();
  const email = auth().currentUser?.email as any;
  const toast = useCustomToast();

  const onHandleAddPress = async () => {
    const tmpData = {
      name: text,
      url: sessionStore?.dataImage?.imageData,
      id: new Date().getTime(),
      type: email,
    };
    if (sessionStore?.dataImage?.imageData !== undefined && text) {
      db.collection('Category')
        .doc(route?.params?.title)
        .collection(route?.params?.title)
        .doc(text)
        .set(tmpData)
        .then(() => {
          console.log('Document successfully written!');
          toast.show({ type: 'success', msg: 'Thêm thành công' });
          sessionStore.setImageData({ imageData: undefined });
          setAddModalVisible(!addModalVisible);
          setData([...data, tmpData]);
          setText('');
          navigation.goBack();
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
          toast.show({ type: 'error', msg: 'Có lỗi' });
        });
    } else {
      toast.show({ type: 'error', msg: 'Hoàn thành các trường còn thiếu' });
    }
  };
  const deleteWord = (nameWord: any) => {
    firestore()
      .collection('Category')
      .doc(route?.params?.title)
      .collection(route?.params?.title)
      .doc(nameWord)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  };
  const onHandleDeletePress = () => {
    const isNotIncludeAdminCate = list.filter(
      (item: any) => item?.type !== 'admin'
    );
    if (isNotIncludeAdminCate?.length > 0) {
      console.log(isNotIncludeAdminCate);
      isNotIncludeAdminCate.forEach((item: any) => {
        deleteWord(item?.key);
      });
      setChoiceModal(!choiceModal);
    } else {
      // console.log(' k xoa dc');
      setChoiceModal(!choiceModal);
      return toast.show({
        type: 'error',
        msg: 'Bạn không có quyền xóa từ này',
      });
    }

    navigation.goBack();
    return toast.show({ type: 'success', msg: 'Xóa thành công' });
  };
  const onEditPress = () => {
    if (list.length > 1) {
      toast.show({
        type: 'error',
        msg: 'Bạn chỉ được chọn 1 từ để sửa',
      });
    } else {
      if (list[0]?.type === 'admin') {
        toast.show({
          type: 'error',
          msg: 'Bạn không có quyền sửa từ này',
        });
      } else {
        setChoiceModal(!choiceModal);
        setAddModalVisible(!addModalVisible);
        setIsEditMode(!isEditMode);
        setText(list[0]?.name);
        sessionStore?.setImageData({ imageData: list[0]?.url });
      }
    }
  };
  const onHandleEditPress = () => {
    firestore()
      .collection('Category')
      .doc(route?.params?.title)
      .collection(route?.params?.title)
      .doc(list[0]?.key)
      .update({
        name: text,
        url: sessionStore?.dataImage?.imageData,
      })
      .then(() => {
        console.log('Document successfully written!');
        navigation.goBack();
        toast.show({ type: 'success', msg: 'Sửa thành công' });
        sessionStore.setImageData({ imageData: undefined });
        setAddModalVisible(!addModalVisible);
        setText('');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
        toast.show({ type: 'error', msg: 'Có lỗi' });
      });
  };
  return (
    <Container backgroundSource={images.MainBackground}>
      <Header
        rightIconSource={Icon.option}
        rightIconShown={list.length !== 0}
        onBackPress={() => navigation.goBack()}
        rightOnpress={() => {
          setChoiceModal(!choiceModal);
        }}
        title='Thêm từ'
      />
      <VStack
        paddingTop={5}
        alignSelf={'center'}
        style={{ paddingHorizontal: 10, paddingVertical: 20 }}
      >
        <AddButton
          onPress={() => {
            setAddModalVisible(!addModalVisible);
            setIsEditMode(false);
          }}
          title='Thêm từ'
        />
        <FlatList
          data={data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          snapToEnd={true}
          contentContainerStyle={{
            alignSelf: 'center',
            width: sizeWidth(90),
            paddingVertical: 10,
          }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => handleClick(item)}
                activeOpacity={0.2}
              >
                <BigCard
                  style={{
                    borderWidth: 4,
                    borderColor: list?.find((items) => items?.id === item?.id)
                      ? 'black'
                      : 'white',
                  }}
                  title={item?.type === 'admin' ? item?.key : item?.name}
                  backgroundColor={randomColors}
                  source={{ uri: item?.url }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </VStack>
      <AddEditModal
        isVisible={addModalVisible}
        onDismiss={() => {
          setAddModalVisible(!addModalVisible);
          sessionStore.setImageData({ imageData: undefined });
          setText('');
        }}
        title='Thêm từ'
        btnTitle='Tạo từ'
        placeholderTxt='Nhập từ cần thêm'
        onChangeText={(e: any) => setText(e)}
        onAddPress={onHandleAddPress}
        initalValue={text}
        type={isEditMode ? 'edit' : 'add'}
        btnEditTitle='Sửa từ'
        onEditPress={onHandleEditPress}
      />
      <Option
        isVisible={choiceModal}
        onDismiss={() => setChoiceModal(!choiceModal)}
        option1Title='Sửa từ'
        option2Title='Xóa từ'
        option3Title='Hủy bỏ'
        onCancelPress={() => setChoiceModal(false)}
        onDeletePress={onHandleDeletePress}
        onEditPress={onEditPress}
      />
    </Container>
  );
};

export default AddWord;

const styles = StyleSheet.create({});
