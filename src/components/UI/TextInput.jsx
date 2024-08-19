import { useState } from "react";

const TextInput = ({ field, text, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full ">
      <input
        className={`relative w-full focus:outline-none focus:border-gray-500
        h-[42px] ${text && "pt-[8px]"} px-2 border
        bg-neutral-50  text-sm `}
        {...props}
        type={
          props.type === "password"
            ? showPassword
              ? "text"
              : "password"
            : props.type
        }
      />
      <small
        className={`${
          text ? "top-1 left-2 text-[10px] " : "top-3  left-2"
        } transition-all absolute  text-gray-400`}
      >
        {field}
      </small>
      {props.type === "password" && text && (
        <span
          onClick={() => setShowPassword((prevState) => !prevState)}
          className="text-xs font-semibold text-gray-500 absolute cursor-pointer top-1/2 right-3 -translate-y-1/2"
        >
          {!showPassword ? "Show" : "Hide"}
        </span>
      )}
    </div>
  );
};

export default TextInput;
