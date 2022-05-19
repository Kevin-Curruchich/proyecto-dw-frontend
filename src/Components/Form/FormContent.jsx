import { Formik, Form } from "formik";
import "../Form/Form.css";

function FormContent({
  title,
  initialValues,
  recordSchema,
  cbSubmit,
  children,
}) {
  return (
    <div className="form">
      <h2 className="form__title">{title}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={recordSchema}
        onSubmit={cbSubmit}
        className="form__main"
      >
        {({ handleSubmit }) => (
          <Form className="form__main" onSubmit={handleSubmit}>
            {children}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormContent;
