import { useState } from "react";
import * as Yup from "yup";
import FormContent from "../../Components/Form/FormContent";
import Select from "../../Components/Select/Select";
import Header from "../../Components/Header/Header";
import Textarea from "../../Components/Textarea/Textarea";
import InputString from "../../Components/Input/InputString";
import "./Record.css";

const recordSchema = Yup.object().shape({
  type: Yup.string().required("Type?"),
  categorie: Yup.string().required("Categorie?"),
  description: Yup.string(),
  amount: Yup.number().required("Amount?").positive("Positive number required"),
  date: Yup.date().required("Date required"),
});

export default function Record() {
  const [description, setDescription] = useState(false);
  const [resetDescription, setResetDescription] = useState(false);

  return (
    <>
      <Header dashboard />
      <main className="main--record">
        <FormContent
          title="Record Income/Expense"
          initialValues={{
            type: "Income",
            categorie: "Job",
            description: "",
            amount: 0,
            date: "",
          }}
          recordSchema={recordSchema}
          cbSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <div className="form__inputs">
            <div className="form__inputs--column">
              <Select name="type" label="Type" opions={["Record", "Expense"]} />
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
            <InputString label="Date" name="date" type="date" />
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
