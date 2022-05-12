import Select from "../../Components/Select/Select";
import InputString from "../../Components/Input/InputString";
import FormContent from "../../Components/FormRecord/FormContent";
import Textarea from "../../Components/Textarea/Textarea";
import * as Yup from "yup";

const recordSchema = Yup.object().shape({
  origin: Yup.string().required("Origin?"),
  destination: Yup.string().required("Destination?"),
  amount: Yup.number().required("Amount?"),
  description: Yup.string(),
  schedule: Yup.date().required("Date required"),
});

function myAccounts() {
  return (
    <FormContent
      title="My Accounts"
      initialValues={{
        origin: "Keivin 3837",
        destination: "Keivin 3837",
        amount: "",
        description: "",
        schedule: "",
      }}
      recordSchema={recordSchema}
      cbSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <div className="form__inputs">
        <Select
          name="origin"
          label="Origin Account"
          opions={["Keivn 3837", "Kevin 1231"]}
        />
        <Select
          name="destination"
          label="Destination Account"
          opions={["Keivn 3837", "Kevin 1231"]}
        />
        <InputString label="Amount" name="amount" type="number" />
        <Textarea label="Description" name="description" />
        <InputString label="Schedule" name="schedule" type="date" />
      </div>
      <div className="form__buttons--one">
        <button type="submit" className="button button--xlarge solid">
          Transfer
        </button>
      </div>
    </FormContent>
  );
}

export default myAccounts;
