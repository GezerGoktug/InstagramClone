const Button = ({ className, onClick, type, children, disabled }) => {
  return (
    <button
      disabled={disabled || false}
      className={`${className} text-white disabled:opacity-50 flex-center gap-2 px-3  sm:px-5 py-2  transition-colors font-bold`}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
