import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RegularText from './RegularText';
import SemiBoldText from './SemiBoldText';
import {MyColors} from '../constants/MyColors';

interface Props {
  label: string;
  btnLabel: string;
  onPress: () => void;
}
const AccountSuggestion = ({label, btnLabel, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <RegularText>{label}</RegularText>
      <TouchableOpacity onPress={onPress}>
        <SemiBoldText style={styles.btn}>{btnLabel}</SemiBoldText>
      </TouchableOpacity>
    </View>
  );
};

export default AccountSuggestion;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  btn: {
    color: MyColors.primaryColor,
    textDecorationLine: 'underline',
    fontSize: 15
  },
});
