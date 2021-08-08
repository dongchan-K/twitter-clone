import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import reducer from '../modules';

const devMode = process.env.NODE_ENV === 'development';

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  // 개발용에서는 logger middleware 추가
  if (devMode) middleware.push(logger);

  const store = configureStore({
    reducer,
    middleware,
    devTools: devMode, // 개발용에서만 devtools 사용
  });
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper(makeStore, {
  debug: devMode, // 개발용에서만 디버그 로깅 활성화
});

export default wrapper;
