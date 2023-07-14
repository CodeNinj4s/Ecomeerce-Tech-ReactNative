import React from 'react';
import { TouchableOpacity } from 'react-native';

const TouchableText = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default TouchableText;
