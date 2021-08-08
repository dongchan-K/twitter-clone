import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userError: null,
  myInfo: null,
  signUpData: {},
  loginData: {},
};

const dummyUser = (payload) => ({
  ...payload,
  nickname: 'dongchan',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: 'suck' }, { nickname: 'jung' }],
  Followers: [{ nickname: 'suck' }],
});

// slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      return state;
    },
    loginSuccess: (state, { payload }) => {
      state.myInfo = dummyUser(payload);
      state.userError = null;
    },
    loginFailure: (state, { payload: error }) => {
      state.userError = error;
    },
    logoutRequest: (state, action) => {
      return state;
    },
    logoutSuccess: (state, action) => {
      state.myInfo = null;
      state.userError = null;
    },
    logoutFailure: (state, { payload: error }) => {
      state.userError = error;
    },
    signupRequest: (state, action) => {
      return state;
    },
    signupSuccess: (state, action) => {
      state.userError = null;
    },
    signupFailure: (state, { payload: error }) => {
      state.userError = error;
    },
    changeNicknameSuccess: (state, action) => {
      state.userError = null;
    },
    changeNicknameFailure: (state, { payload: error }) => {
      state.userError = error;
    },
    addPostToMe: (state, { payload }) => {
      state.myInfo.Posts.unshift({ id: payload });
    },
    removePostOfMe: (state, { payload }) => {
      state.myInfo.Posts = state.myInfo.Posts.filter(
        (Post) => Post.id !== payload,
      );
    },
  },
});

export const userActionCreator = userSlice.actions;

export default userSlice;
