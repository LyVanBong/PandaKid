import { TextInput } from 'react-native';
import React, { Ref, useState } from 'react';

const SquareTextInput = (
  {
    onChangeText,
    value,
  }: {
    value: string;
    // ref?: any;
    onChangeText: (value: string) => void;
  },
  ref: any
) => {
  return (
    <TextInput
      value={value}
      ref={ref}
      onChangeText={(value: string) => {
        onChangeText(value);
      }}
      maxLength={1}
      inputMode={'tel'}
      style={{
        // borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        flex: 1,
        paddingVertical: 15,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5.62,
        elevation: 7,
        fontSize: 20,
        textAlign: 'center',
      }}
    />
  );
};
export default React.forwardRef(SquareTextInput);
