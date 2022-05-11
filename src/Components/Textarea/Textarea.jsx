import { useField } from "formik";
import "./Textarea.css";

function Textarea({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="form__textarea">
      <label className="form__textarea--label" htmlFor={props.name}>
        {label}
      </label>
      <textarea className="form__textarea--input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <p className="form__textarea--error">{meta.error}</p>
      ) : null}
    </div>
  );
}

export default Textarea;
