import { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import AuthContext from "../../context/auth-context";
import Select from "../../Components/Select/Select";
import InputString from "../../Components/Input/InputString";
import FormContent from "../../Components/Form/FormContent";
import Textarea from "../../Components/Textarea/Textarea";
import * as Yup from "yup";

const recordSchema = Yup.object().shape({
  LoteMateriaPrima: Yup.string().required(
    "Seleccione un lote de materia prima"
  ),
  empleadoVenta: Yup.string().required("Seleccione empleado"),
  monotMinimo: Yup.number().required("Monto minimo al lote requerido"),
  notas: Yup.string(),
});

function ExtraccionBlocks() {
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
        title="Materia Prima Blocks"
        initialValues={{
          LoteMateriaPrima: "",
          empleadoVenta: "",
          monotMinimo: "",
          notas: "",
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
            name="LoteMateriaPrima"
            label="Materia prima"
            opions={authCtx.bankAccounts}
          />
          <Select
            name="empleadoVenta"
            label="Empleado encargado"
            opions={authCtx.bankAccounts}
          />
          <InputString label="Precio minimo" name="monotMinimo" type="number" />
          <Textarea label="Notas" name="notas" />
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

export default ExtraccionBlocks;
