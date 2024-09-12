import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from './Skeleton';
import ItemLayoutSkeleton from './ItemLayoutSkeleton';
import Seperator from '../Seperator';

const HomeSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton style={{width: '100%', height: 45}} />
      <View style={{flexDirection: 'row', justifyContent: 'center', gap: 10}}>
        <Skeleton style={{width: '35%', height: 50}} />
        <Skeleton style={{width: '35%', height: 50}} />
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        ItemSeparatorComponent={() => <Seperator />}
        renderItem={() => <ItemLayoutSkeleton />}
      />
    </View>
  );
};

export default HomeSkeleton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    gap: 15,
  },
});
