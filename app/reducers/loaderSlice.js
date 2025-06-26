import {createSlice} from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading: false,
    resetDrawer: false,
  },
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = payload;
    },
  },
});

export const {setLoading} = loaderSlice.actions;

export default loaderSlice.reducer;
