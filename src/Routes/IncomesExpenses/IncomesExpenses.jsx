import "./IncomesExpenses.css";
import { BiFace } from "react-icons/bi";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import FormRecord from "../../Components/FormRecord/FormRecord";

export default function IncomesExpenses() {
  return (
    <>
      <Header>
        <div className="header__buttons--dashboard">
          <Link to="">Dashboard</Link>
          <Link to="">Record</Link>
          <Link to="">Transfers</Link>
          <BiFace size="2.5rem" />
        </div>
      </Header>
      <main className="main--record">
        <FormRecord />
      </main>
    </>
  );
}
