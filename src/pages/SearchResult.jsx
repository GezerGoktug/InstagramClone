import { useState } from "react";
import { useParams } from "react-router-dom";
import SmallUserProfileItem from "../components/UI/SmallUserProfileItem";
import { useEffect } from "react";
import Database from "../class/database/database";
import { useAccount } from "../redux/auth/hooks";

const SearchResult = () => {
  const { text } = useParams();
  const user = useAccount();
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    //! Arama sonuçlarını getirir
    const fetchSearchResult = async () => {
      const result = await Database.searchUsers(user.uid,text);
      setSearchResult(result);
    };
    fetchSearchResult();
  }, []);

  return (
    <div className="flex flex-col gap-6 mt-20 mx-6">
      <div className="font-semibold text-2xl">
        {searchResult.length} user founded
      </div>
      {searchResult.map((item) => (
        <SmallUserProfileItem key={item.uid} user={item} />
      ))}
    </div>
  );
};

export default SearchResult;
