import { IoAppsSharp } from "react-icons/io5";
import { LuUserSquare2 } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import MyPosts from "../components/ProfilePage/MyPosts";
import MyInfo from "../components/ProfilePage/MyInfo";

const Profile = () => {
  return (
    <div className=" max-h-screen overflow-y-auto">
      <div className="mx-4 sm:w-[600px] lg:w-[900px] sm:mx-auto ">
        <MyInfo />
        <div className="my-12 border-y border-zinc-300 flex justify-around sm:justify-center gap-4 sm:gap-12 py-4">
          <div className="flex items-center gap-2 uppercase cursor-pointer">
            <IoAppsSharp className="text-3xl sm:text-base" />
            <span className="hidden sm:inline">Posts</span>
          </div>
          <div className="flex items-center gap-2 uppercase cursor-pointer">
            <FaRegBookmark className="text-3xl sm:text-base" />
            <span className="hidden sm:inline">Saved</span>
          </div>
          <div className="flex items-center gap-2 uppercase cursor-pointer">
            <LuUserSquare2 className="text-3xl sm:text-base" />
            <span className="hidden sm:inline">Tagged</span>
          </div>
        </div>
        <MyPosts />
      </div>
    </div>
  );
};

export default Profile;
