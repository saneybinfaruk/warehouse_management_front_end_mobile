import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from './Skeleton';
import Seperator from '../Seperator';

const DetailsSkeleton = () => {
  return (
    <View>
      <View style={{flexDirection: 'row', gap: 25}}>
        <Skeleton
          style={{
            height: 120,
            width: '40%',
            flex: 0.4,
            borderRadius: 10,
            marginLeft: 5,
          }}
        />
        <View
          style={{
            flex: 0.6,
            height: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{gap: 10}}>
            <Skeleton style={{height: 20, width: '20%'}} />
            <Skeleton style={{height: 25, width: '65%'}} />

            <View style={{gap: 10, flexDirection: 'row', marginTop: 25}}>
              <Skeleton style={{height: 25, width: '20%'}} />
              <Skeleton style={{height: 16, width: '45%'}} />
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 15,
          alignSelf: 'flex-end',
          paddingVertical: 25,
          paddingHorizontal: 20,
        }}>
        <Skeleton style={{width: '25%', height: 45, borderRadius: 6}} />
        <Skeleton style={{width: '25%', height: 45, borderRadius: 6}} />
      </View>
      <View style={{paddingHorizontal: 15}}>
        <Skeleton style={{width: '100%', height: 45, marginVertical: 10}} />
        <Seperator />
        <Skeleton style={{width: '100%', height: 45, marginVertical: 10}} />
        <Seperator />
        <Skeleton style={{width: '100%', height: 45, marginVertical: 10}} />
        <Seperator />
        <Skeleton style={{width: '100%', height: 45, marginVertical: 10}} />
        <Seperator />
        <Skeleton style={{width: '100%', height: 45, marginVertical: 10}} />
        <Seperator />
        <Skeleton style={{width: '100%', height: 45, marginVertical: 10}} />
        <Seperator />
        <Skeleton style={{width: '100%', height: 45, marginVertical: 10}} />
        <Seperator />
        <Skeleton style={{width: '100%', height: 45, marginVertical: 10}} />
      </View>
    </View>
  );
};

export default DetailsSkeleton;

const styles = StyleSheet.create({});
