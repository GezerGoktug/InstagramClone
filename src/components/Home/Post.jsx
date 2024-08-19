import { FaRegBookmark, FaRegCommentAlt, FaRegHeart } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { FaHeart } from "react-icons/fa";
import EditPostDropdown from "./EditPostDropdown";
import { useEffect, useState } from "react";
import Database from "../../class/database/database";
import { useAccount } from "../../redux/auth/hooks";

const Post = ({ post }) => {
  const user = useAccount();
  const [isLiked, setIsLiked] = useState(false);
  dayjs.extend(relativeTime);

  useEffect(() => {
    setIsLiked(post.likes.some((item) => item === user.uid));
  }, [post.likes]);

  const handleLike = async () =>
    await Database.postLiked(post.id, user.uid, isLiked);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex-between">
        <div className="flex items-center gap-4">
          <img
            src={post.userPhotoUrl}
            className="size-[40px]  rounded-full "
            alt=""
          />
          <h5>{post.userName}</h5>
          <span>{dayjs.unix(post.time?.seconds).fromNow()}</span>
        </div>
        <EditPostDropdown id={post.id} isDoEdit={post.userUid === user.uid} />
      </div>
      <img
        src={post.postPhotoUrl}
        className="w-full h-[400px] rounded-md object-contain bg-slate-200 "
        alt=""
      />
      <div className="flex-between text-2xl">
        <div className="[&_svg]:cursor-pointer flex gap-6">
          {isLiked ? (
            <FaHeart onClick={handleLike} className="text-red-600" />
          ) : (
            <FaRegHeart onClick={handleLike} />
          )}
          <FaRegCommentAlt />
          <IoPaperPlaneOutline />
        </div>
        <FaRegBookmark />
      </div>
      <div>
        <div className="font-semibold">{post.likes.length} liked</div>
        <p className="my-1">
          <span className="font-semibold">{post.userName}: </span>
          {post.content}
        </p>
        <div className="text-gray-600 my-1">0 comments</div>
        <input
          placeholder="Add comment"
          className="outline-none border-b border-slate-300 bg-transparent placeholder:text-gray-600 p-2 w-full"
        />
      </div>
    </div>
  );
};

export default Post;
