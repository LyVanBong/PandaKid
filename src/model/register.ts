import { TypeAccount } from './type-account';

export type RegisterData = {
  email: string;
  phoneNumber: string;
  password?: string;
  rePassword?: string;
  displayName: string;
  typeAccount: TypeAccount;
};
