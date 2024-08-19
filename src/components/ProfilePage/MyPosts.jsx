import { useEffect, useState } from "react";
import Database from "../../class/database/database";
import { useAccount } from "../../redux/auth/hooks";

const MyPosts = () => {
  const  user = useAccount();
  const [myPosts, setMyPosts] = useState([]);
  //! Paylaştığımız postların bilgilerini alıyoruz.
  useEffect(() => {
    const fetchUserPosts = async () => {
      const userPosts = await Database.getMyPosts(user?.uid);
      setMyPosts(userPosts);
    };
    fetchUserPosts();
  }, []);

  return (
    <div className=" grid grid-cols-3 gap-2 ">
      {myPosts?.map((item) => (
        <>
          <img
            className="bg-slate-100 w-full h-[100px] xxs:h-[150px] xs:h-[200px] lg:h-[300px] object-contain"
            src={item}
            alt=""
          />
        </>
      ))}
    </div>
  );
};

export default MyPosts;
