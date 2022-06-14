import { useField } from "formik";
import "./Input.css";

export default function InputString({ label, largeInput, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="form__input">
      <label className="form__input--label" htmlFor={props.name}>
        {label}
      </label>
      <input
        className={`form__input--input ${largeInput}`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <p className="form__input--error">{meta.error}</p>
      ) : null}
    </div>
  );
}
