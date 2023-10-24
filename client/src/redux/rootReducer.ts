import driversReducer from './drivers/driversSlice';
import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = {
  drivers: driversReducer,
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const persistedRootReducer = persistCombineReducers(
  persistConfig,
  reducers
);

export type RootState = ReturnType<typeof persistedRootReducer>;
