import { Link } from "react-router-dom";
import { BiFace } from "react-icons/bi";
import Header from "../../Components/Header/Header";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <>
      <Header>
        <div className="header__buttons--dashboard">
          <Link to="">Dashboard</Link>
          <Link to="">Incomes/Expenses</Link>
          <Link to="">Transfers</Link>
          <BiFace size="2.5rem" />
        </div>
      </Header>
      <main className="main--dashboard">
        <div className="main__balances">
          <div className="balance">
            <h3 className="balance__title">Balance</h3>
            <p className="balance__mount">$3,000</p>
            <p className="balance__user">Kevin Curruchich</p>
          </div>
          <p>Accounts</p>
          <div className="accounts">
            <div className="accounts__card">
              <p className="accounts__card--mount">$1,500</p>
              <p className="accounts__card--banc">Gyt Continental</p>
            </div>
            <div className="accounts__card">
              <p className="accounts__card--mount">$1,500</p>
              <p className="accounts__card--banc">Gyt Continental</p>
            </div>
            <div className="accounts__card">
              <p className="accounts__card--mount">$1,500</p>
              <p className="accounts__card--banc">Banco Industrial</p>
            </div>
          </div>
        </div>
        <hr />
      </main>
    </>
  );
}
