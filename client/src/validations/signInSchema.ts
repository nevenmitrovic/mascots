import * as yup from "yup";

// jebeni yup za email nema dovoljno strogu validaciju (prolazi npr neven@gmail bez .com)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, "Kredencijali nisu ispravni")
    .required("Kredencijali nisu ispravni"),
  password: yup.string().required("Kredencijali nisu ispravni"),
});
export default signInSchema;
