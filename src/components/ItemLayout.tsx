import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {MyColors} from '../constants/MyColors';
import boltImage from '../../assets/photos/bolt.jpg';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTheme} from '@react-navigation/native';
import {InventoryItem} from '../interfaces/interfaces';
import BoldText from './BoldText';
import SemiBoldText from './SemiBoldText';
import RegularText from './RegularText';

interface Props {
  inventoryItem: InventoryItem;
  onPress: () => void;
}
const ItemLayout = ({inventoryItem, onPress}: Props) => {
  const {colors} = useTheme();
  const {name, location, owner, quantity, sku} = inventoryItem;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.4}
      onPress={onPress}>
      <Image source={boltImage} style={styles.image} />

      <View style={styles.contentContainer}>
        <View>
          <BoldText style={[styles.nameText, {color: colors.text}]}>
            {name}
          </BoldText>
          <RegularText>Location: {location}</RegularText>
          <RegularText>Owner: {owner}</RegularText>
          <RegularText>SKU: {sku}</RegularText>
        </View>

        <View style={{gap: 3, alignItems: 'center'}}>
          <BoldText
            style={[
              styles.quantity,
              {backgroundColor: MyColors.secondaryColor},
            ]}>
            {quantity}
          </BoldText>
          <RegularText>pcs</RegularText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ItemLayout);

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderColor: MyColors.primaryColor,
    flexDirection: 'row',
    gap: 20,
    
  },
  locationHeading: {
    borderColor: MyColors.primaryColor,
    borderWidth: 0.5,
  },
  quantity: {
    alignSelf: 'center',
    paddingHorizontal: 6,
    borderRadius: 2,
    color: 'black',
  },
  nameText: {
    fontSize: 17,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'lightgray',
    alignSelf: 'flex-start',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    gap: 5,
  },
});
