import { all, fork } from 'redux-saga/effects';

import userWatcherSaga from './user';
import postWatcherSaga from './post';

export default function* rootSaga() {
  yield all([fork(userWatcherSaga), fork(postWatcherSaga)]);
}
