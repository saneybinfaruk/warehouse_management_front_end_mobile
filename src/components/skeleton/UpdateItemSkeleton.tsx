import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from './Skeleton';

const UpdateItemSkeleton = () => {
  return (
    <View style={{paddingHorizontal: 12, gap: 15}}>
      <Input />
      <Input />
      <Input />
      <Input />
    </View>
  );
};

export default UpdateItemSkeleton;

const Input = () => {
  return (
    <View style={{gap: 8}}>
      <Skeleton style={{width: '30%', height: 30}} />
      <Skeleton style={{width: '100%', height: 45}} />
    </View>
  );
};
const styles = StyleSheet.create({});
