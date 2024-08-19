import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";

//! Her oda değiştiğinde (farklı kullanıcı ile olan chat odası açıldığında)
//! önceki chat odasındaki anlık dinleyici kaldırılır .
//! Yeni odaya anlık dinleyici ekler

const useChat = (roomID) => {
  const unSubRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (unSubRef.current) unSubRef.current();

    setLoading(true);
    const unSub = onSnapshot(doc(db, "rooms", roomID), (docSnap) => {
      setMessages(docSnap.data().messages);
      setLoading(false);
    });
    unSubRef.current = unSub;
    return () => unSub();
  }, [roomID]);
  return { messages, loading };
};

export default useChat;
