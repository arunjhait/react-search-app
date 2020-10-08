import { GET_ARTICLES, GET_ARTICLES_SUCCESS, UPDATE_ARTICLE, GET_ARTICLES_FAIL } from "../actionTypes";

const initialState = {
  loading: true,
  articles: []
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
      const { id, newTitle, body } = action.payload;
      const elementsIndex = state.articles.findIndex(element => Number(element.id) === Number(id));
      let updated_articles = [...state.articles];
      updated_articles[elementsIndex] = { ...updated_articles[elementsIndex], title: newTitle, body: body };
      return {
        ...state,
        articles: updated_articles,
        loading: false
      };
    case GET_ARTICLES_FAIL:
      return { error: true };

    default:
      return state;
  }
};

export default articleReducers;