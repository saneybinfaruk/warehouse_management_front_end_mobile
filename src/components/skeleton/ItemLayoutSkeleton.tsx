import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from './Skeleton';
import {MyColors} from '../../constants/MyColors';

const ItemLayoutSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton style={{width: 60, height: 55,borderRadius: 10}} />
      <View style={styles.contentContainer}>
        <View style={{flex: 1, gap: 5}}>
          <Skeleton style={{width: '100%', height: 25}} />
          <Skeleton style={{width: '60%', height: 16}} />
          <Skeleton style={{width: '70%', height: 16}} />
          <Skeleton style={{width: '90%', height: 16}} />
        </View>

        <View style={{gap: 3, alignItems: 'center'}}>
          <Skeleton style={{width: 60, height: 26}} />
          <Skeleton style={{width: 60, height: 16}} />
        </View>
      </View>
    </View>
  );
};

export default ItemLayoutSkeleton;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderColor: MyColors.primaryColor,
    flexDirection: 'row',
    gap: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    gap: 5,
  },
});
