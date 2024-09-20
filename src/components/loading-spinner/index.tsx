import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Modal, Spinner } from 'native-base';
import { observer } from 'mobx-react';
import UIStore from '../../stores/ui';
import useStores from '../../hooks/use-stores';

const LoadingSpinner = observer(() => {
  const uiStore: UIStore = useStores().uiStore;
  return (
    <Modal
      isOpen={uiStore?.loading.isVisible}
      backgroundColor={'rgba(0, 0, 0, 0.1)'}
    >
      <ActivityIndicator size='large' color={'blue'} />
    </Modal>
  );
});

export default LoadingSpinner;

const styles = StyleSheet.create({});
