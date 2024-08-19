import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Database from "../../class/database/database";
import { useAccount } from "../../redux/auth/hooks";
import { setChatPerson } from "../../redux/chat/actions";

const MessagePerson = ({ person }) => {
  const user = useAccount();
  const navigate = useNavigate();

  //! Cihazın mobil olup olmadığını belirler
  const isMobile = useMediaQuery({ maxWidth: 767 });

  //! İki kullanıcı arasında bir mesaj odası var mı kontrol eder
  //! eğer yoksa bir oda oluşturur ve state güncellenir,
  //! eğer varsa da gelen veriden oda id si alınıp state  güncellenir
  const clickMessagePerson = async () => {
    const roomID = await Database.getMessageRoom(person.uid, user.uid);
    setChatPerson({
      person: {
        uid: person.uid,
        userName: person.userName,
        photoUrl: person.photoUrl,
      },
      roomID,
    });
    //! Mobil cihazda chat sayfasına yönlendirilir
    if (isMobile) navigate(`/inbox/${person.uid}`);
  };

  return (
    <div
      onClick={clickMessagePerson}
      className=" flex-center  cursor-pointer gap-4"
    >
      <img
        src={person.photoUrl}
        className=" size-[60px]  rounded-full"
        alt=""
      />
      <div className="w-[calc(100%-76px)] flex md:hidden xsl:flex flex-col gap-2   md:text-sm">
        <span className="font-semibold">{person.userName}</span>
        <div>{person.fullname}</div>
      </div>
    </div>
  );
};

export default MessagePerson;
