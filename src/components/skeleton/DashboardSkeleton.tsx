import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from './Skeleton';
import {useTheme} from '@react-navigation/native';

const DashboardSkeleton = () => {
  return (
    <View style={{paddingHorizontal: 15}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 20,
          marginBottom: 10,
        }}>
        <View style={{gap: 8, flex: 1}}>
          <Skeleton style={{height: 20}} />
          <Skeleton style={{height: 25, width: '40%'}} />
        </View>
        <Skeleton style={{height: 45, width: 45, borderRadius: 10}} />
      </View>
      <Skeleton style={{width: '40%', height: 35, marginBottom: 20}} />
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          flexWrap: 'wrap',
        }}>
        <Skeleton style={{width: '40%', height: 80, borderRadius: 10}} />
        <Skeleton style={{width: '40%', height: 80, borderRadius: 10}} />
        <Skeleton style={{width: '40%', height: 80, borderRadius: 10}} />
      </View>
      <Skeleton style={{width: '100%', height: 46, marginVertical: 15}} />
      <Skeleton style={{width: '55%', height: 40, marginVertical: 15}} />
      <Skeleton
        style={{
          width: '100%',
          height: 310,
          marginVertical: 15,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default DashboardSkeleton;

const styles = StyleSheet.create({});
