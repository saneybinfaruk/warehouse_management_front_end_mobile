import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from './Skeleton';

const FilterSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton
        style={{height: 45, width: 45, marginTop: 12, alignSelf: 'flex-end'}}
      />
      <Skeleton style={{height: 35, width: '40%', marginTop: 12}} />
      <Skeleton style={{height: 120, width: '100%', marginTop: 12}} />
      <Skeleton style={{height: 25, width: '44%', marginTop: 12}} />

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 12,
          marginTop: 12,
        }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(item => (
          <Skeleton
            key={item}
            style={{height: 55, width: '30%', borderRadius: 12}}
          />
        ))}
      </View>
    </View>
  );
};

export default FilterSkeleton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
