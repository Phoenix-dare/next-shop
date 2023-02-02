import { useState, useEffect } from "react";
import SubCategories from "./SubCategories";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CategoryWithID,ICategory, SubCategoryWithID } from "../types/types";
import { AppState } from "../app/store";


const Categories = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: Function;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const getCat :  CategoryWithID[] = useSelector((state: AppState) => state.categories);
  const getSub : SubCategoryWithID[]= useSelector((state: AppState) => state.subCategories);

  const [selectedCategory, setSelectedCategory] = useState<CategoryWithID | null>(
    null
  );

  const handleCategorySelect = (category: CategoryWithID) => {
    setSelectedCategory(category);
  };

  /* useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);*/
  /*const handleClickOutside = (event:React.SyntheticEvent) => {
    if (!event.target.closest(".sidebar") && showSidebar) {
      setShowSidebar(false);
    }
  };*/
  return (
    <div className="flex flex-row justify-between">
      <div className="categories">
        {getCat.map((category ) => (
          <div key={category.id}
            className={`category p-2 rounded-md cursor-pointer hover:bg-gray-200 relative`}
            onMouseEnter={() => handleCategorySelect(category)}
            onTouchStart={() => handleCategorySelect(category)}
            onTouchEnd={() => {
              router.push({
                pathname: "/",
                query: { category: category.id },
              });
              //setShowSidebar(false);
            }}
            onClick={() => {
              router.push({
                pathname: "/",
                query: { category: category.id },
              });
              //setShowSidebar(false);
            }}
          >
            {category.name}
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="subcategories ml-2">
      Sub-Categories

          {getSub
            .filter((subcat:SubCategoryWithID) => subcat.category === selectedCategory.id)
            .map((subCategory:SubCategoryWithID) => (
              <SubCategories key={subCategory.id} subCategory={subCategory} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
