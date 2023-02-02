import React, { use } from "react";
import { GetServerSideProps } from "next/types";
import Product from "../../models/product";
import dbConnect from "../../utils/dbConnect";
import { CldImage } from "next-cloudinary";
import { ProductWithId } from "../../types/types";
import { addItem } from "../../features/cartSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = ({ product }: { product: ProductWithId }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center h-fit">
      <div className="flex justify-center">
        <CldImage
          width="400"
          height="500"
          src={`img-folder/${product.images[0].public_id}`}
          alt={product.name}
        />
      </div>
      <div className="px-4 py-2">
        <h3 className="text-2xl font-medium dark:text-white">{product.name}</h3>
        <p className="text-lg font-medium text-gray-700 dark:text-white">
          Price: {product.price}
        </p>
        <p className="text-gray-700 dark:text-white">{product.description}</p>
      </div>
      {product.stock ? (
        <>
          <span className="text-green-400">Item in stock</span>
          <button
            onClick={() => {
              dispatch(addItem(product));
              toast.success("Product Added to Cart")
            }}
            className="text-white w-fit
                bg-blue-500 hover:bg-blue-600 
                focus:ring-4 focus:outline-none 
                focus:ring-indigo-300 font-medium rounded-lg 
                text-sm px-5 py-2.5 text-center dark:bg-blue-400 
                dark:hover:bg-blue-500 dark:focus:ring-indigo-600 h-10"
          >
            Add to cart
          </button>
        </>
      ) : (
        <div className="text-red-400">Out of stock</div>
      )}
      <ToastContainer/>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  query: { productId },
}) => {
  await dbConnect();

  /* find all the data in our database */
  const result = await Product.findById(productId);
  const product = JSON.parse(JSON.stringify(result));

  return { props: { product } };
};
export default SingleProduct;
// Only runs on build time so not good to use here!

/*export async function getStaticPaths() {
  
  const res = await fetch();
  const products = await res.json();

  // Create a list of paths for all products
  const paths = products.map((product) => `/products/${product.id}`);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Fetch the data for the specific product
  const res = await fetch(`}`);
  const product = await res.json();

  return { props: { product } };
}*/
