import {StyleSheet, Text, TextProps, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {useTheme} from '@react-navigation/native';

interface Props extends TextProps {
  children: React.ReactNode;
}
const RegularText = ({children, style, ...props}: Props) => {
  const {colors} = useTheme();
  return (
    <Text style={[styles.defaultText, {color: colors.text}, style]} {...props}>
      {children}
    </Text>
  );
};

export default RegularText;

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: 'black',
  },
});
