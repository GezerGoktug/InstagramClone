import { BsTelephone } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa";
import { HiArrowRight, HiOutlineVideoCamera } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import Message from "./Message";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Loader from "../UI/Loader";
import Database from "../../class/database/database";
import useChat from "../../hooks/useChat";
import { useChatPerson, useRoomID } from "../../redux/chat/hooks";

const Chat = ({ isPage }) => {
  const chatPerson = useChatPerson();
  const roomID = useRoomID();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [messageLoading, setMessageLoading] = useState(false);

  const { loading, messages } = useChat(roomID);
  const messagesEndRef = useRef(null);

  //! Kaydırma çubuğunu en aşağı indir
  const scrollToBottom = () => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  //! Chat odası değiştiğinde mesaj inputu ve dosya seçici sıfırlanır.
  useEffect(() => {
    setMessage("");
    setFile(null);
  }, [roomID]);

  //! Mesaj gönderme
  const handleMessage = async () => {
    if (!(!(message.trim() === "") || file)) return;
    try {
      setMessageLoading(true);
      await Database.sendMessage(message, file, roomID);
      setMessage("");
      setFile(null);
    } catch (error) {
      console.log(error.message);
    } finally {
      setMessageLoading(false);
    }
  };

  //! Her mesaj gönderisinden  sonra kaydırma çubuğunu en aşağı indir
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <>
      {(loading || messageLoading) && <Loader />}
      <div
        className={` ${
          isPage ? "w-full" : "hidden"
        } md:block relative h-screen `}
      >
        <div className="sticky bg-white  position-top h-[60px] md:h-[80px] px-4 border-b flex-between  border-slate-300">
          <div className="flex gap-4 items-start">
            {isPage && (
              <Link to="/inbox">
                <IoMdArrowRoundBack className="   text-2xl mt-1" />
              </Link>
            )}
            <img
              className=" size-[30px] md:w-[50px] md:h-[50px] bg-slate-200 rounded-full"
              src={chatPerson.photoUrl}
              alt=""
            />
            <div className="font-semibold">{chatPerson.userName}</div>
          </div>
          <div className="flex text-xl md:text-3xl gap-6">
            <BsTelephone />
            <HiOutlineVideoCamera />
            <IoInformationCircleOutline />
          </div>
        </div>
        <form className="fixed flex items-center gap-3 md:absolute z-10 bg-white position-bottom py-4 px-4 ">
          <div className="flex items-center w-full gap-4 border border-slate-300 rounded-full py-2 px-4 ">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Bir mesaj yazın"
              className=" bg-transparent w-full border-none outline-none"
            />
            <div className="relative   ">
              <FaRegImage className="text-2xl " />
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                className="absolute  opacity-0 top-0 left-0 size-full file:w-full  "
              />
            </div>
          </div>
          <HiArrowRight
            onClick={handleMessage}
            className="p-2  cursor-pointer   size-[40px]  bg-blue-600 text-white rounded-full"
          />
        </form>
        <div className=" pt-8 pb-16 overflow-y-auto  max-h-[85vh] px-4  ">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <Message message={message} key={index} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
