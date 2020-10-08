import { runSaga } from 'redux-saga';
import { fetchPostsSaga } from '../../store/sagas/posts';
import fetchPostsMockData from '../../config/mocks/fetchPostsMockData';
import { LOADING, GET_ARTICLES_SUCCESS, GET_ARTICLES_FAIL } from '../../store/actionTypes';

const runFetchPostsSaga = (dispatchedActions) => (
  runSaga({
    dispatch: (action) => dispatchedActions.push(action),
  }, fetchPostsSaga)
);

describe('fetchDataSaga', () => {
  it('Should call API and dispatch GET_ARTICLES_SUCCESS action with response data as payload', async () => {
    const dispatchedActions = [];
    await runFetchPostsSaga(dispatchedActions);
    await Promise.resolve();

    expect(dispatchedActions).toEqual(
      [
        { type: LOADING },
        { type: GET_ARTICLES_SUCCESS, payload: JSON.parse(fetchPostsMockData)},
      ],
    );
  });

  it('Dispatches GET_ARTICLES_FAIL action upon API failure', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject());
    const dispatchedActions = [];
    await runFetchPostsSaga(dispatchedActions);

    expect(dispatchedActions).toEqual(
      [
        { type: LOADING },
        { type: GET_ARTICLES_FAIL },
      ],
    );
  });
});