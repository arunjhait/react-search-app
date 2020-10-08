import { all, takeLatest } from 'redux-saga/effects';
import { fetchPostsSaga } from './posts';

import { GET_ARTICLES } from '../actionTypes';

export default function* rootSaga() {
  yield all([watchPosts()]);
}

function* watchPosts() {
  yield takeLatest(GET_ARTICLES, fetchPostsSaga);
}