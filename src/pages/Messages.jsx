import Chat from "../components/MessagesPage/Chat";
import Persons from "../components/MessagesPage/Persons";
import { useChatPerson } from "../redux/chat/hooks";

const Messages = () => {
  const chatPerson = useChatPerson();
  return (
    <div className=" h-full   grid grid-cols-1 md:grid-cols-[100px_auto] xsl:grid-cols-[400px_auto]">
      <Persons />
      {chatPerson && <Chat />}
    </div>
  );
};

export default Messages;
