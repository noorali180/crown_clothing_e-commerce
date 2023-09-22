// import { useContext } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCategoriesMap } from "../../store/category/categories.selector";

import CategoryPreview from "../category-preview/category-preview.component";

const CategoriesPreview = () => {
  // const { categories } = useContext(CategoriesContext);

  //NOTE: useSelector runs every time whenever state changes, which is stored in (redux store);
  const categories = useSelector(selectCategoriesMap);

  return (
    <div>
      {Object.keys(categories).map((title) => (
        <CategoryPreview
          key={title}
          title={title}
          products={categories[title]}
        />
      ))}
    </div>
  );
};

export default CategoriesPreview;
