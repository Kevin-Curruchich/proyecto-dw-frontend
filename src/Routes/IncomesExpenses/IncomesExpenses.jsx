import { useState } from "react";
import { BiFace } from "react-icons/bi";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormContent from "../../Components/Form/FormContent";
import Select from "../../Components/Select/Select";
import Header from "../../Components/Header/Header";
import Textarea from "../../Components/Textarea/Textarea";
import InputString from "../../Components/Input/InputString";
import "./IncomesExpenses.css";

const recordSchema = Yup.object().shape({
  type: Yup.string().required("Type?"),
  categorie: Yup.string().required("Categorie?"),
  description: Yup.string(),
  amount: Yup.number().required("Amount?"),
  schedule: Yup.date().required("Date required"),
});

export default function IncomesExpenses() {
  const [description, setDescription] = useState(false);
  const [resetDescription, setResetDescription] = useState(false);

  return (
    <>
      <Header dashboard />
      <main className="main--record">
        <FormContent
          title="My Accounts"
          initialValues={{
            type: "Income",
            categorie: "Job",
            description: "",
            amount: "",
            schedule: "",
          }}
          recordSchema={recordSchema}
          cbSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <div className="form__inputs">
            <div className="form__inputs--select">
              <Select name="type" label="Type" opions={["Income", "Expense"]} />
              <Select
                name="categorie"
                label="Categorie"
                opions={["Job", "Hobbies"]}
              />
            </div>
            {!description && (
              <button
                className="button--option border"
                onClick={() => {
                  setDescription((prev) => !prev);
                  setResetDescription(false);
                }}
              >
                Add Description
              </button>
            )}
            {description && (
              <>
                <Textarea
                  label="Description"
                  resetValue={resetDescription}
                  name="description"
                />
                <button
                  className="button--option border"
                  onClick={() => {
                    setDescription((prev) => !prev);
                    setResetDescription(true);
                  }}
                >
                  Hide Description
                </button>
              </>
            )}

            <InputString label="Amount" name="amount" type="number" />
            <InputString label="Schedule" name="schedule" type="date" />
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
