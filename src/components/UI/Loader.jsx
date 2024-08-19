import { FaSpinner } from "react-icons/fa";
import Overlay from "./Overlay";

const Loader = () => {
  return (
    <Overlay>
    <div className="text-white  text-center  col-center gap-5">
      <FaSpinner className=" animate-spin text-5xl " />
      <span className="font-semibold text-2xl ">
        Your transaction is in progress, please wait.
      </span>
    </div>
    </Overlay>
  );
};

export default Loader;
