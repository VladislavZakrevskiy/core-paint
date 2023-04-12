import { configureStore, combineReducers } from '@reduxjs/toolkit';
import toolSlice from './toolSlice';
import canvasSlice from './canvasSlice';

const reducers = combineReducers({
    toolSlice,
    canvasSlice
})

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch