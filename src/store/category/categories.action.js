import { CATEGORIES_ACTIONS } from "./categories.types";

export const setCategories = (categories) => {
  return { type: CATEGORIES_ACTIONS.SET_CATEGORIES, payload: categories };
};
