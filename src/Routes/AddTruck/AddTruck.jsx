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
  const [banks, setBanks] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBankNames = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getbanknames`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );
      const banks = await response.json();
      setBanks(banks);
    };

    const fetchCurrencies = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getcurrencies`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );
      const currencies = await response.json();
      setCurrencies(currencies);
    };

    fetchBankNames();
    fetchCurrencies();
  }, []);

  const handleAddBank = (cookieToken, truckBrand, tons, code) => {
    console.log("Ingresan variables");
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/addbank`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${cookies.auth_token}`,
            },
            credentials: "include",
            body: JSON.stringify({
              cookieToken: cookieToken,
              truckBrand: truckBrand,
              code: code,
              tons: tons,
            }),
          }
        );

        response = await response.json();
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
            handleAddBank(cookies.auth_token, truckBrand, tons, code)
              .then(async (response) => {
                await authCtx.refreshBankAccounts();
                resetForm();
                console.log(response);
              })
              .catch((e) => {
                setError("Error to add new bank");
              });
          }}
        >
          <div className="form__inputs">
            <Select name="truckBrand" label="Marca de camion" opions={banks} />
            <div className="form__inputs--column">
              <Select name="tons" label="Toneladas" opions={currencies} />
              <InputString label="Codigo unico" name="code" type="text" />
            </div>
          </div>
          {error && <p>{error}</p>}
          <div className="form__buttons--one">
            <button type="submit" className="button button--xlarge solid">
              Add
            </button>
          </div>
        </FormContent>
      </main>
    </>
  );
}

export default AddTruck;
