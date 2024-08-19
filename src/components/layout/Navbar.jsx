import { FaAngleDown, FaHeart } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../UI/SearchInput";
import { IoMdArrowRoundBack } from "react-icons/io";
import MessageIcon from "../../../public/icon/startmessage.svg?react";
import { useState } from "react";
import { useAccount } from "../../redux/auth/hooks";

const Navbar = ({type,isInboxPage}) => {
  const { pathname } = useLocation();
  const user = useAccount();
  const [text, setText] = useState("");
  const navigate = useNavigate();

  //! Mobilde arama kutusunda enter tuşuna basılırsa arama sonuçları sayfasına gider.
  const handleWithKeySearch = (e) => {
    if (e.key === "Enter") navigate(`/search/${text}`);
  };
  return (
    <>
      {type === "HOME_PAGE_NAV" ? (
        <nav className="z-10 py-4 bg-white border-b border-slate-300  block  md:hidden fixed top-0 left-0 right-0  ">
          <div className="flex-between mx-1 xxs:mx-6">
            <div className="flex gap-2 items-center">
              <span className="font-bold text-lg xxs:text-2xl">For you</span>
              <FaAngleDown className="mt-auto mb-1 " />
            </div>
            <div className="flex items-center gap-2 xxs:gap-4 w-[200px] xs:w-[300px]">
              <SearchInput
                onKeyDown={handleWithKeySearch}
                onChange={(e) => setText(e.target.value)}
                value={text}
                handleSearch={() => navigate(`/search/${text}`)}
              />
              <NavLink to="/notifications">
                <FaHeart className="text-lg xxs:text-2xl" />
              </NavLink>
            </div>
          </div>
        </nav>
      ) : (
        <nav className=" fixed z-10 bg-white  position-top h-[60px] md:h-[80px] px-4 border-b flex-between md:hidden   border-slate-300">
          <Link to="/">
            <IoMdArrowRoundBack className="   text-2xl my-auto" />
          </Link>
          <div
            className={`font-bold text-2xl  ${
              !isInboxPage && "mx-auto"
            }`}
          >
            {pathname === "/notifications" ? "Notifications" : user.userName}
          </div>

          {isInboxPage && (
            <div className="flex text-xl md:text-3xl gap-6">
              <MessageIcon />
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
