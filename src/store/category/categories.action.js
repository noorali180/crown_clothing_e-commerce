import { CATEGORIES_ACTIONS } from "./categories.types"

export const setCategories = (categoriesMap) => {
    return {type: CATEGORIES_ACTIONS.SET_CATEGORIES, payload: categoriesMap};
}
