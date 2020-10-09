
import { getArticles, getArticlesSuccess, getArticlesFail, loading, updateArticle, setPaginationFilters } from "../../store/actions";

describe("Get Articles", () => {
  it("getArticles should dispatch GET_ARTICLES action", () => {
    expect(getArticles()).toEqual({
      type: 'GET_ARTICLES',
    });
  });

  it("getArticlesSuccess should dispatch GET_ARTICLES_SUCCESS action", () => {
    expect(getArticlesSuccess()).toEqual({
      type: 'GET_ARTICLES_SUCCESS',
    });
  });

  it("getArticlesFail should dispatch GET_ARTICLES_FAIL action", () => {
    expect(getArticlesFail()).toEqual({
      type: 'GET_ARTICLES_FAIL',
    });
  });

  it("loading should dispatch LOADING action", () => {
    expect(loading()).toEqual({
      type: 'LOADING',
    });
  });

  it("updateArticle should dispatch UPDATE_ARTICLE action", () => {
    expect(updateArticle()).toEqual({
      type: 'UPDATE_ARTICLE',
    });
  });

  it("setPaginationFilters should update dialog form values", () => {
    const pagination = {
      pageNumber: 1,
      itemsPerPage: 20,
      total: 200,
    };
    const action = setPaginationFilters(pagination);
    expect(action).toEqual({
      type: 'SET_PAGINATION_FILTERS',
      payload: pagination
    });
  });
});