import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import * as Yup from "yup";
import AuthContext from "../../context/auth-context";
import FormContent from "../../Components/Form/FormContent";
import Select from "../../Components/Select/Select";
import Header from "../../Components/Header/Header";
import Textarea from "../../Components/Textarea/Textarea";
import InputString from "../../Components/Input/InputString";
import "./Record.css";

const recordSchema = Yup.object().shape({
  bankAccount: Yup.string().required("Bank account is required"),
  categorie: Yup.string().required("Select a Categorie"),
  description: Yup.string(),
  amount: Yup.number().required("Amount?").positive("Positive number required"),
});

export default function Record() {
  const authCtx = useContext(AuthContext);
  const [cookies] = useCookies(["auth_token"]);
  const [recordType, setRecordType] = useState([]);
  const [filterCategories, setFilterCategories] = useState(1);
  const [recordCategorie, setRecorCategorie] = useState([]);

  //set fetch type records and bank accounts
  useEffect(() => {
    const fetchTypeRecord = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getrecordtypes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );
      const recordTypes = await response.json();
      setRecordType(recordTypes);
    };

    fetchTypeRecord();
  }, []);

  //fetch categories after change record type
  useEffect(() => {
    const fetchCategories = async () => {
      const typeCategories = filterCategories || 1;
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getcategories/${typeCategories}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.auth_token}`,
          },
          credentials: "include",
        }
      );
      const categories = await response.json();
      setRecorCategorie(categories);
    };

    fetchCategories();
  }, [filterCategories]);

  //handle submit
  const handleSubmit = (values) => {
    console.log(filterCategories);
    return new Promise(async (resolve, reject) => {
      const bodyValues = JSON.stringify({
        bankAccount: values.bankAccount,
        category: Number(values.categorie),
        amount: Number(values.amount),
        description: values.description,
      });
      try {
        //validate if record is income
        if (filterCategories === 1) {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/recordincome`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${cookies.auth_token}`,
              },
              credentials: "include",
              body: bodyValues,
            }
          );
          const data = await response.json();
          return resolve(data);
        }
        //if not is icome we are going to record expense
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/recordexpense`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${cookies.auth_token}`,
            },
            credentials: "include",
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
          title="Record Income/Expense"
          initialValues={{
            bankAccount: "",
            categorie: "",
            description: "",
            amount: 0,
          }}
          recordSchema={recordSchema}
          cbSubmit={(values, actions) => {
            handleSubmit(values).then((data) => {
              actions.resetForm();
            });
          }}
        >
          <div className="form__inputs">
            <Select
              name="bankAccount"
              label="Bank Account"
              // opions={bankAccounts}
              opions={authCtx.bankAccounts}
            />
            <div className="form__inputs--column">
              <div className="form__input">
                <label className="form__input--label" htmlFor="date">
                  Record Type
                </label>
                <select
                  name="category"
                  className="select"
                  onChange={(e) => {
                    setFilterCategories(Number(e.target.value));
                  }}
                >
                  {recordType.map((category) => (
                    <option key={category.VALUE} value={category.VALUE}>
                      {category.TEXT}
                    </option>
                  ))}
                </select>
              </div>
              <Select
                name="categorie"
                label="Categorie"
                opions={recordCategorie}
              />
            </div>
            <Textarea label="Description" name="description" />

            <InputString label="Amount" name="amount" type="number" />
          </div>
          <div className="form__buttons--one">
            <button type="submit" className="button button--xlarge solid">
              Record
            </button>
          </div>
        </FormContent>
      </main>
    </>
  );
}

{
  /* <div className="form__inputs--column"> */
}
{
  /* <Select name="type" label="Type" opions={recordType} /> */
}
{
  /* </div> */
}
