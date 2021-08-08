import axios from 'axios';
import { takeLatest, delay, put, throttle } from 'redux-saga/effects';
import shortId from 'shortid';
import { loadingActionCreator } from '../modules/loading';
import { userActionCreator } from '../modules/user';
import { postActionCreator, generateDummyPost } from '../modules/post';

// API
const loadPostAPI = () => axios.get('/api/post');
const addPostAPI = (data) => axios.post('/api/post', data);
const removePostAPI = (data) => axios.delete('/api/post', data);
const addCommentAPI = (data) =>
  axios.post(`/api/post/${data.post.id}/comment`, data);

const { startLoading, endLoading } = loadingActionCreator;
const { addPostToMe, removePostOfMe } = userActionCreator;
const {
  loadPostRequest,
  loadPostSuccess,
  loadPostFailure,
  addPostRequest,
  addPostSuccess,
  addPostFailure,
  removePostRequest,
  removePostSuccess,
  removePostFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
} = postActionCreator;

function* loadPostWatcherSaga(action) {
  yield put(startLoading(action.type));
  try {
    // const res = yield call(addPostAPI, action.payload);
    yield delay(1000);
    yield put(loadPostSuccess(generateDummyPost(10)));
  } catch (e) {
    yield put(loadPostFailure(e.response.data));
  }
  yield put(endLoading(action.type));
}

function* addPostWatcherSaga(action) {
  yield put(startLoading(action.type));
  try {
    // const res = yield call(addPostAPI, action.payload);
    yield delay(1000);
    const id = shortId.generate();

    yield put(addPostSuccess({ id, content: action.payload }));
    yield put(addPostToMe(id));
  } catch (e) {
    yield put(addPostFailure(e.response.data));
  }
  yield put(endLoading(action.type));
}

function* removePostWatcherSaga(action) {
  yield put(startLoading(action.type));
  try {
    // const res = yield call(addPostAPI, action.payload);
    yield delay(1000);
    yield put(removePostSuccess(action.payload));
    yield put(removePostOfMe(action.payload));
  } catch (e) {
    yield put(removePostFailure(e.response.data));
  }
  yield put(endLoading(action.type));
}

function* addCommentWatcherSaga(action) {
  yield put(startLoading(action.type));
  try {
    // const res = yield call(addPostAPI, action.payload);
    yield delay(1000);
    yield put(addCommentSuccess(action.payload));
  } catch (e) {
    yield put(addCommentFailure(e.response.data));
  }
  yield put(endLoading(action.type));
}

export default function* postWatcherSaga() {
  yield takeLatest(loadPostRequest.type, loadPostWatcherSaga);
  yield takeLatest(addPostRequest.type, addPostWatcherSaga);
  yield takeLatest(removePostRequest.type, removePostWatcherSaga);
  yield takeLatest(addCommentRequest.type, addCommentWatcherSaga);
}
