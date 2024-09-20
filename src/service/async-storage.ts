import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegisterData } from '../model/register';

class AsyncStorageService {
  fetchIsFirstLaunch = async () => {
    const isFirstLaunch = await AsyncStorage.getItem('is_first_launch');
    console.log('parse', isFirstLaunch);

    if (isFirstLaunch != null) {
      const parsed = JSON.parse(isFirstLaunch);
      return parsed;
    }
    return false;
  };
  setUserProfile = async (profile: RegisterData) => {
    await AsyncStorage.setItem('account', JSON.stringify(profile));
  };

  getUserProfile = async () => {
    const value = await AsyncStorage.getItem('account');
    if (value !== null) {
      const profile: RegisterData = JSON.parse(value);
      return profile;
    }
    return {} as RegisterData;
  };

  setTypeAccount = async (type: any) => {
    await AsyncStorage.setItem('type_account', JSON.stringify(type));
  };
  setFirstLaunch = () =>
    AsyncStorage.setItem('is_first_launch', JSON.stringify(true));

  setAccessToken = (accessToken: string) =>
    AsyncStorage.setItem('access_token', accessToken);

  clearAccessToken = () => AsyncStorage.removeItem('access_token');

  setIsFaceIdIsEnabled = async (isEnabled: boolean) => {
    await AsyncStorage.setItem('isFaceIdIsEnabled', JSON.stringify(isEnabled));
  };

  getFaceIdIsEnabled = async () => {
    const isFaceIdEnabled = await AsyncStorage.getItem('isFaceIdIsEnabled');

    if (isFaceIdEnabled != null) {
      const value = JSON.parse(isFaceIdEnabled);
      return value;
    }
    return false;
  };
}

const asyncStorageService = new AsyncStorageService();

export default asyncStorageService;
