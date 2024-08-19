import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../../../constants/asideContent";
import CreateIcon from "../../../../public/icon/create.svg?react";
import { FaInstagram } from "react-icons/fa";
import { useState } from "react";
import MoreOptionsDropdown from "./MoreOptionsDropdown";
import CreatePost from "./CreatePost";
import { useAccount } from "../../../redux/auth/hooks";
import { openModal } from "../../../redux/modal/actions";

const Aside = ({ isSmall, isBottomNavBar }) => {
  const user = useAccount();
  const [isOpenSideBarDropdown, setIsOpenSideBarDropdown] = useState(false);

  //! Dropdown butonu üzerine tıklandığında eğer dropdown açıksa kapatır
  //! değilse açar . Açıkken sol sidebar genişliği azalır.
  const handleDropdownButtonClick = () => {
    window.addEventListener("click", handleOutsideClickDropdown);
    setIsOpenSideBarDropdown(!isOpenSideBarDropdown);
  };
  //! Dropdown dışına tıklandığında sol sidebar eski uzunluğuna geri dönüyor.
  const handleOutsideClickDropdown = () => {
    const dropdownContent = document.getElementById("dropdown");
    if (!isOpenSideBarDropdown && !dropdownContent) {
      setIsOpenSideBarDropdown(false);
      window.removeEventListener("click", handleOutsideClickDropdown);
    }
  };

  return (
    <>
    <CreatePost/>
    <aside
      className={`
      md:w-[80px] ${
        isSmall || isOpenSideBarDropdown
          ? "xl:w-[80px] items-center"
          : "xl:w-[250px]"
      }
    bg-white ${isBottomNavBar ? "flex" : "hidden md:flex"}   flex-col 
      fixed md:relative position-bottom border-t z-40
      md:border-e transition-all duration-500  border-slate-300 sm:px-2  md:py-6 md:pt-12 md:min-h-screen
    `}
    >
      <img
        className={`h-[30px] w-max mb-8 px-4 ${
          isSmall || isOpenSideBarDropdown ? "hidden" : "hidden xl:block"
        }`}
        src="/img/instagram-logo.png"
        alt=""
      />
      <FaInstagram
        className={`text-3xl mx-auto  ${
          isSmall || isOpenSideBarDropdown
            ? "hidden md:inline"
            : "hidden md:inline xl:hidden"
        } mb-8`}
      />
      <ul className="  flex justify-around md:flex-col ">
        {sidebarLinks.map((item, i) => (
          <li
            className={`${!item.isInMobileView && "hidden md:inline"}`}
            key={i}
          >
            {item.isLink ? (
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive ? "font-bold side-link" : "side-link"
                }
              >
                {item.icon}
                <span
                  className={` ${
                    isSmall || isOpenSideBarDropdown
                      ? "hidden"
                      : "hidden xl:inline"
                  } `}
                >
                  {item.title}
                </span>
              </NavLink>
            ) : (
              item.component(
                item,
                isOpenSideBarDropdown,
                handleDropdownButtonClick,
                isSmall
              )
            )}
          </li>
        ))}
        <li
          onClick={openModal}
          className="side-link cursor-pointer"
        >
          <CreateIcon />
          <span
            className={` ${
              isSmall || isOpenSideBarDropdown ? "hidden" : "hidden xl:inline"
            } `}
          >
            Create
          </span>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "font-bold side-link" : "side-link"
            }
          >
            <img
              src={user?.photoUrl}
              className="bg-slate-300 size-[24px] rounded-full"
            />
            <span
              className={` ${
                isSmall || isOpenSideBarDropdown ? "hidden" : "hidden xl:inline"
              } `}
            >
              Profile
            </span>
          </NavLink>
        </li>
      </ul>
      <MoreOptionsDropdown
        isSmall={isSmall}
        isOpenSideBarDropdown={isOpenSideBarDropdown}
      />
    </aside>
    </>
  );
};

export default Aside;
