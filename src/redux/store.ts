import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import LoginReducer from './slice/LoginActions';
import RegisterReducer from "./slice/RegisterActions";
import UserDataReducer from "./slice/UserDataFetch";

// Persist configuration
const persistConfig: PersistConfig<any> & { whitelist: string[] } = {
  key: 'root',
  storage: storage,
  whitelist: ['login', 'register'], // only persist these reducers
};

// Combine reducers
const rootReducer = combineReducers({
  login: LoginReducer,
  register: RegisterReducer,
  userData: UserDataReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for typed dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Create persistor
export const persistor = persistStore(store);

export default store;
