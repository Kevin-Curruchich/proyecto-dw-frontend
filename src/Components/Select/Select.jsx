import { Field } from "formik";
import "./Select.css";

export default function Select({ label = "", name, opions }) {
  return (
    <div className="form__input">
      <label htmlFor={name} className="form__input--label">
        {label}
      </label>
      <Field className="select" name={name} as="select">
        {opions.map((opt, i) => (
          <option key={opt} value={opt}>
            {opt.toUpperCase()}
          </option>
        ))}
      </Field>
    </div>
  );
}
