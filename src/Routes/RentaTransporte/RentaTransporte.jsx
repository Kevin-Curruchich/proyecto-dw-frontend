import { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
// import AuthContext from "../../context/auth-context";
import FormContent from "../../Components/Form/FormContent";
import Select from "../../Components/Select/Select";
import Header from "../../Components/Header/Header";
import Textarea from "../../Components/Textarea/Textarea";
import InputString from "../../Components/Input/InputString";
import "./Record.css";

const recordSchema = Yup.object().shape({
  idCamion: Yup.string().required("Seleccione un camion"),
  departamento: Yup.string().required("Seleccione un departamento"),
  categorie: Yup.string().required("Seleccione una categoria"),
  precioAlquiler: Yup.number()
    .required("Requerido")
    .positive("Numero debe ser positivo"),
  description: Yup.string(),
});

export default function Record() {
  // const authCtx = useContext(AuthContext);
  const [rentalType, setRentalType] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [allTrucks, setAllTrucks] = useState([]);
  const [error, setError] = useState("");

  //set fetch type records and bank accounts
  useEffect(() => {
    const fetchAllTrucks = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get-all-trucks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const allTrucks = await response.json();
      console.log({ allTrucks });
      const allTruckFormat = allTrucks.data.map((truck) => {
        return {
          VALUE: truck.TRUCK_UNIQUE_CODE,
          TEXT: `${truck.truck_brand}-${truck.TRUCK_UNIQUE_CODE}`,
        };
      });
      setAllTrucks([...allTruckFormat]);
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
      console.log({ allDepartments });
      const allDeparmentsFormat = allDepartments.data.map((department) => {
        return {
          VALUE: department.departament_id,
          TEXT: department.departament_label,
        };
      });
      setAllDepartments([...allDeparmentsFormat]);
    };

    const fetchRentalTrasnportTypes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get-transport-rental-types`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const allRentalTypes = await response.json();
      console.log({ allRentalTypes });
      const allRentalTypesFormat = allRentalTypes.data.map((rental) => {
        return {
          VALUE: rental.id_tipo_alquiler,
          TEXT: rental.tipo_alquiler_label,
        };
      });
      setRentalType([...allRentalTypesFormat]);
    };

    fetchDepartments();
    fetchAllTrucks();
    fetchRentalTrasnportTypes();
  }, []);

  //handle submit
  const handleSubmit = (values) => {
    return new Promise(async (resolve, reject) => {
      const bodyValues = JSON.stringify({
        idCamion: values.idCamion,
        departamento: values.departamento,
        category: values.categorie,
        precioAlquiler: Number(values.precioAlquiler),
        description: values.description,
      });
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/post-transport-rental`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: bodyValues,
          }
        );
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <>
      <Header dashboard />
      <main className="main--record">
        <FormContent
          title="Alquiler de transporte"
          initialValues={{
            idCamion: "",
            departamento: "",
            categorie: "",
            description: "",
            precioAlquiler: 0,
          }}
          recordSchema={recordSchema}
          cbSubmit={(values, { resetForm }) => {
            handleSubmit(values)
              .then(() => {
                setError("Alquiler registrado correctamente");
                setTimeout(() => {
                  setError("");
                }, 5000);
                resetForm();
              })
              .catch((e) => {
                setError("Error al regitrar alquiler");
              });
          }}
        >
          <div className="form__inputs">
            <Select name="idCamion" label="Camion" opions={allTrucks} />
            <div className="form__inputs--column">
              <div className="form__input">
                <Select
                  name="departamento"
                  label="Departamento"
                  opions={allDepartments}
                />
              </div>
              <Select name="categorie" label="Categoria" opions={rentalType} />
            </div>
            <InputString label="Precio" name="precioAlquiler" type="number" />
            <Textarea label="Description" name="description" />
          </div>
          {error && <p>{error}</p>}
          <div className="form__buttons--one">
            <button type="submit" className="button button--xlarge solid">
              Alquilar
            </button>
          </div>
        </FormContent>
      </main>
    </>
  );
}
