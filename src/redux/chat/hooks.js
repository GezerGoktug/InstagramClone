import { useSelector } from "react-redux";

export const useRoomID = () => useSelector((state) => state.chat.roomID);
export const useChatPerson = () => useSelector((state) => state.chat.chatPerson);
