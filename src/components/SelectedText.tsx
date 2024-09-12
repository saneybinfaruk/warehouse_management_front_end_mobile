import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SemiBoldText from './SemiBoldText';
import {MyColors} from '../constants/MyColors';

interface Props {
  label: string;
  onLabelPress: (value: string) => void;
  included: boolean;
}
const SelectedText = ({label, onLabelPress, included}: Props) => {
  return (
    <Pressable onPress={() => onLabelPress(label)}>
      <SemiBoldText style={included ? styles.included : styles.notIncluded}>
        {label}
      </SemiBoldText>
    </Pressable>
  );
};

export default SelectedText;

const styles = StyleSheet.create({
  included: {
    color: 'white',
    paddingHorizontal: 22,
    paddingVertical: 12,
    margin: 5,
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: '#508D4E',
    backgroundColor: MyColors.primaryColor,
    elevation: 3,
  },
  notIncluded: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    margin: 5,
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: '#D6EFD8',
    backgroundColor: MyColors.secondaryColor,
    elevation: 1,
    color:'black'
  },
});
