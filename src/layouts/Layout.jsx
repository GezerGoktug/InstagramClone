import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Aside from "../components/layout/Aside/Aside";


const Layout = ({ showAside, asideProps, navbarProps }) => {
  return (
    <>
      {showAside && <Aside {...asideProps} />}
      {navbarProps && <Navbar {...navbarProps} />}
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
