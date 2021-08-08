import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, { payload }) => {
      state[payload] = true;
    },
    endLoading: (state, { payload }) => {
      state[payload] = false;
    },
  },
});

export const loadingActionCreator = loadingSlice.actions;

export default loadingSlice;
