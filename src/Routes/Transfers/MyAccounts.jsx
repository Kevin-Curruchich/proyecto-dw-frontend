import { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import AuthContext from "../../context/auth-context";
import Select from "../../Components/Select/Select";
import InputString from "../../Components/Input/InputString";
import FormContent from "../../Components/Form/FormContent";
import Textarea from "../../Components/Textarea/Textarea";
import * as Yup from "yup";

const recordSchema = Yup.object().shape({
  bankAccountOut: Yup.string().required("Origin?"),
  bankAccountIn: Yup.string().required("Destination?"),
  amountOut: Yup.number().required("Amount?"),
  description: Yup.string(),
});

function MyAccounts() {
  const authCtx = useContext(AuthContext);
  const [cookies] = useCookies(["auth_token"]);
  const [error, setError] = useState("");

  const handleSubmit = (values) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/transfermoney`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.auth_token}`,
            },
            credentials: "include",
            body: JSON.stringify(values),
          }
        );
        response = await response.json();
        console.log(response);
        if (!response.transferCompleted) return reject(response);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <section className="main--form">
      <FormContent
        title="My Accounts"
        initialValues={{
          bankAccountOut: "",
          bankAccountIn: "",
          amountOut: "",
          description: "",
        }}
        recordSchema={recordSchema}
        cbSubmit={(values, actions) => {
          handleSubmit(values)
            .then((response) => actions.resetForm())
            .catch((error) => {
              setError(error.message);
            });
        }}
      >
        <div className="form__inputs">
          <Select
            name="bankAccountOut"
            label="Origin Account"
            opions={authCtx.bankAccounts}
          />
          <Select
            name="bankAccountIn"
            label="Destination Account"
            opions={authCtx.bankAccounts}
          />
          <InputString label="Amount" name="amountOut" type="number" />
          <Textarea label="Description" name="description" />
        </div>
        {error && <p className="form__error">{error}</p>}
        <div className="form__buttons--one">
          <button type="submit" className="button button--xlarge solid">
            Transfer
          </button>
        </div>
      </FormContent>
    </section>
  );
}

export default MyAccounts;
