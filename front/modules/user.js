export const initialState = {
  isLoggedIn: false,
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

export const FOLLOW_REQUEST = 'user/FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'user/FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'user/FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'user/UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'user/UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'user/UNFOLLOW_FAILURE';

const dummyUser = (payload) => ({
  ...payload,
  nickname: 'dongchan',
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});

// action creator
export const loginRequestAction = ({ email, password }) => ({
  type: LOG_IN_REQUEST,
  myInfo: {
    email,
    password,
  },
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

export const signUpRequestAction = ({ email, password }) => ({
  type: SIGN_UP_REQUEST,
  signUpData: {
    email,
    password,
  },
});

// reducer
const user = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userError: null,
        myInfo: dummyUser(action.payload),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        userError: action.error,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        userError: null,
        myInfo: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        userError: action.error,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        userError: null,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        userError: action.error,
      };
    default:
      return state;
  }
};

export default user;
