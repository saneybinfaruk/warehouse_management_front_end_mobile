import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {useTheme} from '@react-navigation/native';

const Seperator = () => {
  const {colors} = useTheme();
  return <View style={[styles.container,{backgroundColor: colors.border}]} />;
};

export default Seperator;

const styles = StyleSheet.create({
  container: {
    height: 0.6,
  },
});
