import axios from 'axios';
import { takeLatest, delay, all, put } from 'redux-saga/effects';
import { endLoadingAction, startLoadingAction } from '../modules/loading';
import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../modules/post';

const addPostAPI = (data) => axios.post('/api/post', data);

const addCommentAPI = (data) =>
  axios.post(`/api/post/${data.post.id}/comment`, data);

function* addPost(action) {
  yield put(startLoadingAction(action.type));
  try {
    // const res = yield call(addPostAPI, action.payload);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e.response.data,
    });
  }
  yield put(endLoadingAction(action.type));
}

function* addComment(action) {
  yield put(startLoadingAction(action.type));
  try {
    // const res = yield call(addPostAPI, action.payload);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e.response.data,
    });
  }
  yield put(endLoadingAction(action.type));
}

export default function* postWatcherSaga() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
