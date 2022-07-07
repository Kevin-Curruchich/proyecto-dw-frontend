import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import * as Yup from "yup";
import Header from "../../Components/Header/Header";
import InputString from "../../Components/Input/InputString";
import FormContent from "../../Components/Form/FormContent";
import "./login.css";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required("Insert email"),
  password: Yup.string().required("Insert Password"),
});

export default function Login() {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState("");
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
          title="Welcome Back"
          initialValues={{ email: "", password: "" }}
          recordSchema={loginSchema}
          cbSubmit={async ({ email, password }) => {
            authCtx
              .login(email, password)
              .then((response) => {
                return navigate("/dashboard", { replace: true });
              })
              .catch((error) => {
                setError("Failed to log in");
                console.error(error);
              });
          }}
        >
          <div className="form__inputs">
            <InputString label="Email" name="email" type="email" />
            <InputString label="Password" name="password" type="password" />
            {error && <p>{error}</p>}
          </div>
          <div className="form__buttons">
            <button type="submit" className="button button--large solid">
              Login
            </button>
            <button className="button button--large border">Google</button>
          </div>
          <div className="form__links">
            <p>Dont have account</p>
            <Link to="/signup">Signup</Link>
          </div>
        </FormContent>
      </main>
    </>
  );
}
