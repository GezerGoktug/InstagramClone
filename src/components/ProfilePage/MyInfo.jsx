import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Database from "../../class/database/database";
import { useAccount } from "../../redux/auth/hooks";

const MyInfo = () => {
  const [infos, setInfos] = useState(null);
  const user = useAccount();
  //! Diğer kullanıcı bilgilerimizi alıyoruz
  useEffect(() => {
    const fetchUserOthersInfo = async () => {
      const userInfos = await Database.getMyProfileInfo();
      setInfos(userInfos);
    };
    fetchUserOthersInfo();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-12 md:gap-28 mt-28 md:mt-16">
      <img src={user.photoUrl} className=" rounded-full size-[150px]" alt="" />
      <div className="flex-1 flex flex-col">
        <div className="flex gap-3 items-center flex-wrap ">
          <h4 className="text-2xl me-6">{user.userName}</h4>
          <Button className="bg-zinc-200 hover:bg-zinc-300 text-sm !text-black rounded-lg">
            <Link to="/settings">Edit profile</Link>
          </Button>
        </div>
        <div className="flex  gap-4 my-6">
          <div className="flex gap-2 flex-wrap justify-center">
            <span className="font-semibold">{infos?.postCount}</span> post
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <span className="font-semibold">{infos?.followers.length}</span>{" "}
            follower
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <span className="font-semibold">{user?.following.length}</span>{" "}
            followed
          </div>
        </div>
        <div className="font-semibold my-2 ">{user.fullname}</div>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};

export default MyInfo;
