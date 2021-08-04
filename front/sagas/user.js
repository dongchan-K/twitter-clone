import axios from 'axios';
import { fork, takeLatest, delay, all, put } from 'redux-saga/effects';
import { startLoadingAction, endLoadingAction } from '../modules/loading';
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  SIGN_UP_REQUEST,
} from '../modules/user';

const loginAPI = () => axios.post('/api/login');

const logoutAPI = () => axios.post('/api/logout');

const signUpAPI = () => axios.post('/api/signUp');

function* login(action) {
  yield put(startLoadingAction(action.type));
  try {
    // const res = yield call(loginAPI);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      payload: action.payload,
    });
  } catch (e) {
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response.data,
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
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: e.response.data,
    });
  }
  yield put(endLoadingAction(action.type));
}

function* signUp(action) {
  yield put(startLoadingAction(action.type));
  try {
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      payload: action.payload,
    });
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response.data,
    });
  }
  yield put(endLoadingAction(action.type));
}

export default function* userWatcherSaga() {
  yield takeLatest(LOG_IN_REQUEST, login);
  yield takeLatest(LOG_OUT_REQUEST, logout);
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
