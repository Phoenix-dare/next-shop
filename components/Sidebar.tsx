import { useState } from "react";
import Categories from "./Categories";
import { AiOutlineMenuUnfold, AiOutlineCloseCircle } from "react-icons/ai";
import router from "next/router";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleFilterChange = (event:React.BaseSyntheticEvent) => {
    setFilterBy(event.target.value);
    router.push({
      pathname: "/",
      query: { filter:event.target.value},
    })
    
  };

  const handleSortChange = (event:React.BaseSyntheticEvent) => {
    setSortBy(event.target.value);
    router.push({
      pathname: "/",
      query: { sort:event.target.value},
    })
  };

  return (
    <div className="position-static h-20 w-auto bg-gray-100 flex flex-row justify-between">
      <button
        className="menu-button bg-gray-100 text-black p-2"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {!showSidebar && <AiOutlineMenuUnfold size={25} />}
      </button>
      <aside
        className={`sidebar absolute top-25 left-0 z-40 h-screen max-w-sm overflow-y-auto transform transition duration-500 ease-in-out ${
          !showSidebar ? "-translate-x-full" : "translate-x-0"
        } bg-white`}
      >
        <button
          className="menu-button bg-gray-100 text-black p-2"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar && <AiOutlineCloseCircle size={25} />}
        </button>
        <div className="categories p-4">
          Browse by Categories
          <Categories
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        </div>
      </aside>

      <div className="filters-sort flex flex-row flex-wrap items-center p-4 align-self-end h-min">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Filter by:
          </label>
          <select
            className="form-select w-full"
            value={filterBy}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="featured">Featured</option>
            <option value="recent">Recent</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Sort by:
          </label>
          <select
            className="form-select w-full"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="">Price</option>
            <option value="low">Low to high</option>
            <option value="high">High to low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
