import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER } from 'redux-persist';
import userReducer from './slice/userSlice';
import { api } from './api';
//persist configuration for user
const userPersistConfig = {key:'user',storage,whiteList: ['user', 'isEmailVerified', 'isLoggedIn']}

// wrap reducers with 'persist config'
const persistedUserReducer = persistReducer(userPersistConfig,userReducer);

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer, // Add the RTK Query API reducer
		user: persistedUserReducer, // Use the persisted user reducer
	},
	middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
			}
		}).concat(api.middleware), // Add the RTK Query middleware
});

// Set up listeners for the store
setupListeners(store.dispatch);

// Create a persistor for the store
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;