import {
  BackHandler,
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import ItemLayout from '../components/ItemLayout';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  GetInventoryItems,
  HomeStackParams,
  Role,
} from '../interfaces/interfaces';
import {GET_ITEMS} from '../graphql/graphql';
import {useQuery} from '@apollo/client';
import useRefresh from '../hooks/useRefresh';
import Seperator from '../components/Seperator';
import MButton from '../components/MButton';
import HomeSkeleton from '../components/skeleton/HomeSkeleton';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import {useFocusEffect} from '@react-navigation/native';
import {resetQuery} from '../redux/InventoryQuerySlice';
import {MyColors} from '../constants/MyColors';
import Reload from '../components/Reload';

type Props = NativeStackScreenProps<HomeStackParams, 'Home'>;
const Home = ({navigation}: Props) => {
  const [queryText, setQueryText] = useState('');
  const {categories, maxQuantity, minQuantity} = useSelector(
    (state: RootState) => state.inventoryQuerySlice,
  );

  const {data, loading, refetch, error} = useQuery<GetInventoryItems>(
    GET_ITEMS,
    {
      variables: {
        filter: {
          categories,
          minQuantity,
          maxQuantity,
        },
      },
    },
  );

  const {onRefresh, refreshing} = useRefresh(refetch);

  const handleOnChange = (value: string) => {
    setQueryText(value.toLowerCase());
  };

  let filteredList = data?.inventoryItems.filter(
    item =>
      item.name.toLowerCase().includes(queryText) ||
      item.owner.toLowerCase().startsWith(queryText) ||
      item.location.toLowerCase().includes(queryText),
  );
  const dispatch = useDispatch();
  const handleGoBack = () => {
    return false;
  };
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          handleGoBack();
          dispatch(resetQuery());
          navigation.goBack();
          return true;
        }
        return false;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => backHandler.remove();
    }, [navigation]),
  );

  if (loading) return <HomeSkeleton />;
  if (error) <Reload callback={refetch} />;

  return (
    <FlatList
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <Header handleOnChange={handleOnChange} navigation={navigation} />
      }
      data={filteredList}
      renderItem={({item: inventoryItem}) => (
        <ItemLayout
          inventoryItem={inventoryItem}
          onPress={() => navigation.navigate('Details', {id: inventoryItem.id})}
        />
      )}
      keyExtractor={item => item?.id.toString()}
      ItemSeparatorComponent={() => <Seperator />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default Home;

interface HeaderProps {
  handleOnChange: (value: string) => void;
  navigation: Props['navigation'];
}
const Header = ({handleOnChange, navigation}: HeaderProps) => {
  const {user} = useSelector((state: RootState) => state.authSlice);

  return (
    <View>
      <TextInput
        style={styles.search}
        placeholder="Search..."
        onChangeText={value => handleOnChange(value.trim())}
        placeholderTextColor={MyColors.lightText}
      />
      <View style={styles.btnContainer}>
        {user?.role === Role.MANAGER && (
          <MButton
            iconName="plus"
            onPress={() => navigation.navigate('AddItem', {})}
            label="Add Item"
          />
        )}
        <MButton
          iconName="filter-variant"
          onPress={() => navigation.navigate('Filter')}
          label="Filter"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  search: {
    backgroundColor: MyColors.secondaryColor,
    marginVertical: 10,
    paddingHorizontal: 8,
    fontSize: 16,
    borderRadius: 4,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
});
