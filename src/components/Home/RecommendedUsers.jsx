import { useEffect, useState } from "react";
import SmallUserProfileItem from "../UI/SmallUserProfileItem";
import Database from "../../class/database/database";
import { useAccount } from "../../redux/auth/hooks";

const RecommendedUsers = () => {
  const user = useAccount();
  const [recommendUsers, setRecommendUsers] = useState([]);
  useEffect(() => {
    /**
     *! Firestore'dan kullanıcıları getirip, oturum açmış kullanıcının takip etmediği ve
     *! oturum açmış kullanıcıdan farklı olanları filtreleyerek önerilen kullanıcılar listesini günceller.
     *! Her kullanıcı yeni birileri takip ettiğinde liste güncellenir.
     */
    const fetchRecommendUsers = async () => {
      const result = await Database.recommendUsers();
      setRecommendUsers(result);
    };
    fetchRecommendUsers();
  }, [user.following]);

  return (
    <div className="hidden lg:block pt-12 w-[320px] me-auto ">
      <div className="flex items-center justify-start gap-4">
        <img
          src={user?.photoUrl}
          className="size-[40px]  rounded-full"
          alt=""
        />
        <div className="flex flex-col text-sm justify-start">
          <span className="font-semibold">{user?.userName}</span>
          <span className="text-zinc-500 ">{user?.fullname}</span>
        </div>
      </div>

      <div className="my-6 text-zinc-500 font-semibold text-sm">
        Recommended for you
      </div>
      <div className="overflow-y-auto max-h-[400px] pe-6  flex flex-col gap-6">
        {recommendUsers.map((user) => (
          <SmallUserProfileItem key={user.uid} user={user} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 text-xs font-semibold mt-12 text-zinc-400">
        <span>Hakkında</span>
        <span>Yardım</span>
        <span>Basın</span>
        <span>API</span>
        <span>İş fırsatları</span>
        <span>Gizlilik</span>
        <span>Koşullar</span>
        <span>Konumlar</span>
        <span>Dil</span>
        <span>Meta Verified</span>
      </div>
      <div className="text-xs text-zinc-400 font-semibold mt-6">
        &copy; 2024 INSTAGRAM FROM META
      </div>
    </div>
  );
};

export default RecommendedUsers;
