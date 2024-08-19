import { useState } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import SearchInput from "../../UI/SearchInput";
import SmallUserProfileItem from "../../UI/SmallUserProfileItem";
import Database from "../../../class/database/database";
import { useAccount } from "../../../redux/auth/hooks";

const SearchDropdown = ({
  onClick,
  icon,
  title,
  isOpenSideBarDropdown,
  isSmall,
}) => {
  const user = useAccount();
  const [text, setText] = useState("");

  const [searchResult, setSearchResult] = useState([]);
  //! Arama işlemi
  const searchHandle = async () => {
    const result = await Database.searchUsers(user.uid, text);

    setSearchResult(result);
  };

  return (
    <Menu as="div" className="hidden md:block mt-auto">
      <MenuButton
        onClick={onClick}
        className="side-link cursor-pointer w-full "
      >
        {icon}
        <span
          className={` ${
            isSmall || isOpenSideBarDropdown ? "hidden" : "hidden xl:inline"
          } `}
        >
          {title}
        </span>
      </MenuButton>

      <MenuItems
        id="dropdown"
        className=" absolute w-[500px] animate-moving h-screen rounded-lg top-0 left-full   bg-white border border-slate-300  z-20    "
      >
        <div className=" px-6 pt-6 py-3 ">
          <h4 className="text-2xl font-semibold mb-10">Search</h4>
          <SearchInput
            onChange={(e) => setText(e.target.value)}
            handleSearch={searchHandle}
          />
        </div>
        <div className="border-t  border-slate-300 mt-4 py-4">
          <div className="flex flex-col gap-4 px-6">
            {searchResult.map((item) => (
              <SmallUserProfileItem key={item.uid} user={item} />
            ))}
          </div>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default SearchDropdown;
