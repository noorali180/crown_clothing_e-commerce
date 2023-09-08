import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./category/categories.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  category: categoriesReducer,
});
