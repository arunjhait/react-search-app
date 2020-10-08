import { put } from 'redux-saga/effects';
import { getArticlesSuccess, getArticlesFail } from '../actions';
import { loading } from '../actions';

export function* fetchPostsSaga() {
  yield put(loading());
  try {
    const response = yield fetch('http://localhost:5000/articles');
    const data = yield response.json();
    yield put(loading());
    yield put(getArticlesSuccess(data));
  } catch (e) {
    yield put(loading());
    yield put(getArticlesFail());
  }
}