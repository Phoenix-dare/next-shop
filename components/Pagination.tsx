import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Pagination = () => {
  const router = useRouter();
  const { query } = useRouter();

  const search = query.search;



  const [currentPage , setCurrentPage]= useState(1);

  const limit = 10;
  const handlePreviousClick = () => {
    const setPage=currentPage-1 <= 1 ? 1 : currentPage-1
  
    setCurrentPage(setPage)

    if (search) {
      router.push({
        pathname: "/",
        query: { page:setPage, limit: limit, search: search },
      });
    }else{
    router.push({
      pathname: "/",
      query: { page:setPage, limit: limit },
    });
  }
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
    if (search) {
      router.push({
        pathname: "/",
        query: { page: currentPage+1, limit: limit, search: search },
      });
    }else{
    router.push({
      pathname: "/",
      query: { page: currentPage+1, limit: limit },
    });
  }
  };

  const handlePageClick = (page:number) => {
    setCurrentPage(page);

    
    if (search) {
      router.push({
        pathname: "/",
        query: { page, limit: limit, search: search },
      });
    }else{
    router.push({
      pathname: "/",
      query: { page, limit: limit },
    });
  };
}

  return (
    <div className="sticky -bottom-16 my-2 mx-0 text-center  border-4 dark:border dark:border-gray-900 bg-blue-500 dark:bg-gray-400">
      <nav aria-label="footer ">
        <ul className="inline-flex -space-x-px">
          <li>
            <Link
              href="#"
              onClick={handlePreviousClick}
              className="px-3 py-2 ml-0 leading-tight text-gray-700 bg-blue-100 border-2 border-blue-600 rounded-l-3xl hover:bg-indigo-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => handlePageClick(1)}
              className="px-3 py-2 leading-tight text-gray-700 bg-blue-100 border-y-2 border-blue-600 hover:bg-indigo-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => handlePageClick(2)}
              className="px-3 py-2 leading-tight text-gray-700 bg-blue-100 border border-y-2 border-blue-600 hover:bg-indigo-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => handlePageClick(3)}
              className="px-3 py-2 leading-tight text-gray-700 bg-blue-100  border border-y-2 border-blue-600 hover:bg-indigo-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              3
            </Link>
          </li>
          {/* Add additional page links as needed */}
          <li>
            <Link
              href="#"
              onClick={handleNextClick}
              className="px-3 py-2 ml-0 leading-tight text-gray-700 bg-blue-100  border-y-2 border-l border-r-2  border-blue-600 rounded-r-3xl hover:bg-indigo-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
