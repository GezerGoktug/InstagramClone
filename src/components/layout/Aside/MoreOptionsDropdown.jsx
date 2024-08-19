import SettingsIcon from "../../../../public/icon/settings.svg?react";
import RecordedIcon from "../../../../public/icon/saved.svg?react";
import MoveIcon from "../../../../public/icon/movements.svg?react";
import SunIcon from "../../../../public/icon/sun.svg?react";
import WarningIcon from "../../../../public/icon/warning.svg?react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import Auth from "../../../class/auth/auth";
import { clearUser } from "../../../redux/auth/actions";
import { clearChat } from "../../../redux/chat/actions";


const MoreOptionsDropdown = ({ isOpenSideBarDropdown,isSmall }) => {
  //! Hesaptan çıkış yapma işlevi
  const handleLogOut = async () => {
    await Auth.logout();
    //!  State leri temizle
    clearUser();
    clearChat();
  };
  return (
    <Menu  as="div" className="relative hidden md:block mt-auto">
      <MenuButton className="side-link cursor-pointer w-full ">
        <RxHamburgerMenu className="text-2xl" />
        <span
          className={` ${
            isSmall || isOpenSideBarDropdown
              ? "hidden"
              : "hidden xl:inline"
          } `}
        >
          More
        </span>
      </MenuButton>
      <MenuItems transition
       className="absolute left-full xl:left-0 bottom-0 xl:bottom-full z-10 w-[300px]
       origin-left xl:origin-bottom transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0
       ">
        <div className="p-2 mb-2 rounded-t-xl bg-white shadow-2xl">
          <MenuItem>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "font-bold side-link" : "side-link"
              }
            >
              <SettingsIcon className="text-2xl" />
              Settings
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to="/movements"
              className={({ isActive }) =>
                isActive ? "font-bold side-link" : "side-link"
              }
            >
              <MoveIcon className="text-2xl" />
              Your movements
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to="recorded"
              className={({ isActive }) =>
                isActive ? "font-bold side-link" : "side-link"
              }
            >
              <RecordedIcon className="text-2xl" />
              Recorded
            </NavLink>
          </MenuItem>
          <MenuItem>
            <div className="side-link">
              <SunIcon className="text-2xl" />
              Change view
            </div>
          </MenuItem>
          <MenuItem>
            <div className="side-link">
              <WarningIcon className="text-2xl" />
              Report a problem
            </div>
          </MenuItem>
        </div>
        <div className="p-2 rounded-b-xl   bg-white shadow-2xl">
          <MenuItem>
            <div className="side-link cursor-pointer">Change account</div>
          </MenuItem>
          <MenuItem>
            <div onClick={handleLogOut} className="side-link cursor-pointer">
              Log out
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default MoreOptionsDropdown;
