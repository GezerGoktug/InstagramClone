import { useRef, useState } from "react";
import { useEffect } from "react";
import LoginForm from "../components/AuthPage/LoginForm";
import RegisterForm from "../components/AuthPage/RegisterForm";

const images = [
  "/img/loginImg1.png",
  "/img/loginImg2.png",
  "/img/loginImg3.png",
  "/img/loginImg4.png",
];

const Auth = () => {
  const [chancePanel, setChancePanel] = useState(true);
  const imgRef = useRef();
  let currentImgIndex = 0;
  useEffect(() => {
    const changeImage = () => {
      if (!imgRef.current.classList) return;

      imgRef.current.classList.add("opacity-0");
      if (currentImgIndex === images.length - 1) currentImgIndex = 0;
      else currentImgIndex++;

      setTimeout(() => {
        imgRef.current.classList.remove("opacity-0");
        imgRef.current.src = images[currentImgIndex];
      }, 1000);
    };
    changeImage();
    const imagesInterval = setInterval(changeImage, 3000);

    return () => {
      clearInterval(imagesInterval);
    };
  }, []);
  return (
    <div className="flex gap-4 items-center   mx-auto xxxs:w-[350px] md:w-[768px] min-h-screen  ">
      <div
        className={`${
          chancePanel
            ? "relative hidden md:block w-[380px] h-[580px]"
            : "hidden"
        }`}
      >
        <img
          className=" w-full h-full object-cover  "
          src="/img/loginFrame.png"
          alt=""
        />
        <img
          src={images[0]}
          ref={imgRef}
          className="absolute w-[226px] h-[495px] top-[4%] left-[32%]  transition-opacity duration-1000 ease-linear"
        />
      </div>
      {chancePanel ? (
        <LoginForm setChancePanel={setChancePanel} />
      ) : (
        <RegisterForm setChancePanel={setChancePanel} />
      )}
    </div>
  );
};

export default Auth;
