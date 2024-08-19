import { FaSearch } from "react-icons/fa";

const SearchInput = ({ handleSearch, ...props }) => {
  return (
    <div className="w-full rounded-lg bg-zinc-200 py-1 xxs:py-2 px-2 xxs:px-4 flex items-center gap-3 ">
      <input
        {...props}
        type="text"
        placeholder="Search"
        className=" bg-transparent w-full outline-none "
      />
      <FaSearch className="cursor-pointer" onClick={handleSearch} />
    </div>
  );
};

export default SearchInput;
