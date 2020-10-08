import { GET_ARTICLES, GET_ARTICLES_FAIL, LOADING, GET_ARTICLES_SUCCESS, UPDATE_ARTICLE, SET_PAGINATION_FILTERS } from "./actionTypes";

// GET_ARTICLES
export const getArticles = () => ({
  type: GET_ARTICLES
});

// GET_ARTICLES_SUCCESS
export const getArticlesSuccess = (payload) => {
  return { type: GET_ARTICLES_SUCCESS, payload };
};

// GET_ARTICLES_FAIL
export const getArticlesFail = () => ({
  type: GET_ARTICLES_FAIL
});

// LOADING
export const loading = () => ({
  type: LOADING
});

// UPDATE_ARTICLE
export const updateArticle = (post) => {
  return { type: UPDATE_ARTICLE, payload: post };
};

// SET_PAGINATION_FILTERS
export const setPaginationFilters = ({
  pageNumber = 1,
  itemsPerPage = 10,
  total = 0,
}) => ({
  type: SET_PAGINATION_FILTERS,
  payload: {
    pageNumber,
    itemsPerPage,
    total,
  },
});