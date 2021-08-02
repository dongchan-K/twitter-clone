import { all, fork, call, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

function loginAPI(data) {
  return axios.post('/api/login');
}

function logoutAPI() {
  return axios.post('/api/logout');
}

function addPostAPI() {
  return axios.post('/api/post');
}

function* login(action) {
  try {
    // const res = yield call(loginAPI);
    yield delay(1000);
    yield put({
      type: 'LOG_IN_SUCCESS',
      // data: res.data,
    });
  } catch (e) {
    yield put({
      type: 'LOG_IN_FAILURE',
      // data: e.response.data,
    });
  }
}

function* logout() {
  try {
    // const res = yield call(logoutAPI);
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      // data: res.data,
    });
  } catch (e) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      // data: e.response.data,
    });
  }
}

function* addPost(action) {
  try {
    // const res = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: 'ADD_POST_SUCCESS',
      // data: res.data,
    });
  } catch (e) {
    yield put({
      type: 'ADD_POST_FAILURE',
      // data: e.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest('LOG_IN_REQUEST', login);
}

function* watchLogout() {
  yield takeLatest('LOG_OUT_REQUEST', logout);
}

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchAddPost)]);
}
