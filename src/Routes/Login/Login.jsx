import Header from "../../Components/Header/Header";
import FormLayout from "../../Components/Form/FormLayout";
import { useAuth0 } from "@auth0/auth0-react";
import * as Yup from "yup";
import "./Login.css";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required("Insert email"),
  password: Yup.string().required("Insert Password"),
});

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Header />
      <main className="main--onboard">
        <FormLayout
          title="Welcome Back"
          initialValues={{ email: "", password: "" }}
          validation={loginSchema}
          inputs={[
            {
              label: "Email",
              placeholder: "example@mybudget.com",
              name: "email",
              type: "email",
            },
            {
              label: "Password",
              placeholder: "**********",
              name: "password",
              type: "password",
            },
          ]}
          buttons={[
            {
              type: "submit",
              label: "Login",
              className: "button buttons--xlarge solid",
            },
            {
              type: "button",
              label: "Google",
              className: "button buttons--xlarge border",
              onClick: () => {
                loginWithRedirect();
                console.log("Hello");
              },
            },
          ]}
          links={{
            label: "Don't have account?",
            link: "/signup",
            linkLabel: "Signup",
          }}
        />
      </main>
    </>
  );
}
