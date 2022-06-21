import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { BiChevronRight, BiUser } from "react-icons/bi";
import Header from "../../Components/Header/Header";
import "./Dashboard.css";

export default function Dashboard() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.entries(authCtx.currentUser).length === 0) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <>
      <Header dashboard />
      <main className="main--dashboard">
        <div className="dashboard">
          <div className="dashboard__header">
            <div className="balance">
              <h3 className="balance__title">Balance</h3>
              <p className="balance__mount">$3,000</p>
              <p className="balance__user">Kevin Curruchich</p>
            </div>
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
                <Link to="/history/">
                  <h4>Incomes</h4>
                </Link>
                <BiChevronRight />
              </div>
            </div>
            <div className="dashboard__resume--expenses">
              <div className="dashboard__resume--title">
                <Link to="/expenses">
                  <h4>Expenses</h4>
                </Link>
                <BiChevronRight />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
