import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InventoryQueryState {
  categories: string[];
  minQuantity: number | null;
  maxQuantity: number | null;
  search: string;
}

const initialState: InventoryQueryState = {
  categories: [],
  minQuantity: null,
  maxQuantity: null,
  search: '',
};

const InventoryQuerySlice = createSlice({
  name: 'InventoryQuerySlice',
  initialState,

  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;

      console.log('state.categories => ', state.categories);
    },

    setMinQuantity(state, action: PayloadAction<number | null>) {
      state.minQuantity = action.payload;

      console.log('state.minQuantity => ', state.minQuantity);
    },
    setMaxQuantity(state, action: PayloadAction<number | null>) {
      state.maxQuantity = action.payload;
      console.log('state.maxQuantity => ', state.maxQuantity);
    },

    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    resetQuery(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setCategories,
  setMinQuantity,
  setMaxQuantity,
  setSearch,
  resetQuery,
} = InventoryQuerySlice.actions;
export default InventoryQuerySlice.reducer;
