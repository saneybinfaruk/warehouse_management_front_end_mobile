import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import TextInput from '../components/TextInput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AddInventoryInput,
  AddInventoryItemData,
  AddInventoryItemVars,
  GetInventoryItem,
  HomeStackParams,
  InventoryItem,
  Role,
  UpdatedInventoryItemData,
  UpdateInventoryItemVars,
} from '../interfaces/interfaces';
import {inventoryItems} from '../constants/datas';
import {useMutation, useQuery} from '@apollo/client';
import {
  ADD_INVENTORY_ITEM,
  GET_ITEM,
  UPDATE_INVENTORY_ITEM,
} from '../graphql/graphql';
import {InventoryItemField, inventoryItemSchema} from '../zod/schemas';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import MButton from '../components/MButton';
import UpdateItemSkeleton from '../components/skeleton/UpdateItemSkeleton';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import Reload from '../components/Reload';

type Props = NativeStackScreenProps<HomeStackParams, 'AddItem'>;

const AddItem = ({route, navigation}: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const id = route.params.id;
  const {user} = useSelector((state: RootState) => state.authSlice);

  const {
    data: getItem,
    loading: loadingInventoryItem,
    refetch: RefetchInventoryItem,
    error: ErrorToGetInventoryItem,
  } = useQuery<GetInventoryItem>(GET_ITEM, {
    variables: {id: route.params.id},
    skip: !id,
  });

  const {control, handleSubmit, reset, setValue} = useForm<InventoryItemField>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: {name: '', location: '', owner: '', quantity: undefined},
  });

  const [addInventoryItem, {data, loading, error}] = useMutation<
    AddInventoryItemData,
    AddInventoryItemVars
  >(ADD_INVENTORY_ITEM);

  const [
    updateInventoryItem,
    {data: updatedInventoryItem, loading: updatingInventoryItem},
  ] = useMutation<UpdatedInventoryItemData, UpdateInventoryItemVars>(
    UPDATE_INVENTORY_ITEM,

    {
      update(cache, {data}) {
        if (!data) return;
        const existingItem = cache.readQuery<GetInventoryItem>({
          query: GET_ITEM,
          variables: {id: route.params.id},
        });

        if (existingItem) {
          cache.writeQuery({
            query: GET_ITEM,
            variables: {id: route.params.id},
            data: {
              inventoryItem: {
                ...existingItem.inventoryItem,
                ...data.updateInventoryItem, // Apply the updated fields
              },
            },
          });
        }
      },
    },
  );
  const title = useMemo(() => (id ? 'Update Item' : 'Add Item'), [id]);

  useEffect(() => {
    navigation.setOptions({title});
  }, [navigation]);

  useEffect(() => {
    if (id && getItem?.inventoryItem) {
      setValue('name', getItem.inventoryItem?.name || '');
      setValue('location', getItem.inventoryItem?.location || '');
      setValue('owner', getItem.inventoryItem?.owner || '');
      setValue('quantity', getItem.inventoryItem?.quantity || 0);
    }
  }, [id, getItem, setValue]);

  const onSubmit: SubmitHandler<InventoryItemField> = async data => {
    try {
      if (id) {
        const response = await updateInventoryItem({
          variables: {
            inventoryItemId: id,
            updatedValue: data,
          },
        });

        if (response?.data?.updateInventoryItem) {
          navigation.goBack();
        }
      } else {
        const response = await addInventoryItem({
          variables: {
            addInventoryItemInput: {
              name: data?.name,
              location: data?.location,
              owner: data?.owner,
              quantity: data?.quantity!,
            },
          },
        });

        if (response?.data?.addInventoryItem) {
          navigation.goBack();
        }
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const editable = user?.role === Role.MANAGER;
  if (loadingInventoryItem) return <UpdateItemSkeleton />;
  if (ErrorToGetInventoryItem) <Reload callback={RefetchInventoryItem} />;
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput<InventoryItemField>
          control={control}
          name="name"
          label="Name"
          placeholderText="e.g. Item Name..."
          editable={editable}
        />

        <TextInput<InventoryItemField>
          control={control}
          name="location"
          label="Location"
          placeholderText="e.g. Item location: Shelf N2, Bin B1..."
          editable={editable}
        />
        <TextInput<InventoryItemField>
          control={control}
          name="owner"
          label="Owner"
          placeholderText="e.g. Item Owner Name..."
          editable={editable}
        />
        <TextInput<InventoryItemField>
          control={control}
          name="quantity"
          label="Quantity"
          placeholderText="e.g. 20"
          inputMode="numeric"
        />
      </ScrollView>

      <View style={{margin: 5}}>
        <MButton
          label={title}
          onPress={handleSubmit(onSubmit)}
          iconName={id ? 'content-save-move' : 'content-save'}
          style={{alignSelf: 'flex-end', marginRight: 10, marginBottom: 10}}
        />
      </View>
    </>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 12,
  },
});
