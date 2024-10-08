import getAccountUID from "../../utils/getAccountUID";

const Message = ({ message }) => {
  return (
    <div className={`${message.senderuid === getAccountUID() && "ms-auto"}`}>
      <div
        className={`${
          message.senderuid === getAccountUID() && "bg-blue-600 text-white"
        } w-max text-sm xs:text-base max-w-[250px] xs:max-w-[400px]  whitespace-pre-line  border border-slate-300 rounded-lg`}
      >
        {message.photoUrl && (
          <img
            className="max-h-[300px] w-full rounded-t-lg  object-contain bg-slate-100"
            src={message.photoUrl}
            alt=""
          />
        )}
        {message.message && <p className="py-2 px-4">{message.message}</p>}
      </div>
    </div>
  );
};

export default Message;
