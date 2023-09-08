// import { useContext } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCategories } from "../../store/category/categories.selector";

import CategoryPreview from "../category-preview/category-preview.component";

const CategoriesPreview = () => {
  // const { categories } = useContext(CategoriesContext);
  const categories = useSelector(selectCategories)

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
