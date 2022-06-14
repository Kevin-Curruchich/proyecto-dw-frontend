import { Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
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
          cbSubmit={(values) => {
            // alert(JSON.stringify(values, null, 2));
            axios({
              method: "post",
              url: "http://localhost:8080/login",
              data: JSON.stringify(values, null, 2),
            })
              .then(() => {})
              .catch((error) => {
                console.error(error);
              });
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
