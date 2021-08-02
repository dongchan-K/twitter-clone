import axios from 'axios';
import { fork, takeLatest, delay, all, put } from 'redux-saga/effects';
import { startLoadingAction, endLoadingAction } from '../modules/loading';

const loginAPI = () => axios.post('/api/login');

const logoutAPI = () => axios.post('/api/logout');

function* login(action) {
  yield put(startLoadingAction(action.type));
  try {
    // const res = yield call(loginAPI);
    yield delay(1000);
    yield put({
      type: 'user/LOG_IN_SUCCESS',
      data: action.data,
      // data: res.data,
    });
  } catch (e) {
    yield put({
      type: 'user/LOG_IN_FAILURE',
      // data: e.response.data,
    });
  }
  yield put(endLoadingAction(action.type));
}

function* logout(action) {
  yield put(startLoadingAction(action.type));
  try {
    // const res = yield call(logoutAPI);
    yield delay(1000);
    yield put({
      type: 'user/LOG_OUT_SUCCESS',
      // data: res.data,
    });
  } catch (e) {
    yield put({
      type: 'user/LOG_OUT_FAILURE',
      // data: e.response.data,
    });
  }
  yield put(endLoadingAction(action.type));
}

export default function* userWatcherSaga() {
  yield takeLatest('user/LOG_IN_REQUEST', login);
  yield takeLatest('user/LOG_OUT_REQUEST', logout);
}
