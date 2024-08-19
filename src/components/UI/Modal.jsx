import OutsideClickHandler from "react-outside-click-handler";
import Overlay from "./Overlay";
import { FaXmark } from "react-icons/fa6";
import { useModal } from "../../redux/modal/hooks";
import { closeModal } from "../../redux/modal/actions";

const Modal = ({ children }) => {
  const isOpen = useModal();

  if (!isOpen) return null;

  return (
    <Overlay>
      <OutsideClickHandler
        onOutsideClick={closeModal}
      >
        <div className="rounded-lg relative animate-scaleUp bg-white w-[90vw] xxs:w-[75vw] md:w-[55vw] lg:w-[45vw] xl:w-[35vw]  overflow-y-auto min-h-[30vh] max-h-[80vh] mx-auto p-6">
          <FaXmark
            onClick={closeModal}
            className="absolute top-4 right-6 cursor-pointer text-3xl"
          />
          {children}
        </div>
      </OutsideClickHandler>
    </Overlay>
  );
};

export default Modal;
