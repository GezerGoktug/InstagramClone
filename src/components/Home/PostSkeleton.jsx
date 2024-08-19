import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  FaHeart,
  FaRegHeart,
  FaRegCommentAlt,
  FaRegBookmark,
} from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="flex-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-300 rounded-full" />
          <div className="w-24 h-4 bg-slate-300 rounded" />
          <div className="w-16 h-4 bg-slate-300 rounded" />
        </div>
        <HiOutlineDotsHorizontal className="text-slate-300 text-2xl" />
      </div>
      <div className="w-full h-[400px] bg-slate-300 rounded-md" />
      <div className="flex-between text-2xl">
        <div className="[&_svg]:cursor-pointer flex gap-6 text-slate-300">
          <FaHeart />
          <FaRegHeart />
          <FaRegCommentAlt />
          <IoPaperPlaneOutline />
        </div>
        <FaRegBookmark className="text-slate-300" />
      </div>
      <div>
        <div className="font-semibold w-16 h-4 bg-slate-300 rounded" />
        <p className="my-1">
          <span className="font-semibold w-24 h-4 bg-slate-300 rounded inline-block"></span>
          <span className="w-full h-4 bg-slate-300 rounded inline-block mt-1"></span>
        </p>
        <div className="text-gray-600 my-1 w-16 h-4 bg-slate-300 rounded" />
        <div className="outline-none border-b border-slate-300 bg-slate-300 h-8 p-2 w-full rounded"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
