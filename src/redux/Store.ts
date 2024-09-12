import storage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import ThemeSlice from './ThemeSlice';
import {setupListeners} from '@reduxjs/toolkit/query';
import InventoryQuerySlice from './InventoryQuerySlice';
import AuthSlice from './AuthSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['themeSlice', 'authSlice'],
};

const reducers = combineReducers({
  themeSlice: ThemeSlice,
  inventoryQuerySlice: InventoryQuerySlice,
  authSlice: AuthSlice,
});

const persistReducers = persistReducer(persistConfig, reducers);

export const Store = configureStore({
  reducer: persistReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(),
});

setupListeners(Store.dispatch);

export const persistor = persistStore(Store);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
