import { action, observable } from 'mobx';
import { TypeAccount } from '../model/type-account';

class SessionStore {
  @observable storageWords: {
    storage?: Array<any>;
  } = {};
  @observable typeAccount: {
    typeAccount: TypeAccount;
  } = { typeAccount: TypeAccount.Basic };

  @action setTypeAccount = ({ typeAccount }: { typeAccount: TypeAccount }) => {
    this.typeAccount = {
      typeAccount,
    };
  };

  @action setData = ({ storage }: { storage?: any }) => {
    this.storageWords = {
      storage,
    };
  };
  @observable dataImage:
    | {
        imageData?: any;
      }
    | undefined;
  @action setImageData = ({ imageData }: { imageData?: any }) => {
    this.dataImage = {
      imageData,
    };
  };
}

export default SessionStore;
