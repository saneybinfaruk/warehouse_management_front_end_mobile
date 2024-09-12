import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectedText from './SelectedText';
import BoldText from './BoldText';

interface Props {
  label: string;
  array: string[];
  items: string[];
  itemOnPress: (value: string) => void;
}
const Select = ({label, array, items, itemOnPress}: Props) => {
  return (
    <View style={styles.container}>
      <BoldText style={styles.label}>{label}</BoldText>
      <View style={styles.scrollContent}>
        {items.map(item => (
          <SelectedText
            key={item}
            label={item}
            included={array.includes(item)}
            onLabelPress={itemOnPress}
          />
        ))}
      </View>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  scrollContainer: {
    paddingTop: 5,
    paddingBottom: 15,
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 20,
    paddingLeft: 8,
    paddingBottom: 8,
  },
});
