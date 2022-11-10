import { useState, useEffect } from "react";
import Select from "../../Components/Select/Select";
import InputString from "../../Components/Input/InputString";
import FormContent from "../../Components/Form/FormContent";
import Textarea from "../../Components/Textarea/Textarea";
import * as Yup from "yup";

const recordSchema = Yup.object().shape({
  extraccionMateriaPrima: Yup.string().required(
    "Seleccione un lote de materia prima"
  ),
  empleadoVenta: Yup.string().required("Seleccione empleado"),
  monotMinimo: Yup.number().required("Monto minimo al lote requerido"),
  notas: Yup.string(),
});

function VentaBlocks() {
  const [error, setError] = useState("");

  const [employees, setEmployees] = useState([]);
  const [allExtractions, setAllExtractions] = useState([]);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get-employees`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const allEmployees = await response.json();
      console.log({ allEmployees });
      const employeeFormatData = allEmployees.data.map((employee) => {
        return {
          VALUE: employee.id_personal,
          TEXT: `${employee.P_nombre} ${employee.P_apellido}`,
        };
      });
      console.log({ employeeFormatData });

      setEmployees(employeeFormatData);
    };

    fetchAllEmployees();

    const fetchALlExtraction = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get-extraction-material-block`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const allExtractions = await response.json();
      console.log({ allExtractions });
      const formatAllExtraction = allExtractions.data.map((extraction) => {
        return {
          VALUE: extraction.id_extraccion,
          TEXT: `${extraction.materia_prima_label}:${extraction.id_extraccion} Q.${extraction.precio}`,
        };
      });
      console.log({ formatAllExtraction });

      setAllExtractions(formatAllExtraction);
    };

    fetchALlExtraction();
  }, []);

  const handleSubmit = (values) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/post-sales`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        response = await response.json();
        console.log(response);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <section className="main--form">
      <FormContent
        title="Venta de Blocks"
        initialValues={{
          extraccionMateriaPrima: "",
          empleadoVenta: "",
          monotMinimo: "",
          notas: "",
        }}
        recordSchema={recordSchema}
        cbSubmit={(values, actions) => {
          handleSubmit(values)
            .then((response) => {
              setError("Venta registrada");
              setTimeout(() => {
                setError("");
              }, 5000);
              actions.resetForm();
            })
            .catch((error) => {
              setError(error.message);
            });
        }}
      >
        <div className="form__inputs">
          <Select
            name="extraccionMateriaPrima"
            label="Materia prima"
            opions={allExtractions}
          />
          <Select
            name="empleadoVenta"
            label="Empleado encargado"
            opions={employees}
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

export default VentaBlocks;
