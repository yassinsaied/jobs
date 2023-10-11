import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import storageSession from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';

import authReducer from './reducers/authSlice';
import profileSlice from './reducers/profileSlice';

const reducers = combineReducers({
  auth: authReducer,
  profile: profileSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
