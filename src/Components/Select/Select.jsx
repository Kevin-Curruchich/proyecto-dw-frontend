import { Field, useField } from "formik";
import "./Select.css";

export default function Select({ label = "", name, opions }) {
  opions = [{ VALUE: "", TEXT: "---" }, ...opions];
  const [field, meta] = useField(name);
  return (
    <div className="form__input">
      <label htmlFor={name} className="form__input--label">
        {label}
      </label>
      <Field className="select" name={name} as="select" {...field}>
        <>
          {opions.map((opt, i) => (
            <option key={opt.VALUE} value={opt.VALUE}>
              {opt.TEXT}
            </option>
          ))}
        </>
      </Field>
      {meta.touched && meta.error ? (
        <p className="form__input--error">{meta.error}</p>
      ) : null}
    </div>
  );
}

{
  /* <div>
            <input type="text" {...field} placeholder="First Name" />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </div> */
}

{
  /* {opions.map((opt, i) => (
          <option key={opt.VALUE} value={opt.VALUE}>
            {opt.TEXT}
          </option>
        ))} */
}
