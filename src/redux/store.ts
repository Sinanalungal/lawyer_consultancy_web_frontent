import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import LoginReducer from './slice/LoginActions';
import RegisterReducer from "./slice/RegisterActions";

const persistConfig: PersistConfig<any> & { whitelist: string[] } = {
  key: 'root',
  storage: storage,
  whitelist: ['login', 'register'], 
};

const rootReducer = combineReducers({
  login: LoginReducer,
  register: RegisterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);

export default store;
