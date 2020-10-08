import { GET_ARTICLES, GET_ARTICLES_SUCCESS, UPDATE_ARTICLE, GET_ARTICLES_FAIL, SET_PAGINATION_FILTERS } from "../actionTypes";

const initialState = {
  loading: true,
  articles: [],
  pagination: {
    pageNumber: 1,
    itemsPerPage: 10,
    total: 0,
  }
};

const articleReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_ARTICLES_SUCCESS: {
      return {
        ...state,
        articles: action.payload.data,
        loading: false
      };
    }
    case UPDATE_ARTICLE:
      const { id, newTitle, newBody } = action.payload;
      const elementsIndex = state.articles.findIndex(element => Number(element.id) === Number(id));
      let updated_articles = [...state.articles];
      updated_articles[elementsIndex] = { ...updated_articles[elementsIndex], title: newTitle, body: newBody };
      return {
        ...state,
        articles: updated_articles,
        loading: false
      };
    case GET_ARTICLES_FAIL:
      return { error: true };
    case SET_PAGINATION_FILTERS:
      return {
        ...state,
        pagination: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default articleReducers;