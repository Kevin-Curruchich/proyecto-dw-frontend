import { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import * as Yup from "yup";
import AuthContext from "../../context/auth-context";
import FormContent from "../../Components/Form/FormContent";
import Header from "../../Components/Header/Header";
import InputString from "../../Components/Input/InputString";
import Select from "../../Components/Select/Select";

const recordSchema = Yup.object().shape({
  truckBrand: Yup.string().required("Seleccione marca de camion"),
  tons: Yup.string().required("Seleccione toneladas"),
  code: Yup.string().required("Código del camion"),
});

function AddTruck() {
  const authCtx = useContext(AuthContext);
  const [cookies] = useCookies(["auth_token"]);
  const [truckBrands, setTruckBrands] = useState([]);
  const [truckTons, setTruckTons] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTruckBrands = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/gettruckbrands`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const truckBrands = await response.json();
      console.log({ truckBrands });
      const formatTrucksOptions = truckBrands.data.map((brand) => {
        return {
          VALUE: brand.truck_brand_id,
          TEXT: brand.truck_brand,
        };
      });
      console.log({ formatTrucksOptions });

      setTruckBrands(formatTrucksOptions);
    };

    const fetchTruckTons = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/gettrucktons`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const truckTonds = await response.json();
      console.log({ truckTonds });
      const formatTruckTons = truckTonds.data.map((tone) => {
        return {
          VALUE: tone.truck_ton_id,
          TEXT: tone.truck_tone_capacity,
        };
      });
      console.log({ formatTruckTons });

      setTruckTons(formatTruckTons);
    };

    fetchTruckBrands();
    fetchTruckTons();
  }, []);

  const handleAddTruck = (truckBrand, tons, code) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/addtruck`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${cookies.auth_token}`,
            },
            // credentials: "include",
            body: JSON.stringify({
              truckBrand: truckBrand,
              code: code,
              tons: tons,
            }),
          }
        );

        response = await response.json();
        console.log({ response });
        resolve(response);
      } catch (error) {
        setError(error);
        reject(error);
      }
    });
  };

  return (
    <>
      <Header dashboard />
      <main className="main--record">
        <FormContent
          title="Registrar Camiones"
          initialValues={{
            truckBrand: "",
            tons: "",
            code: "",
          }}
          recordSchema={recordSchema}
          cbSubmit={({ truckBrand, tons, code }, { resetForm }) => {
            handleAddTruck(truckBrand, tons, code)
              .then(async () => {
                // await authCtx.refreshBankAccounts();
                setError("Camion registrado correctamente");
                setTimeout(() => {
                  setError("");
                }, 5000);
                resetForm();
              })
              .catch((e) => {
                setError("Error al regitrar camion");
              });
          }}
        >
          <div className="form__inputs">
            <Select
              name="truckBrand"
              label="Marca de camion"
              opions={truckBrands}
            />
            <div className="form__inputs--column">
              <Select name="tons" label="Toneladas" opions={truckTons} />
              <InputString label="Codigo unico" name="code" type="text" />
            </div>
          </div>
          {error && <p>{error}</p>}
          <div className="form__buttons--one">
            <button type="submit" className="button button--xlarge solid">
              Registrar
            </button>
          </div>
        </FormContent>
      </main>
    </>
  );
}

export default AddTruck;
