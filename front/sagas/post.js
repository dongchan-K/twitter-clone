import axios from 'axios';
import { fork, takeLatest, delay, all, put } from 'redux-saga/effects';

const addPostAPI = () => axios.post('/api/post');

function* addPost(action) {
  try {
    // const res = yield call(addPostAPI, action.payload);
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

export default function* postWatcherSaga() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}
