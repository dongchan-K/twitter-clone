import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';
import loading from './loading';

// 리듀서 : (이전상태, 액션) => 다음상태를 만듬
const rootReducer = combineReducers({
  // ssr을 위한 index 리듀서 추가
  index: (state = {}, action) => {
    switch (action.type) {
      // next-redux-wrapper를 사용하기 위한 액션
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };

      default:
        return state;
    }
  },
  user,
  post,
  loading,
});

export default rootReducer;
