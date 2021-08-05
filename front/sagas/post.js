import axios from 'axios';
import { takeLatest, delay, put, throttle } from 'redux-saga/effects';
import shortId from 'shortid';
import { endLoadingAction, startLoadingAction } from '../modules/loading';
import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LOAD_POST_FAILURE,
  LOAD_POST_SUCCESS,
  LOAD_POST_REQUEST,
  generateDummyPost,
} from '../modules/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../modules/user';

const loadPostAPI = () => axios.get('/api/post');
const addPostAPI = (data) => axios.post('/api/post', data);
const removePostAPI = (data) => axios.delete('/api/post', data);

const addCommentAPI = (data) =>
  axios.post(`/api/post/${data.post.id}/comment`, data);

function* loadPost(action) {
  yield put(startLoadingAction(action.type));
  try {
    // const res = yield call(addPostAPI, action.payload);
    yield delay(1000);
    yield put({
      type: LOAD_POST_SUCCESS,
      payload: generateDummyPost(10),
    });
  } catch (e) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: e.response.data,
    });
  }
  yield put(endLoadingAction(action.type));
}

function* addPost(action) {
  yield put(startLoadingAction(action.type));
  try {
    // const res = yield call(addPostAPI, action.payload);
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      payload: {
        id,
        content: action.payload,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      payload: id,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e.response.data,
    });
  }
  yield put(endLoadingAction(action.type));
}

function* removePost(action) {
  yield put(startLoadingAction(action.type));
  try {
    // const res = yield call(addPostAPI, action.payload);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      payload: action.payload,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      payload: action.payload,
    });
  } catch (e) {
    yield put({
      type: REMOVE_POST_FAILURE,
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
      payload: action.payload,
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
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
  yield takeLatest(ADD_POST_REQUEST, addPost);
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
