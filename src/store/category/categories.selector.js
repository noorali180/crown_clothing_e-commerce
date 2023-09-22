// export const selectCategoriesMap = (state) =>
//   state.category.categories.reduce((acc, category) => {
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;

//     return acc;
//   }, {});

// NOTE: every time selectCategoriesMap function runs, which is a selector function, it will return a new object every single time according to the logic it is build, ------------------ so we have to find a way that it only return a object when the previouse state is changed because useSelector re-renders the component whenever the state is changed in root reducer../

// NOTE: The solution is (Reselect library), it will help us to memoize the previouse state, and will only reutrn an object when state is changed...

// reselct is a library or tool provided in the redux....

/////////////////////////////////////////////////////////////////////////////////////////

import { createSelector } from "reselect";

// NOTE: reselect give us the idea of providing a memoized selector, which means if input of the functions are same then output will not be the different...
// basically concept of a pure function.

// we have to create input selectors and output selectors.

// INPUT SELECTOR: => give us the parameters
// OUTPUT SELECTOR: => give us the result

// categories slice of the reducer.
const selectCategories = (state) => state.category.categories;

/*
 memoized selector => createSelector(
    "param1: [array of input selectors]",
    "param2: {callback func which gives the result basically output selector}"
)
*/

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;

      return acc;
    }, {})
);
