import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  cartSlice,
  loaderSlice,
} from '../reducers';
const reducers = combineReducers({
  loader: loaderSlice,
  cart: cartSlice
});
const rootReducer = (state, action) => {
  if (action.type === 'user/doLogOutUser/fulfilled') {
    state = undefined;
  }
  return reducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
