import { useEffect, useState } from "react";
import Database from "../../class/database/database";
import { useAccount } from "../../redux/auth/hooks";
import { updateLoggedUser } from "../../redux/auth/actions";

const SmallUserProfileItem = ({ user: UserItem }) => {
  const user = useAccount();
  const [isFollowing, setisFollowing] = useState(false);
  //! Kullanıcının takip edilip edilmediğini bilgisine göre state günceller
  useEffect(() => {
    setisFollowing(user.following.some((item) => item === UserItem.uid));
  }, [user.following]);

  //! Kullanıcı takip etme işlemleri
  //! isFollowing state'ine göre kullanıcı takip edilir ya da takipten 
  //! çıkarılır
  const followHandle = async () => {
   const result = await Database.followUser(user,UserItem,isFollowing)
   updateLoggedUser(result); 
  };
  return (
    <div className="flex-between">
      <div className="flex items-center  gap-4">
        <img
          src={UserItem.photoUrl}
          className="size-[40px] bg-slate-400 rounded-full"
          alt=""
        />
        <div className="row-start  text-sm ">
          <span className="font-semibold">{UserItem.userName}</span>
          <span className="text-zinc-500 ">{UserItem.userName}</span>
        </div>
      </div>
      <span
        onClick={followHandle}
        className="text-blue-600 font-semibold text-sm cursor-pointer hover:text-blue-800"
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </span>
    </div>
  );
};

export default SmallUserProfileItem;
