import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SemiBoldText from './SemiBoldText';

const ErrorText = ({errorMessage}: {errorMessage: string}) => {
  return <SemiBoldText style={styles.errorText}>{errorMessage}</SemiBoldText>;
};

export default ErrorText;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 15,
    fontWeight: '500',
    alignItems: 'center',
    paddingVertical: 15
  },
});
