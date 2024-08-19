import MessageIcon from "../../../public/icon/startmessage.svg?react";
import MessagePerson from "./MessagePerson";
import { useEffect, useState } from "react";
import Database from "../../class/database/database";
import { useAccount } from "../../redux/auth/hooks";

const Persons = () => {
  const user = useAccount();
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    /**
     *! Oturum açmış kullanıcının takip ettiği kişileri Firestore'dan alır ve
     *! bu kişileri state'de saklar.
     */
    const fetchMessagePersons = async () => {
      const result = await Database.getAvailableSendMessagePersons(user.following)
      if(result) setPersons(result);
    };

    fetchMessagePersons();
  }, []);

  return (
    <div className=" max-h-screen min-h-full overflow-y-auto pt-24 md:pt-12 px-2 xxs:px-6 md:px-2 xsl:px-6 border-e border-slate-300">
      <div className=" gap-2 flex-between md:justify-center xsl:justify-between">
        <h4 className=" text-xl font-bold md:hidden xsl:block">Messages</h4>
        <span className="hidden md:inline cursor-pointer">
          <MessageIcon />
        </span>
      </div>
      <div className="mt-12 flex flex-col gap-6">
        {persons.map((person) => (
          <MessagePerson key={person.uid} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Persons;
