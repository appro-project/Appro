import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootReducer } from './reducers'

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: rootReducer.reducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: customizedMiddleware,
});

export type AppDispatch = typeof store.dispatch;
