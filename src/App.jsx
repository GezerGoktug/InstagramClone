import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Messages from "./pages/Messages";
import ChatPage from "./pages/ChatPage";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ErrorPage from "./pages/ErrorPage";
import SearchResult from "./pages/SearchResult";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/layouts/Layout";
import { useSessionStatus } from "./redux/auth/hooks";

//! Kullanıcı giriş yapmadığı sürece sayfalara ulaşamaz
const PrivateRoute = () => {
  const isLoggedIn = useSessionStatus()

  return isLoggedIn ? <Outlet /> : <Navigate to="/auth" />;
};

function App() {
  const homeLayoutProps = {
    showAside: true,
    asideProps: { isBottomNavBar: true },
    navbarProps: { type: "HOME_PAGE_NAV" },
  };

  const inboxLayoutProps = {
    showAside: true,
    asideProps: { isSmall: true },
    navbarProps: { isInboxPage: true },
  };

  const chatLayoutProps = {
    showAside: false,
  };

  const authLayoutProps = {
    showAside: false,
  };

  const defaultLayoutProps = {
    showAside: true,
    asideProps: {},
    navbarProps: {},
  };

  return (
    <div className="flex  w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout {...defaultLayoutProps} />}>
          <Route path="/*" element={<ErrorPage />} />
        </Route>
        <Route path="/auth" element={<Layout {...authLayoutProps} />}>
          <Route index element={<Auth />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout {...homeLayoutProps} />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/" element={<Layout {...defaultLayoutProps} />}>
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/search/:text" element={<SearchResult />} />
          </Route>
          <Route path="/inbox" element={<Layout {...inboxLayoutProps} />}>
            <Route index element={<Messages />} />
          </Route>
          <Route path="/inbox/:id" element={<Layout {...chatLayoutProps} />}>
            <Route index element={<ChatPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
