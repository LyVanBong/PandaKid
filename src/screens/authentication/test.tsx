import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { useToast } from 'native-base';
import SuccessToast from '../../components/Toast/Toast';

const Test = () => {
  const showToast = useToast();

  React.useEffect(() => {
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!'
      )

      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }, []);
  //   React.useEffect(() => {
  //     showToast.show({title:'xsxs', placement:'top',duration: 3000, render: ()=> <SuccessToast/>})
  // }, [])

  return (
    <SafeAreaView>
      <Text>stest</Text>
    </SafeAreaView>
  );
};

export default Test;

const styles = StyleSheet.create({});
