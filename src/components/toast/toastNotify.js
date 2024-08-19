import toast from "react-hot-toast";
import  { ERROR, SUCCESS } from "../../constants/types";

const toastNotify = (type, message) => {
  switch (type) {
    case SUCCESS:
      toast.success(message, {
        duration: 3000,
      });
      break;
    case ERROR:
      toast.error(message, {
        duration: 3000,
      });
      break;
  }
};

export default toastNotify;
