import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BoldText from './BoldText';
import MButton from './MButton';

const Reload = ({callback}: {callback: () => void}) => {
  const [reload, setReload] = useState(false);
  return (
    <View>
      <BoldText>Something went wrong!</BoldText>
      <MButton
        label="Reload"
        onPress={() => {
          callback();
          setReload(prev => !prev);
        }}
        iconName="reload"
      />
    </View>
  );
};

export default Reload;

const styles = StyleSheet.create({});
