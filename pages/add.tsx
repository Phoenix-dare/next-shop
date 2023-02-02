import axios from "axios";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import { useReducer, useState } from "react";
import Category from "../models/category";
import SubCategory from "../models/subCategory";
import dbConnect from "../utils/dbConnect";
import ImageUpload from "../components/ImageUpload";
import { z } from "zod";
import { CategoryWithID, SubCategoryWithID } from "../types/types";

const ProductInput = z.object({
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  description: z.string(),
  category: z.string(),
  subCategory: z.string(),
  images: z.object({ public_id: z.string() }),
  user:z.string()
});
type ProductObject = z.infer<typeof ProductInput>
type ProductObjectWithOutUser = Omit<ProductObject,"user">

interface ActionType {
  type: string;
  value: ProductObjectWithOutUser[keyof ProductObjectWithOutUser];
  name:keyof ProductObjectWithOutUser;
}
const initialState: ProductObject = {
  name: "",
  price: 0,
  stock: 0,
  description: "",
  category: "",
  subCategory: "",
  images: { public_id: "" },
  user:""
};

const formReducer = (state: ProductObject, action: ActionType) => {
  switch (action.type) {
    case "change":
      return { ...state, [action.name]: action.value };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const Add = ({
  allCategories,
  allSubCategories,
}: {
  allCategories: CategoryWithID[];
  allSubCategories: SubCategoryWithID[];
}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [subCategories, setSubCategories] = useState<SubCategoryWithID[] | []>(
    []
  );
  const [publicId, setPublicId] = useState("");

  const { data: session, status } = useSession();



  const handleChange = (
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    dispatch({
      type: "change",
      name: e.currentTarget.name as keyof ProductObjectWithOutUser,
      value: e.currentTarget.value,
    });
  };

  const handleCategoryChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const filterSubCategories = allSubCategories.filter(
      (item) => item.category === e.currentTarget.value
    );

    setSubCategories(filterSubCategories);
    return handleChange(e);
  };

  const handleProductSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (state.category === "" || state.subCategory === "") {
      console.log("Please select category and subcategory");
      return;
    }
    if (!publicId) {
      alert("please fill in an image name")
    }
    if (session?.user) {
      state.user = session.user.id 
    }
    if (publicId) {
      state.images = { public_id: publicId };
    }

    try {
      await axios.post("/api/products/", state);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleProductSubmission}>
        <div className="flex flex-col">
          <ImageUpload setPublicId={setPublicId} publicId={publicId} />
          <label className="text-gray-700 font-medium" htmlFor="name">
            Name
            <input
              className="border rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              type="text"
              name="name"
              placeholder="name"
              onChange={handleChange}
              value={state.name}
            />
          </label>
          <label className="text-gray-700 font-medium mt-4" htmlFor="price">
            Price
            <input
              className="border rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              type="number"
              name="price"
              placeholder="add stock"
              onChange={handleChange}
              value={state.price}
            />
          </label>
          <label className="text-gray-700 font-medium mt-4" htmlFor="stock">
            Stock
            <input
              className="border rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              type="number"
              name="stock"
              placeholder="add stock"
              onChange={handleChange}
              value={state.stock}
            />
          </label>
          <label
            className="text-gray-700 font-medium mt-4"
            htmlFor="description"
          >
            Description
            <textarea
              className="border rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              name="description"
              placeholder="description"
              onChange={handleChange}
              value={state.description}
            />
          </label>
          <label className="text-gray-700 font-medium mt-4" htmlFor="category">
            Category
            <select
              required
              className="border rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              name="category"
              value={state.category}
              onChange={handleCategoryChange}
            >
              <option value="" disabled className="text-gray-500">
                Select a category
              </option>
              {allCategories.map((category) => (
                <>
                  <option value={category.id}>{category.name}</option>
                </>
              ))}
            </select>
          </label>
          <label
            className="text-gray-700 font-medium mt-4"
            htmlFor="subCategory"
          >
            SubCategory
            <select
              required
              className="border rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              name="subCategory"
              value={state.subCategory}
              onChange={handleChange}
            >
              <option value="" disabled className="text-gray-500">
                Select sub-categories
              </option>

              {subCategories?.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
              ))}
            </select>
          </label>
          <label
            className="text-gray-700 font-medium mt-4"
            htmlFor="description"
          >
            Description
            <textarea
              className="border rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              name="description"
              placeholder="description"
              onChange={handleChange}
              value={state.description}
            />
          </label>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

  const categories = await Category.find();
  const allCategories = categories.map((item) => item.toJSON());
  const subCategories = await SubCategory.find();
  const allSubCategories = subCategories.map((item) => item.toJSON());

  return {
    props: {
      allCategories,
      allSubCategories,
    },
  };
};
