import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from "../shop-data";

import {
  getCategoriesAndDocuments,
} from "../utils/firbase/firbase.util";

export const CategoriesContext = createContext({
  categories: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({});
  const value = { categories };

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategories(categoriesMap);
    };
    getCategoriesMap();
  }, []);

  // NOTE: we have to run this at once, to add collections and documents to the database...
  // useEffect(() => {
  //   createCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
