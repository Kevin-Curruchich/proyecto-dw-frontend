import { Formik, Form } from "formik";
import InputString from "../Input/InputString";
import * as Yup from "yup";
import Select from "../Select/Select";
import Textarea from "../Textarea/Textarea";
import { useState } from "react";

const recordSchema = Yup.object().shape({
  type: Yup.string().required("Type?"),
  categorie: Yup.string().required("Categorie?"),
  description: Yup.string(),
  amount: Yup.number().required("Amount?"),
  schedule: Yup.date().required("Date required"),
});

function FormRecord() {
  const [description, setDescription] = useState(false);

  return (
    <div className="form record">
      <h2 className="form__title">Income/Expense</h2>
      <Formik
        initialValues={{
          type: "Income",
          categorie: "Job",
          description: "",
          amount: "",
          schedule: "",
        }}
        validationSchema={recordSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
        className="form__main"
      >
        {({ handleSubmit }) => (
          <Form className="form__main" onSubmit={handleSubmit}>
            <div className="form__inputs">
              <div className="form__inputs--select">
                <Select
                  name="type"
                  label="Type"
                  opions={["Income", "Expense"]}
                />
                <Select
                  name="categorie"
                  label="Categorie"
                  opions={["Job", "Hobbies"]}
                />
              </div>
              {!description && (
                <button
                  className="button--option border"
                  onClick={() => setDescription(true)}
                >
                  Add Description
                </button>
              )}
              {description && (
                <Textarea label="Description" name="description" />
              )}

              <InputString label="Amount" name="amount" type="number" />
              <InputString label="Schedule" name="schedule" type="date" />
            </div>
            <div className="form__buttons--one">
              <button type="submit" className="button button--xlarge solid">
                Add
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormRecord;
