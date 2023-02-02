import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";
import { CldImage } from "next-cloudinary";
import { useSelector } from "react-redux";
import { ProductWithId } from "../types/types";
import { updateRating } from "../features/productSlice";
import { AppDispatch, AppState } from "../app/store";

const ProductCard = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: AppState) => state);

  const handleClick = (
    item: ProductWithId,
    rating: ProductWithId["ratings"]
  ) => {
    const updated = { ...item, ratings: rating };
    dispatch(updateRating(updated));
  };

  if (products.length === 0) {
    return (
      <div className="container flex flex-col items-center h-96 w-screen text-xl text-center">
        <span>Sorry, no products were found</span>
        <button
          className="bg-blue-500 border round-2xl px-4 py-2"
          onClick={() => router.push("/")}
        >
          Back to all products
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-evenly flex-wrap h-full w-screen gap-2  content-center my-2 py-2 bg-white dark:bg-gray-700">
      {products.map((item) => (
        <div key={item.id}
          className="relative my-2 h-min px-2 sm:px-8 py-4 sm:py-8 border-blue-200 border-2 shadow-lg rounded-xl shadow-indigo-500/75 hover:shadow-2xl  hover:shadow-indigo-800/75
        transition ease-in-out delay-150 bg-gray-100 hover:-translate-y-1 hover:scale-105 hover:bg-cyan-100 duration-300"
        >
          <Link href={`product/${item.id}`}>
            <CldImage
              width="150"
              height="150"
              crop="thumb"
              src={`img-folder/${item.images[0].public_id}`}
              alt={item.name}
            />

            <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray">
              {item.name}
            </h5>
            <span className="text-lg font-medium text-gray-900 dark:text-gray">
              {item.price}
            </span>
          </Link>

          <div className="flex flex-row justify-items-center">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-400 cursor-pointer"
              fill={`${item.ratings >= 1 ? "yellow" : "gray"}`}
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                handleClick(item, 1);
              }}
            >
              <title>First star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-400 cursor-pointer"
              fill={`${item.ratings >= 2 ? "yellow" : "gray"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                handleClick(item, 2);
              }}
            >
              <title>Second star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>

            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-400  cursor-pointer"
              fill={`${item.ratings >= 3 ? "yellow" : "gray"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                handleClick(item, 3);
              }}
            >
              <title>Third star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>

            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-400  cursor-pointer"
              fill={`${item.ratings >= 4 ? "yellow" : "gray"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                handleClick(item, 4);
              }}
            >
              <title>Fourth star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-400  cursor-pointer"
              fill={`${item.ratings >= 5 ? "yellow" : "gray"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                handleClick(item, 5);
              }}
            >
              <title>Fifth star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>

          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            4.95 out of 5
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
