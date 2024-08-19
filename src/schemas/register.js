import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  userName: Yup.string().required("Required username"),
  email: Yup.string()
    .required("Required email")
    .email("Enter a valid email address"),
  password: Yup.string().required("Required Password"),
});
