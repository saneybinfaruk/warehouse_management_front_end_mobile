import {StyleSheet, Text, TextProps, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

interface Props extends TextProps {
  children: React.ReactNode;
}
const BoldText = ({children, style, ...props}: Props) => {
  const {colors} = useTheme();
  return (
    <Text style={[styles.defaultText, {color: colors.text}, style]} {...props}>
      {children}
    </Text>
  );
};

export default BoldText;

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
  },
});
