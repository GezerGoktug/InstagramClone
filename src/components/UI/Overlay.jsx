import ReactDOM from "react-dom";
import Backdrop from "../layout/Backdrop";

const Overlay = ({ children }) => {
  const overlay = document.getElementById("overlay");
  return <>{ReactDOM.createPortal(<Backdrop>{children}</Backdrop>, overlay)}</>;
};

export default Overlay;
