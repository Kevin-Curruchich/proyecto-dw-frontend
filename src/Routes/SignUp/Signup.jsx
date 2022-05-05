import Header from "../../Components/Header/Header";
import FormLayout from "../../Components/Form/FormLayout";
import * as Yup from "yup";
import "./Signup.css";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Insert your Name"),
  email: Yup.string().email().required("Insert email"),
  password: Yup.string().required("Insert Password"),
  confirmPassword: Yup.string().required("Confirm Password"),
});

export default function Signup() {
  return (
    <>
      <Header />
      <main className="main--onboard">
        <FormLayout
          title="Sign Up"
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validation={signupSchema}
          inputs={[
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            {
              label: "Confirm Password",
              name: "confirmPassword",
              type: "password",
            },
          ]}
          buttons={[
            {
              type: "submit",
              label: "Sign Up",
              className: "button buttons--xlarge solid",
            },
            {
              type: "button",
              label: "Google",
              className: "button buttons--xlarge border",
              onClick: () => {
                console.log("Hello");
              },
            },
          ]}
        />
      </main>
    </>
  );
}
