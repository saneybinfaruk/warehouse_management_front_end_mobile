import {StyleSheet, Text, TextProps, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

interface Props extends TextProps {
  children: React.ReactNode;
}
const SemiBoldText = ({children, style, ...props}: Props) => {
  const {colors} = useTheme();
  return (
    <Text style={[styles.defaultText, {color: colors.text}, style]} {...props}>
      {children}
    </Text>
  );
};

export default SemiBoldText;

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
});
