import HomeIcon from "../../public/icon/home.svg?react";
import DiscoverIcon from "../../public/icon/discover.svg?react";
import MessagesIcon from "../../public/icon/messages.svg?react";
import ReelsIcon from "../../public/icon/reels.svg?react";
import NotificationsIcon from "../../public/icon/notifications.svg?react";
import SearchIcon from "../../public/icon/search.svg?react";
import SearchDropdown from "../components/layout/Aside/SearchDropdown";
import NotificationsDropdown from "../components/layout/Aside/NotificationsDropdown";

export const sidebarLinks = [
  {
    title: "Home",
    isLink: true,
    icon: <HomeIcon />,
    isInMobileView: true,
    url: "/",
  },
  {
    title: "Search",
    isLink: false,
    icon: <SearchIcon />,
    component: (item, isOpenSideBarDropdown, onClick,isSmall) => (
      <SearchDropdown
        icon={item.icon}
        title={item.title}
        onClick={onClick}
        isSmall={isSmall}
        isOpenSideBarDropdown={isOpenSideBarDropdown}
      />
    ),
    isInMobileView: false,
  },
  {
    title: "Discover",
    isLink: true,
    icon: <DiscoverIcon />,
    isInMobileView: true,
    url: "/discover",
  },
  {
    title: "Reels",
    isLink: true,
    icon: <ReelsIcon />,
    isInMobileView: true,
    url: "/reels",
  },
  {
    title: "Messages",
    isLink: true,
    icon: <MessagesIcon />,
    isInMobileView: true,
    url: "/inbox",
  },
  {
    title: "Notifications",
    isLink: false,
    component: (item, isOpenSideBarDropdown, onClick,isSmall) => (
      <NotificationsDropdown
        icon={item.icon}
        title={item.title}
        onClick={onClick}
        isSmall={isSmall}
        isOpenSideBarDropdown={isOpenSideBarDropdown}
      />
    ),
    icon: <NotificationsIcon />,
    isInMobileView: false,
  },
];
