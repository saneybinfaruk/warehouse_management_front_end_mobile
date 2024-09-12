import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import RegularText from './RegularText';
import {MyColors} from '../constants/MyColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  iconName: string;
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
}
const MButton = ({
  iconName,
  label,
  onPress,
  disabled,
  loading,
  style,
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, {opacity: disabled ? 0.5 : 1}]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}>
      {iconName && !loading && (
        <MaterialCommunityIcons name={iconName} size={20} color={'white'} />
      )}
      {loading && <ActivityIndicator color={MyColors.secondaryColor} />}
      <RegularText style={[styles.btn]}>{label}</RegularText>
    </TouchableOpacity>
  );
};

export default MButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: MyColors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 6,
  },
  btn: {
    fontSize: 15,
    color: 'white',
  },
  disableBtn: {
    opacity: 0.8,
  },
});
