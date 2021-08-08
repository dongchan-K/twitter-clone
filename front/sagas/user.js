import axios from 'axios';
import { fork, takeLatest, delay, all, put } from 'redux-saga/effects';
import { loadingActionCreator } from '../modules/loading';
import { userActionCreator } from '../modules/user';

// API
const loginAPI = () => axios.post('/api/login');
const logoutAPI = () => axios.post('/api/logout');
const signUpAPI = () => axios.post('/api/signUp');

const { startLoading, endLoading } = loadingActionCreator;

const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  changeNicknameSuccess,
  changeNicknameFailure,
  addPostToMe,
  removePostOfMe,
} = userActionCreator;

function* loginWatcherSaga(action) {
  yield put(startLoading(action.type));
  try {
    // const res = yield call(loginAPI);
    yield delay(1000);
    yield put(loginSuccess(action.payload));
  } catch (e) {
    yield put(loginFailure(e.response.data));
  }
  yield put(endLoading(action.type));
}

function* logoutWatcherSaga(action) {
  yield put(startLoading(action.type));
  try {
    // const res = yield call(logoutAPI);
    yield delay(1000);
    yield put(logoutSuccess());
  } catch (e) {
    yield put(logoutFailure(e.response.data));
  }
  yield put(endLoading(action.type));
}

function* signUpWatcherSaga(action) {
  yield put(startLoading(action.type));
  try {
    yield delay(1000);
    yield put(signupSuccess(action.payload));
  } catch (e) {
    yield put(signupFailure(e.response.data));
  }
  yield put(endLoading(action.type));
}

export default function* userWatcherSaga() {
  yield takeLatest(loginRequest.type, loginWatcherSaga);
  yield takeLatest(logoutRequest.type, logoutWatcherSaga);
  yield takeLatest(signupRequest.type, signUpWatcherSaga);
}
