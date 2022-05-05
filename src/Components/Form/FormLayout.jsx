import { Formik, Form } from "formik";
import InputString from "../../Components/Input/InputString";
import "./Form.css";
import "../../App.css";

export default function FormLayout({
  title,
  initialValues,
  validation,
  inputs,
  buttons,
}) {
  return (
    <div className="form">
      <h2 className="form__title">{title}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        className="form__main"
      >
        <Form className="form__main">
          <div className="form__inputs">
            {inputs.map((input) => (
              <InputString {...input} key={input.name} />
            ))}
          </div>
          <div className="form__buttons">
            {buttons.map(({ label, ...button }) => (
              <button key={label} {...button}>
                {label}
              </button>
            ))}
          </div>
        </Form>
      </Formik>
    </div>
  );
}
