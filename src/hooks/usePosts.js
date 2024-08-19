import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useRef, useState } from "react";

const usePosts = (following, uid) => {
  const unSubRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const q = query(
    collection(db, "posts"),
    where("userUid", "in", [...following, uid]),
    orderBy("time", "desc")
  );

  //! Kullanıcıların anlık gönderi yüklemelerini takip edip state güncellemek için
  //! Anlık dinleyici ekliyoruz
  useEffect(() => {
    if (unSubRef.current) unSubRef.current();

    setLoading(true);
    const unSub = onSnapshot(q, (docSnap) => {
      setPosts(docSnap.docs.map((doc) => doc.data()));
      setLoading(false);
    });
    unSubRef.current = unSub;
    return () => unSub();
  }, [following]);

  return { loading, posts };
};

export default usePosts;
