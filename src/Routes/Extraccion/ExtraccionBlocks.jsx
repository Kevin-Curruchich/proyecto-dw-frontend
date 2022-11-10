import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Select from "../../Components/Select/Select";
import InputString from "../../Components/Input/InputString";
import FormContent from "../../Components/Form/FormContent";
import Textarea from "../../Components/Textarea/Textarea";
import * as Yup from "yup";

const recordSchema = Yup.object().shape({
  materiaPrima: Yup.string().required("Seleccione un lote de materia prima"),
  departamento: Yup.string().required("Seleccione ubicacion"),
  empleadoVenta: Yup.string().required("Seleccione empleado"),
  monotMinimo: Yup.number().required("Monto minimo al lote requerido"),
  notas: Yup.string(),
});

function ExtraccionBlocks() {
  const [cookies] = useCookies(["auth_token"]);
  const [error, setError] = useState("");
  const [rawMaterial, setRawMaterial] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

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

    const fetchDepartments = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get-departments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const allDepartments = await response.json();
      // console.log({ allDepartments });
      const allDeparmentsFormat = allDepartments.data.map((department) => {
        return {
          VALUE: department.departament_id,
          TEXT: department.departament_label,
        };
      });
      setAllDepartments([...allDeparmentsFormat]);
    };

    const rawMaterial = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get-raw-material-block`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const allMaterial = await response.json();
      // console.log({ allMaterial });
      const allMaterialFormat = allMaterial.data.map((material) => {
        return {
          VALUE: material.id_materias_prima,
          TEXT: material.materia_prima_label,
        };
      });
      setRawMaterial([...allMaterialFormat]);
    };

    fetchAllEmployees();
    fetchDepartments();
    rawMaterial();
  }, []);

  const handleSubmit = (values) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/post-extraction`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(values),
          }
        );
        response = await response.json();
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
          materiaPrima: "",
          empleadoVenta: "",
          departamento: "",
          monotMinimo: "",
          notas: "",
        }}
        recordSchema={recordSchema}
        cbSubmit={(values, actions) => {
          handleSubmit(values)
            .then(() => {
              setError("Extraccion registrado");
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
            name="materiaPrima"
            label="Materia prima"
            opions={rawMaterial}
          />
          <Select
            name="departamento"
            label="Ubicacion"
            opions={allDepartments}
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
            Registrar
          </button>
        </div>
      </FormContent>
    </section>
  );
}

export default ExtraccionBlocks;
