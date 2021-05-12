import { combineReducers } from "redux";
import auth from "./authReducer";
import posts from "./postsReducer";

export default combineReducers({
  posts,
  auth,
});
