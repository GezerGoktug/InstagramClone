import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import NotificationItem from "../../UI/NotificationItem";

const NotificationsDropdown = ({
  isOpenSideBarDropdown,
  title,
  icon,
  onClick,
  isSmall,
}) => {
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
        className="absolute w-[500px] h-screen rounded-lg top-0 left-full animate-moving bg-white border border-slate-300  z-20    "
      >
        <div className="px-6 pt-6 py-3 ">
          <h4 className="text-2xl font-bold mb-10">Notifications</h4>
          <div className="flex flex-col gap-4 ">
            <NotificationItem />
          </div>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default NotificationsDropdown;
