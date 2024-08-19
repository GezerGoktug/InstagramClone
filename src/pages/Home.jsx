import Posts from "../components/Home/Posts";
import RecommendedUsers from "../components/Home/RecommendedUsers";
import Stories from "../components/Home/Stories";

const Home = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-[auto_35%]  overflow-y-auto max-h-screen">
      <div className=" mx-4 sm:w-[600px]  sm:mx-auto mt-20  md:mt-12 h-[3000px]">
        <div className="border-b  border-slate-300 pb-6 hidden md:flex font-bold gap-6 ">
          <span>For you</span>
          <span className="text-gray-400">Those you follow</span>
        </div>
        <Stories />
        <Posts />
      </div>
      <RecommendedUsers />
    </div>
  );
};

export default Home;
