import { useRouter } from "next/router";
import { SubCategoryWithID } from "../types/types";

const SubCategories = ({ subCategory }: { subCategory: SubCategoryWithID }) => {
  const router = useRouter();
  const handleSubCategorySelect = (id: string) => {
    router.push({
      pathname: "/",
      query: { category: id },
    });
  };

  return (
    <div className="subcategories">
      <div
        className="subcategory p-2 rounded-md cursor-pointer  hover:bg-gray-200"
        onClick={() => handleSubCategorySelect(subCategory.id)}
      >
        {subCategory.name}
      </div>
    </div>
  );
};

export default SubCategories;
