import CategoriesPreview from "../../components/categories-preview/categories-preview";
import Category from "../category/category.component";
import "./shop.styles.scss";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firbase/firbase.util";

import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { store } from "../../store/store";
import { setCategories } from "../../store/category/categories.action";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=":category" element={<Category />} />
      </Routes>
    </Provider>
  );
};

export default Shop;
