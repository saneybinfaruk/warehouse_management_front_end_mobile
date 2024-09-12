import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {MyColors} from '../constants/MyColors';
import BoldText from '../components/BoldText';
import {useQuery} from '@apollo/client';
import {GET_INVENTORY_CATEGORIES} from '../graphql/graphql';
import {
  GetInventoryItemsCategorie,
  HomeStackParams,
} from '../interfaces/interfaces';
import RegularText from '../components/RegularText';
import SelectedText from '../components/SelectedText';
import Select from '../components/Select';
import useQueryFilter from '../hooks/useQueryFilter';
import MButton from '../components/MButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import QuantityFilter from '../components/QuantityFilter';
import Skeleton from '../components/skeleton/Skeleton';
import FilterSkeleton from '../components/skeleton/FilterSkeleton';
import Reload from '../components/Reload';

type Props = NativeStackScreenProps<HomeStackParams, 'Filter'>;
const Filter = ({navigation}: Props) => {
  const {colors} = useTheme();

  const {data, loading, error, refetch} = useQuery<GetInventoryItemsCategorie>(
    GET_INVENTORY_CATEGORIES,
  );

  const {
    categories,
    handleCategoriePress,
    handleSetMaxQuantity,
    handleSetMinQuantity,
    quantity,
    quantityError,
    handleReset,
    setFilter,
  } = useQueryFilter();

  if (loading) return <FilterSkeleton />;
  if (error) <Reload callback={refetch} />;
  return (
    <>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.pop()}>
          <Icon name="close" color={colors.text} size={26} />
        </TouchableOpacity>

        <BoldText style={styles.headingText}>Filter</BoldText>

        <QuantityFilter
          setMinQuantity={handleSetMinQuantity}
          setMaxQuantity={handleSetMaxQuantity}
          quantityError={quantityError}
          minQuantity={quantity.minQuantity?.toString()!}
          maxQuantity={quantity.maxQuantity?.toString()!}
        />

        <Select
          array={categories}
          itemOnPress={handleCategoriePress}
          items={data?.inventoryItemsCategories || []}
          label="Categories"
        />
      </ScrollView>
      <View style={styles.btnContainer}>
        <MButton
          iconName="filter"
          label="Apply"
          disabled={quantityError}
          onPress={() => {
            setFilter();
            navigation.pop();
          }}
        />
        <MButton
          iconName="notification-clear-all"
          label="Reset Filter"
          onPress={() => {
            handleReset();
            navigation.pop();
          }}
        />
      </View>
    </>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  closeBtn: {alignSelf: 'flex-end', marginTop: 25, marginRight: 10},
  headingText: {
    fontSize: 25,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'flex-end',
    padding: 10,
  },
});
