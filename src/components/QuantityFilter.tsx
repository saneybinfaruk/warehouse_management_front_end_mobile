import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import BoldText from './BoldText';
import RegularText from './RegularText';
import {useTheme} from '@react-navigation/native';
import SemiBoldText from './SemiBoldText';

interface Props {
  setMinQuantity: (value: string) => void;
  setMaxQuantity: (value: string) => void;
  quantityError: boolean;
  minQuantity: string;
  maxQuantity: string;
}
const QuantityFilter = ({
  setMinQuantity,
  setMaxQuantity,
  quantityError,
  minQuantity,
  maxQuantity,
}: Props) => {
  const {colors} = useTheme();
  return (
    <View style={styles.priceContainer}>
      <BoldText style={styles.label}>Quantity Range</BoldText>
      <View style={styles.inputGroupContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, {color: colors.text}]}
            placeholder="0"
            placeholderTextColor={colors.border}
            onChangeText={setMinQuantity}
            inputMode="numeric"
            value={minQuantity}
          />
          <RegularText style={styles.inputInfo}>Min.</RegularText>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, {color: colors.text}]}
            placeholder="10,000"
            placeholderTextColor={colors.border}
            inputMode="numeric"
            onChangeText={setMaxQuantity}
            value={maxQuantity}
          />
          <RegularText style={styles.inputInfo}>Max.</RegularText>
        </View>
      </View>
      {quantityError && (
        <SemiBoldText style={styles.helperText}>
          Max quantity must be bigger then Min quantity!
        </SemiBoldText>
      )}
    </View>
  );
};

export default QuantityFilter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  applyContainer: {
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#1A5319',
    position: 'absolute',
    bottom: 12,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 50,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#80AF81',
  },
  applyContainerDisable: {
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#80AF81',
    position: 'absolute',
    bottom: 12,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 50,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
    color: 'lightgray',
  },

  applyText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
  },

  contentContainer: {
    paddingBottom: 0,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  filterLabel: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
  resetLabel: {
    fontSize: 18,
    color: 'black',
    fontWeight: '700',
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 12,
    fontSize: 17,
    borderRadius: 10,
  },

  inputGroupContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 30,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    gap: 3,
  },

  inputInfo: {
    marginLeft: 5,
  },

  helperText: {
    color: 'red',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 13,
    paddingVertical: 5,
  },

  priceContainer: {
    marginTop: 8,
  },

  scrollContainer: {
    paddingTop: 5,
    paddingBottom: 15,
  },
  scrollContent: {
    flexDirection: 'row',
    gap: 10,
  },
  typeLabel: {
    color: 'black',
    fontSize: 19,
    fontWeight: '500',
    paddingHorizontal: 25,
    paddingVertical: 12,
    margin: 5,
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: 'gray',
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 12,
    marginLeft: 5,
  },
});
