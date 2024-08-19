import { useFormik } from "formik";
import Button from "../UI/Button";
import TextInput from "../UI/TextInput";
import { IoLogoFacebook } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Auth from "../../class/auth/auth";
import { setLoggedUser } from "../../redux/auth/actions";

const LoginForm = ({ setChancePanel }) => {
  const navigate = useNavigate();

  //! Giriş işleminden sonra redux state'i güncelleme ana sayfa yönlendirme
  const handleUserData = (user) => {
    setLoggedUser(user.toReduxState())
    navigate("/");
  };

  //! Facebook giriş işlemi
  const loginWithApps = async () => {
    const user = await Auth.authWithFacebook();
    handleUserData(user);
  };

  //! Normal giriş işlemi 
  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    const user = await Auth.login(email, password);
    handleUserData(user);
    actions.resetForm();
  };

  const { isSubmitting, handleChange, handleSubmit, isValid, dirty, values }  =
    useFormik({
      initialValues: {email: "",password: ""},
      onSubmit,
    });
  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="bg-white py-8 px-12 col-center border-gray-200 border">
        <img
          className="h-[50px] mb-8"
          src="/img/instagram-logo.png"
          alt=""
        />
        <form onSubmit={handleSubmit} className="w-full col-center  gap-2 ">
          <TextInput
            name="email"
            onChange={handleChange}
            value={values.email}
            text={values.email}
            type="email"
            required
            field="Email"
          />
          <TextInput
            required
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            text={values.password}
            field="Password"
          />
          <Button
            type="submit"
            disabled={isSubmitting || !dirty || !isValid}
            className="bg-[#0095F6] rounded-md w-full   text-sm  "
          >
            Log ın
          </Button>
        </form>
        <div className="relative w-full flex  items-center mt-4 py-2">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold text-slate-600 ">
            OR
          </span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>
        <div
          onClick={loginWithApps}
          className="flex-center cursor-pointer  mt-4 text-indigo-900 font-semibold gap-2"
        >
          <IoLogoFacebook />
          <span>Log in with Facebook</span>
        </div>
        <span className="text-xs mt-6 cursor-pointer">Forgot password ?</span>
      </div>
      <div className="bg-white p-4 text-center text-sm  border-gray-200 border">
        <span>
          Don{"'"}t have an account?
          <span
            onClick={() => setChancePanel(false)}
            className="text-sky-500 font-semibold cursor-pointer"
          >
            {" "}
            Sign up
          </span>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
