import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import * as Yup from "yup";
import FormContent from "../../Components/Form/FormContent";
import Select from "../../Components/Select/Select";
import Header from "../../Components/Header/Header";
import Textarea from "../../Components/Textarea/Textarea";
import InputString from "../../Components/Input/InputString";
import "./Record.css";

const recordSchema = Yup.object().shape({
  bankAccount: Yup.string().required("Bank account is required"),
  type: Yup.string().required("Type?"),
  categorie: Yup.string().required("Categorie?"),
  description: Yup.string(),
  amount: Yup.number().required("Amount?").positive("Positive number required"),
  // date: Yup.date().required("Date required"),
});

export default function Record() {
  const [cookies] = useCookies(["auth_token"]);
  const [recordType, setRecordType] = useState([]);
  const [recordCategorie, setRecorCategorie] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);

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
      const banks = await response.json();
      setRecordType(banks);
    };

    const fetchBankAccounts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getbankaccounts/${cookies.auth_token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );
      let { bankAccounts } = await response.json();
      bankAccounts = bankAccounts.map((bankAccount) => ({
        VALUE: bankAccount.BANK_ACCOUNT,
        TEXT: `${bankAccount.BANK_ACCOUNT} - ${bankAccount.BANK_NAME}`,
      }));
      setBankAccounts(bankAccounts);
    };

    fetchTypeRecord();
    fetchBankAccounts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getcategories/1`,
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
  }, [recordType]);

  const handleSubmit = (values) => {
    return new Promise(async (resolve, reject) => {
      const bodyValues = JSON.stringify({
        bankAccount: values.bankAccount,
        category: Number(values.categorie),
        amount: Number(values.amount),
        description: values.description,
      });
      try {
        //validate if record is income
        if (Number(values.type) === 1) {
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
            type: "",
            categorie: "",
            description: "",
            amount: 0,
            // date: "",
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
              opions={bankAccounts}
            />
            <div className="form__inputs--column">
              <Select name="type" label="Type" opions={recordType} />
              <Select
                name="categorie"
                label="Categorie"
                opions={recordCategorie}
              />
            </div>

            <Textarea label="Description" name="description" />

            <InputString label="Amount" name="amount" type="number" />
            {/* <InputString label="Date" name="date" type="date" /> */}
          </div>
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
