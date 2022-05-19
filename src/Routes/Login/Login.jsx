import * as Yup from "yup";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import InputString from "../../Components/Input/InputString";
import FormContent from "../../Components/Form/FormContent";
import "./Login.css";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required("Insert email"),
  password: Yup.string().required("Insert Password"),
});

export default function Login() {
  return (
    <>
      <Header />
      <main className="main--onboard">
        <FormContent
          title="Welcome Back"
          initialValues={{ email: "", password: "" }}
          recordSchema={loginSchema}
          cbSubmit={() => {
            console.log("Login");
          }}
        >
          <div className="form__inputs">
            <InputString label="Email" name="email" type="email" />
            <InputString label="Password" name="password" type="password" />
          </div>
          <div className="form__buttons">
            <button type="submit" className="button button--large solid">
              Login
            </button>
            <button type="submit" className="button button--large border">
              Google
            </button>
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
