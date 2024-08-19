const Backdrop = ({ children }) => {
  return (
    <div className="backdrop bg-black/50 flex-center  fixed position-top size-full  z-50">
      {children}
    </div>
  );
};

export default Backdrop;
