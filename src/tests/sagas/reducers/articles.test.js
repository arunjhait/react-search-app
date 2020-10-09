
import rootReducer, { articleReducers } from '../../../store/reducers/articles';
import articles from '../../../config/mocks/articles';

describe('GET_ARTICLES Reducer', () => {
  test("should handle initial state", () => {
    const action = {
      type: "GET_ARTICLES",
    };
    const state = rootReducer(articleReducers, action);
    expect(state.loading).toEqual(true);
  });

  test("should GET Articles", () => {
    const action = {
      type: "GET_ARTICLES_SUCCESS"
    };
    const state = rootReducer({ articles: articles, loading: false }, action);
    expect(state.articles).toEqual(articles);
  });

  test('should edit an article', () => {
    const title = 'None shall pass';
    const action = {
      type: 'UPDATE_ARTICLE',
      id: articles[1].id,
      update: {
        title
      }
    };
    const state = rootReducer({ items: articles, loading: false }, action);
    expect(state.articles[1].title).toBe(title);
  });

  test('GET_ARTICLES_FAIL an article', () => {
    const action = {
      type: 'GET_ARTICLES_FAIL'
    };
    const state = rootReducer(articleReducers, action);
    expect(state.error).toEqual(true);
  });
});