import { useRouter } from "next/router";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
      router.push({
        pathname: "/",
        query: { search,page:1,limit:10 },
      });
    
  };

  return (
    <div className="relative w-min sm:w-max m-auto">
      <form onSubmit={handleSubmit}>
        <input
          className="bg-gray-100  h-8 px-4 sm:px-4 rounded-3xl dark:text-black text-black w-64 sm:w-96  border-2 border-gray-300"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="absolute  border-2 -ml-10 h-8 rounded-r-3xl border-gray-300 px-2">
          <BiSearchAlt size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
