import { IoLogoFacebook } from "react-icons/io";
import Button from "../UI/Button";
import TextInput from "../UI/TextInput";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas/register";
import { useNavigate } from "react-router-dom";
import Auth from "../../class/auth/auth";
import { setLoggedUser } from "../../redux/auth/actions";

const RegisterForm = ({ setChancePanel }) => {
  const navigate = useNavigate();

  //! Kayıt işleminden sonra redux state'i güncelleme ana sayfa yönlendirme
  const handleUserData = (user) => {
    setLoggedUser(user.toReduxState())
    navigate("/");
  };

  //! Facebook giriş işlemi
  const loginWithApps = async () => {
    const user = await Auth.authWithFacebook();
    handleUserData(user);
  };

  //! Normal kayıt işlemi 
  const onSubmit = async (values, actions) => {
    const { name, userName, email, password } = values;
    const user = await Auth.register(email, password, userName, name);
    handleUserData(user);
    actions.resetForm();
  };

  const { isSubmitting, handleChange, handleSubmit, dirty, isValid, values } =
    useFormik({
      initialValues: {
        name: "",
        userName: "",
        email: "",
        password: "",
      },
      onSubmit,
      validationSchema: registerSchema,
    });

  return (
    <div className="mx-auto flex flex-col gap-2 w-[350px]">
      <div className="bg-white py-8 px-10 col-center border-gray-200 border">
        <img
          className="h-[50px] "
          src="/img/instagram-logo.png"
          alt=""
        />
        <p className="text-gray-400 text-[17px] text-center my-4 font-semibold">
          Sign up to see photos and videos from your friends.
        </p>
        <Button
          onClick={loginWithApps}
          className="bg-[#0095F6]  text-sm font-medium py-1 w-full  rounded "
        >
          <IoLogoFacebook className="text-lg" />
          Log in with Facebook
        </Button>
        <div className="relative flex w-full  items-center my-2 py-2">
          <div className="flex-grow border-t-2 border-slate-300"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold text-slate-500 ">
            OR
          </span>
          <div className="flex-grow border-t-2 border-slate-300"></div>
        </div>
        <form onSubmit={handleSubmit} className="w-full col-center  gap-2 ">
          <TextInput
            name="email"
            onChange={handleChange}
            value={values.email}
            text={values.email}
            type="email"
            field="Email"
          />
          <TextInput
            name="name"
            onChange={handleChange}
            value={values.name}
            text={values.name}
            field="Full Name"
          />
          <TextInput
            name="userName"
            onChange={handleChange}
            value={values.userName}
            text={values.userName}
            field="Username"
          />
          <TextInput
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            text={values.password}
            field="Password"
          />
          <p className="text-xs text-slate-600">
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <span className="font-bold text-slate-500">Learn More</span> <br />
            <br />
            By signing up, you agree to our{" "}
            <span className="font-bold text-slate-500">
              Terms, Data Policy and Cookies Policy.
            </span>
          </p>
          <Button
            type="submit"
            disabled={isSubmitting || !dirty || !isValid}
            className="bg-[#0095F6] mt-2  rounded w-full opacity-100 text-white text-sm py-1 "
          >
            Sign up
          </Button>
        </form>
      </div>
      <div className="bg-white p-4 text-center text-sm  border-gray-200 border">
        <span>
          Have an account?
          <span
            onClick={() => setChancePanel(true)}
            className="text-sky-500 font-semibold cursor-pointer"
          >
            {" "}
            Log in
          </span>
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
