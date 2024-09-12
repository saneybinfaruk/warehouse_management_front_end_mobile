import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setMaxQuantity,
  setMinQuantity,
  setCategories,
} from '../redux/InventoryQuerySlice';
import {RootState} from '../redux/Store';

const useQueryFilter = () => {
  const inventoryQuery = useSelector(
    (state: RootState) => state.inventoryQuerySlice,
  );

  const [categories, setInventoryCategories] = useState<string[]>(
    inventoryQuery.categories ? inventoryQuery.categories : [],
  );

  const [quantity, setQuantity] = useState<{
    minQuantity: number | null;
    maxQuantity: number | null;
  }>({
    minQuantity: inventoryQuery.minQuantity
      ? inventoryQuery.minQuantity
      : 0 || null,
    maxQuantity: inventoryQuery.maxQuantity
      ? inventoryQuery.maxQuantity
      : 0 || null,
  });

  const quantityError = quantity.maxQuantity! < quantity.minQuantity!;

  const dispatch = useDispatch();

  const handleCategoriePress = useCallback((productCategorieValue: string) => {
    setInventoryCategories(prevCategories => {
      if (prevCategories.includes(productCategorieValue)) {
        return prevCategories.filter(type => type !== productCategorieValue);
      } else {
        return [...prevCategories, productCategorieValue];
      }
    });
  }, []);

  const handleSetMinQuantity = useCallback(
    (value: string) => {
      setQuantity({
        ...quantity,
        minQuantity: isNaN(parseInt(value)) ? null : parseInt(value),
      });
    },
    [quantity],
  );
  const handleSetMaxQuantity = useCallback(
    (value: string) => {
      setQuantity({
        ...quantity,
        maxQuantity: isNaN(parseInt(value)) ? null : parseInt(value),
      });
    },
    [quantity],
  );

  const handleReset = useCallback(() => {
    setInventoryCategories([]);
    setQuantity({minQuantity: null, maxQuantity: null});

    dispatch(setCategories([]));
    dispatch(setMinQuantity(null));
    dispatch(setMaxQuantity(null));
  }, []);

  const setFilter = () => {
    dispatch(setCategories(categories));

    dispatch(setMinQuantity(quantity.minQuantity));
    dispatch(setMaxQuantity(quantity.maxQuantity));
  };

  return {
    categories,
    quantity,
    quantityError,
    handleCategoriePress,
    handleSetMinQuantity,
    handleSetMaxQuantity,
    handleReset,
    setFilter,
  };
};

export default useQueryFilter;
