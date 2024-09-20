import { Dimensions, StatusBar } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const sizeWidth = (value: number) => {
  return wp(value);
};
export const sizeHeight = (value: number) => {
  return hp(value);
};

export const fontSize = (value: number) => {
  return wp(value);
};

export const convertNumber = (number: number) => {
  if (number < 1000) {
    return number;
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return (number / 1000000).toFixed(1) + 'M';
};

export const randomColor = () => {
  const color = [
    '#9CAEFF',
    '#B0A9D3',
    '#E7B4D3',
    '#ABD596',
    '#FEC679',
    '#F9A98E',
    '#D596A1',
    '#96C6D5',
    '#9D9782',
    '#96AFD5',
  ];
  return color[Math.round(Math.random() * 10)];
};

export const convertPhoneNumberToViFormat = (phoneNumber: string) =>
  phoneNumber.replace('0', '+84');
