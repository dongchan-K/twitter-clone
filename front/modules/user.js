export const initialState = {
  isLoggedIn: false,
  myInfo: null,
  signUpData: {},
  loginData: {},
};

const LOG_IN_REQUEST = 'user/LOG_IN_REQUEST';
const LOG_IN_SUCCESS = 'user/LOG_IN_SUCCESS';
const LOG_IN_FAILURE = 'user/LOG_IN_FAILURE';

const LOG_OUT_REQUEST = 'user/LOG_OUT_REQUEST';
const LOG_OUT_SUCCESS = 'user/LOG_OUT_SUCCESS';
const LOG_OUT_FAILURE = 'user/LOG_OUT_FAILURE';

// action creator
export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        myInfo: { ...action.data, nickname: 'dongchan' },
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        myInfo: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default user;
