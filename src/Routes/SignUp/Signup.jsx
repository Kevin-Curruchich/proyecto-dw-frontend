import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";
import InputString from "../../Components/Input/InputString";
import FormContent from "../../Components/Form/FormContent";
import * as Yup from "yup";
import "./Signup.css";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Insert your name"),
  lastname: Yup.string().required("Insert your last name"),
  email: Yup.string().email("Insert a valid email").required("Insert email"),
  password: Yup.string().min(8, "Min 8").required("Insert password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password"),
});

export default function Signup() {
  return (
    <>
      <Header />
      <main className="main--onboard">
        <FormContent
          title="Sign Up"
          initialValues={{
            name: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          recordSchema={signupSchema}
          cbSubmit={() => console.log("signup")}
        >
          <div className="form__inputs">
            <div className="form__inputs--column">
              <InputString
                label="Name"
                largeInput="medium"
                name="name"
                type="text"
              />
              <InputString
                label="Last Name"
                largeInput="medium"
                name="lastname"
                type="text"
              />
            </div>
            <InputString label="Email" name="email" type="email" />
            <InputString label="Password" name="password" type="password" />
            <InputString
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
          </div>
          <div className="form__buttons">
            <button type="submit" className="button button--large solid">
              Sign UP
            </button>
            <button type="submit" className="button button--large border">
              Google
            </button>
          </div>
          <div className="form__links">
            <p>Already have account?</p>
            <Link to="/login">Login</Link>
          </div>
        </FormContent>
      </main>
    </>
  );
}
