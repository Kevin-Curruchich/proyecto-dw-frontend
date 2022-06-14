import * as Yup from "yup";
import FormContent from "../../Components/Form/FormContent";
import Header from "../../Components/Header/Header";
import InputString from "../../Components/Input/InputString";
import Select from "../../Components/Select/Select";

const recordSchema = Yup.object().shape({
  bankName: Yup.string().required("Insert bank name"),
  typeAccount: Yup.string().required("Insert type account"),
  initialAmount: Yup.number()
    .required("Amount?")
    .positive("Positive number required"),
});

function AddAccount() {
  return (
    <>
      <Header dashboard />
      <main className="main--record">
        <FormContent
          title="Add bank account"
          initialValues={{
            bankName: "",
            typeAccount: "CHECKING",
            initialAmount: 0,
          }}
          recordSchema={recordSchema}
          cbSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <div className="form__inputs">
            <InputString label="Bank Name" name="bankName" type="text" />

            <Select
              name="typeAccount"
              label="Type account"
              opions={["checking", "saving"]}
            />
            <div className="form__inputs--column">
              <Select
                name="curriencie"
                label="Currencie"
                opions={["Q", "USD"]}
              />

              <InputString
                label="Initial amount"
                name="initialAmount"
                type="number"
              />
            </div>
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

export default AddAccount;
