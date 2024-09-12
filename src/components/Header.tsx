import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import backArrowIcon from '../../assets/photos/back_arrow.png';
import BoldText from './BoldText';

import {useNavigation, useTheme} from '@react-navigation/native';

interface Props {
  showMenu?: boolean;
  showBackBtn?: boolean;
  title: string;
}
const Header = ({showBackBtn = true, showMenu = false, title}: Props) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  return (
    <View
      style={[styles.headerContainer, {backgroundColor: colors.background}]}>
      <View style={styles.titleContainer}>
        {showBackBtn && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </TouchableOpacity>
        )}
        <BoldText style={styles.settingText}>{title}</BoldText>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center', gap: 40},
  settingText: {fontSize: 24},
});
