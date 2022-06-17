import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthContext from "../../context/auth-context";
import Header from "../../Components/Header/Header";
import InputString from "../../Components/Input/InputString";
import FormContent from "../../Components/Form/FormContent";
import "./Signup.css";

const signupSchema = Yup.object().shape({
  first_name: Yup.string().required("Insert your name"),
  last_name: Yup.string().required("Insert your last name"),
  email: Yup.string().email("Insert a valid email").required("Insert email"),
  password: Yup.string().min(8, "Min 8").required("Insert password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password"),
});

export default function Signup() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.entries(authCtx.currentUser).length !== 0) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  return (
    <>
      <Header />
      <main className="main--onboard">
        <FormContent
          title="Sign Up"
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          recordSchema={signupSchema}
          cbSubmit={({ email, password, first_name, last_name }) =>
            authCtx
              .register(first_name, last_name, email, password)
              .then((response) => {
                console.log(response);
                return navigate("/dashboard", { replace: true });
              })
              .catch((error) => console.log(error))
          }
        >
          <div className="form__inputs">
            <div className="form__inputs--column">
              <InputString
                label="Name"
                largeInput="medium"
                name="first_name"
                type="text"
              />
              <InputString
                label="Last Name"
                largeInput="medium"
                name="last_name"
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
