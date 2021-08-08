import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';
import loadingSlice from './loading';
import postSlice from './post';
import userSlice from './user';

// ssr을 위한 index 리듀서 추가
const indexSlice = createSlice({
  name: 'index',
  initialState: {},
  // next-redux-wrapper를 사용하기 위한 액션
  reducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', action);
      return action.payload;
    },
  },
});

// 리듀서 결합
const reducer = {
  index: indexSlice.reducer,
  loading: loadingSlice.reducer,
  user: userSlice.reducer,
  post: postSlice.reducer,
};

export default reducer;
