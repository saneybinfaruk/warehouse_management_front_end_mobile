import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  RefreshControl,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect} from 'react';
import {inventoryItems} from '../constants/datas';
import boltImage from '../../assets/photos/bolt.jpg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  DeletedInventoryItemData,
  DeleteInventoryItem,
  GetInventoryItem,
  HomeStackParams,
  Role,
} from '../interfaces/interfaces';
import {useMutation, useQuery} from '@apollo/client';
import {DELETE_INVENTORY_ITEM, GET_ITEM} from '../graphql/graphql';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {MyColors} from '../constants/MyColors';
import Seperator from '../components/Seperator';
import {formateDate} from '../utils/FormateDate';
import RegularText from '../components/RegularText';
import BoldText from '../components/BoldText';
import SemiBoldText from '../components/SemiBoldText';
import MButton from '../components/MButton';
import DetailsSkeleton from '../components/skeleton/DetailsSkeleton';
import useRefresh from '../hooks/useRefresh';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import Reload from '../components/Reload';

type Props = NativeStackScreenProps<HomeStackParams, 'Details'>;
const Details = ({navigation, route}: Props) => {
  const id = route.params.id;
  const {user} = useSelector((state: RootState) => state.authSlice);

  const {data, loading, refetch, error} = useQuery<GetInventoryItem>(GET_ITEM, {
    variables: {id},
  });

  const [
    deleteInventoryItem,
    {data: deleteInventory, loading: deletingInventoryItem},
  ] = useMutation<DeletedInventoryItemData, DeleteInventoryItem>(
    DELETE_INVENTORY_ITEM,
    {variables: {inventoryItemId: id}},
  );

  const handleDeleteItem = async () => {
    try {
      const response = await deleteInventoryItem({
        variables: {inventoryItemId: id},
      });

      if (response?.data?.deleteInventoryItem) navigation.goBack();
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };

  const {onRefresh, refreshing} = useRefresh(refetch);
  if (loading || deletingInventoryItem) return <DetailsSkeleton />;
  if (error) <Reload callback={refetch} />;

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{gap: 10}}>
          <Header data={data!} />
          <View style={styles.btnContainer}>
            <MButton
              iconName="square-edit-outline"
              label="Edit"
              onPress={() => navigation.navigate('AddItem', {id})}
            />
            {user?.role === Role.MANAGER && (
              <MButton
                iconName="delete"
                label="Delete"
                onPress={() => {
                  Alert.alert(
                    'Delete',
                    'Are you sure ?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                      },
                      {
                        text: 'Delete',
                        onPress: handleDeleteItem,
                      },
                    ],
                    {cancelable: false},
                  );
                }}
              />
            )}
          </View>
          <Content data={data!} />
        </View>
      </ScrollView>
    </>
  );
};

export default Details;

const Header = ({data}: {data: GetInventoryItem}) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={boltImage} style={styles.image} />
      <View style={{flex: 0.6, justifyContent: 'space-between'}}>
        <View style={{gap: 3}}>
          <RegularText style={styles.inventoryItemId}>
            #{data?.inventoryItem?.id}
          </RegularText>
          <BoldText style={styles.inventoryItemName}>
            {data?.inventoryItem?.name}
          </BoldText>
        </View>

        <View style={{flexDirection: 'row', gap: 10}}>
          <BoldText style={styles.inventoryItemQuantity}>
            {data?.inventoryItem?.quantity}
          </BoldText>
          <RegularText style={{fontSize: 13}}>Total quantity</RegularText>
        </View>
      </View>
    </View>
  );
};
const Content = ({data}: {data: GetInventoryItem}) => {
  return (
    <View style={{paddingHorizontal: 15}}>
      <HeadlingWithItem
        heading="barcode"
        item={data?.inventoryItem?.barcode!}
      />
      <Seperator />
      <HeadlingWithItem
        heading="location"
        item={data?.inventoryItem?.location!}
      />
      <Seperator />
      <HeadlingWithItem heading="owner" item={data?.inventoryItem?.owner!} />
      <Seperator />
      <HeadlingWithItem heading="sku" item={data?.inventoryItem?.sku!} />
      <Seperator />
      <HeadlingWithItem
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignSelf: 'flex-start',
          gap: 4,
          paddingVertical: 8,
        }}
        heading="description"
        item={data?.inventoryItem?.description!}
      />
      <Seperator />
      <HeadlingWithItem
        heading="Category"
        item={data?.inventoryItem?.category!}
      />
      <Seperator />
      <HeadlingWithItem
        heading="Date Received"
        item={formateDate(data?.inventoryItem?.dateReceived!)}
      />
      <Seperator />

      <Seperator />
      <HeadlingWithItem
        heading="Cost Price:"
        item={'$' + data?.inventoryItem?.costPrice!}
      />
      <Seperator />
      <HeadlingWithItem
        heading="Selling Price:"
        item={'$' + data?.inventoryItem?.sellingPrice!}
      />
      <Seperator />
      <HeadlingWithItem
        heading="Warehouse"
        item={data?.inventoryItem?.warehouse!}
      />
      <Seperator />
      <HeadlingWithItem
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignSelf: 'flex-start',
          gap: 4,
          paddingVertical: 8,
        }}
        heading="Handling Instructions"
        item={data?.inventoryItem?.handlingInstructions!}
      />
    </View>
  );
};
interface HeadlingProps {
  heading: string;
  item: string;
  style?: StyleProp<ViewStyle>;
}
const HeadlingWithItem = ({heading, item, style}: HeadlingProps) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 12,
        },
        style,
      ]}>
      <SemiBoldText>
        {heading.substring(0, 1).toUpperCase() + heading.substring(1)}
      </SemiBoldText>
      <BoldText>{item}</BoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    flex: 0.4,
    height: 120,
    alignSelf: 'center',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  inventoryItemId: {
    fontWeight: '500',
    color: 'white',
    backgroundColor: MyColors.primaryColor,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 5,
  },
  inventoryItemName: {fontSize: 17, fontWeight: '600'},
  inventoryItemQuantity: {
    backgroundColor: MyColors.secondaryColor,
    paddingHorizontal: 15,
    color: 'black',
    fontWeight: '600',
    paddingVertical: 3,
    borderRadius: 5,
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: MyColors.secondaryColor,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 5,
  },
});
