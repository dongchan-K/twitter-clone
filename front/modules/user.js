export const initialState = {
  isLoggedIn: false,
  myInfo: null,
  signUpData: {},
  loginData: {},
};

const LOG_IN = 'user/LOG_IN';
const LOG_OUT = 'user/LOG_OUT';

// action creator
export const loginAction = (data) => {
  return {
    type: LOG_IN,
    data,
  };
};

export const logoutAction = () => {
  return {
    type: LOG_OUT,
  };
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        myInfo: action.data,
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        myInfo: null,
      };
    default:
      return state;
  }
};

export default user;
