import { useField } from "formik";
import "./Textarea.css";

function Textarea({ label, resetValue, ...props }) {
  const [field, meta, helpers] = useField(props);

  if (resetValue) helpers.setValue("");

  return (
    <div className="form__textarea">
      <label className="form__textarea--label" htmlFor={props.name}>
        {label}
      </label>
      {/* {resetValue && helpers.setValue("")} */}
      <textarea className="form__textarea--input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <p className="form__textarea--error">{meta.error}</p>
      ) : null}
    </div>
  );
}

export default Textarea;
