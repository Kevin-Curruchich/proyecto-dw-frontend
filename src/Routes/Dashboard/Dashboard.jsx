import { Link } from "react-router-dom";
import { BiFace, BiChevronRight, BiUser } from "react-icons/bi";
import Header from "../../Components/Header/Header";
import "./Dashboard.css";

const options = ["usd", "qtz"];

export default function Dashboard() {
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
      <main className="main--dashboard">
        <div className="dashboard">
          <div className="dashboard__header">
            <div className="balance">
              <h3 className="balance__title">Balance</h3>
              <p className="balance__mount">$3,000</p>
              <p className="balance__user">Kevin Curruchich</p>
            </div>
            <select name="currency" id="changeCurrencie">
              {options.map((opt) => (
                <option key={opt}>{opt.toUpperCase()}</option>
              ))}
            </select>
          </div>
          <p>
            Accounts <BiUser size="1rem" />
          </p>
          <div className="dashboard__accounts">
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
          <hr />
          <div className="dashboard__resume">
            <div className="dashboard__resume--incomes">
              <div className="dashboard__resume--title">
                <h4>Incomes</h4> <BiChevronRight />
              </div>
            </div>
            <div className="dashboard__resume--expenses">
              <div className="dashboard__resume--title">
                <h4>Expenses</h4>
                <BiChevronRight />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
