import auth from '@react-native-firebase/auth';
import { convertPhoneNumberToViFormat } from '../utils/Utils';

class AuthService {
  sendVerificationCodeToPhoneNumber = (phoneNumber: string) => {
    const to = convertPhoneNumberToViFormat(phoneNumber);
    return auth().signInWithPhoneNumber(to, true);
  };

  confirmVerificationCode = async (
    phoneNumber: string,
    verificationCode: string
  ) => {
    const confirmation = await auth().signInWithPhoneNumber(
      convertPhoneNumberToViFormat(phoneNumber)
    );
    return await confirmation.confirm(verificationCode);
  };
}

export const authService = new AuthService();
