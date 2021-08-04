import produce from 'immer';

export const initialState = {
  userError: null,
  myInfo: null,
  signUpData: {},
  loginData: {},
};

export const LOG_IN_REQUEST = 'user/LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'user/LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'user/LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'user/LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'user/LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'user/LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'user/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'user/SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'user/CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'user/CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'user/CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'user/FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'user/FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'user/FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'user/UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'user/UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'user/UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'user/ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'user/REMOVE_POST_OF_ME';

const dummyUser = (payload) => ({
  ...payload,
  nickname: 'dongchan',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: 'suck' }, { nickname: 'jung' }],
  Followers: [{ nickname: 'suck' }],
});

// action creator
export const loginRequestAction = (payload) => ({
  type: LOG_IN_REQUEST,
  payload,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

export const signUpRequestAction = (payload) => ({
  type: SIGN_UP_REQUEST,
  payload,
});

export const changeNicknameRequestAction = () => ({
  type: CHANGE_NICKNAME_REQUEST,
});

export const followRequestAction = () => ({
  type: FOLLOW_REQUEST,
});

export const unfollowRequestAction = () => ({
  type: UNFOLLOW_REQUEST,
});

// reducer
const user = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_SUCCESS:
        draft.myInfo = dummyUser(action.payload);
        draft.userError = null;
        break;
      case LOG_IN_FAILURE:
        draft.userError = action.error;
        break;
      case LOG_OUT_SUCCESS:
        draft.myInfo = null;
        draft.userError = null;
        break;
      case LOG_OUT_FAILURE:
        draft.userError = action.error;
        break;
      case SIGN_UP_SUCCESS:
        draft.userError = null;
        break;
      case SIGN_UP_FAILURE:
        draft.userError = action.error;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.userError = null;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.userError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft.myInfo.unshift({ id: action.payload });
        break;
      // return {
      //   ...state,
      //   myInfo: {
      //     ...state.myInfo,
      //     Posts: [{ id: action.payload }, ...state.myInfo.Posts],
      //   },
      // };
      case REMOVE_POST_OF_ME:
        draft.myInfo.Posts = draft.myInfo.Posts.filter(
          (Post) => Post.id !== action.payload,
        );
        break;
      // return {
      //   ...state,
      //   myInfo: {
      //     ...state.myInfo,
      //     Posts: state.myInfo.Posts.filter(
      //       (Post) => Post.id !== action.payload,
      //     ),
      //   },
      // };
      default:
        break;
    }
  });
};

export default user;
