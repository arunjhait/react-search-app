import { combineReducers } from "redux";
import articles from "./articles";

const rootReducer = combineReducers({
  articles: articles
});

export default rootReducer;
