import { action, makeObservable, observable } from 'mobx';

class UIStore {
  @observable loading: {
    isVisible: boolean;
  } = { isVisible: false };
  @action showLoading = () => {
    this.loading = {
      isVisible: true,
    };
  };
  @action hideLoading = () => {
    this.loading = {
      isVisible: false,
    };
  };
  @observable cameraOption: {
    isVisible: boolean;
  } = { isVisible: false };

  @action showCameraOption = () => {
    this.cameraOption = {
      isVisible: true,
    };
  };
  @action hideCameraOption = () => {
    this.cameraOption = {
      isVisible: false,
    };
  };
  @observable updateModal: {
    isVisible: boolean;
  } = { isVisible: false };
  @action showUpdateModal = () => {
    this.updateModal = {
      isVisible: true,
    };
  };
  @action hideUpdateModal = () => {
    this.updateModal = {
      isVisible: false,
    };
  };
  @observable descriptionUpdateModal: {
    isVisible: boolean;
  } = { isVisible: false };
  @action showDescriptionUpdateModal = () => {
    this.descriptionUpdateModal = {
      isVisible: true,
    };
  };
  @action hideDescriptionUpdateModal = () => {
    this.descriptionUpdateModal = {
      isVisible: false,
    };
  };
  constructor() {
    makeObservable(this);
  }
}

export default UIStore;
