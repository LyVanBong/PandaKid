import { View, Text } from 'react-native';
import React from 'react';
import Toast from '../components/Toast/Toast';
import { useToast } from 'native-base';

const useCustomToast = () => {
  const toast = useToast();

  const show = ({
    type,
    msg,
  }: {
    type?: 'success' | 'error' | 'warn';
    msg?: string;
  }) => {
    toast.show({
      placement: 'top',
      render: () => {
        return <Toast type={type} message={msg} />;
      },
      duration: 2000,
    });
  };

  return { show };
};

export default useCustomToast;
