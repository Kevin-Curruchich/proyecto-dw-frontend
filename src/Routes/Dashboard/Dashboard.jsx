import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { BiChevronRight, BiUser } from "react-icons/bi";
import Header from "../../Components/Header/Header";
import "./Dashboard.css";

export default function Dashboard() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [cookies] = useCookies(["auth_token"]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [recordHistory, setRecordHistory] = useState([]);

  useEffect(() => {
    if (Object.entries(authCtx.currentUser).length === 0) {
      navigate("/", { replace: true });
    }

    //traer todas las cuentas del usuario
    const fetchBankAccounts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getbankaccounts/${cookies.auth_token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );
      const { bankAccounts } = await response.json();
      setBankAccounts(bankAccounts);
    };
    fetchBankAccounts();

    //traer todos los records del usuario
    const fetchRecordHistory = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getrecordhistory/${cookies.auth_token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );
      const { data } = await response.json();
      setRecordHistory(data);
    };
    fetchRecordHistory();
  }, []);

  return (
    <>
      <Header dashboard />
      <main className="main--dashboard">
        <div className="dashboard">
          {bankAccounts ? (
            <>
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
                {bankAccounts.map((bankAccount) => (
                  <div
                    className="accounts__card"
                    key={bankAccount.BANK_ACCOUNT}
                  >
                    <p className="accounts__card--mount">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: bankAccount.CURRENCIE,
                      }).format(bankAccount.AMOUNT)}
                    </p>
                    <div className="accounts__card--bank">
                      <p>{bankAccount.BANK_NAME}</p>
                      <p>{bankAccount.BANK_ACCOUNT}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/addbank", { replace: true });
              }}
              className="button solid"
            >
              Add bank Account
            </button>
          )}
          <hr />
          <div className="dashboard__resume">
            <div className="dashboard__resume--incomes dashboard__resume__record">
              <div className="dashboard__resume--title">
                <Link to="/history/">
                  <h4>Incomes</h4>
                </Link>
                <BiChevronRight />
              </div>
              {recordHistory
                .filter((record) => record.RECORD_TYPE === 1)
                .sort(
                  (a, b) => new Date(b.RECORD_DATE) - new Date(a.RECORD_DATE)
                )
                .map((record) => (
                  <div
                    className="dashboard__resume--record"
                    key={record.RECORD_HISTORY}
                  >
                    <p className="resume__record--amount income">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: record.CURRENCIE_SYMBOL,
                      }).format(record.AMOUNT)}
                    </p>
                    <p>{record.DESCRIPTION}</p>
                    <p>{record.BANK_ACCOUNT}</p>
                    <p>
                      {new Intl.DateTimeFormat("en-US").format(
                        new Date(record.RECORD_DATE)
                      )}
                    </p>
                  </div>
                ))}
            </div>
            <div className="dashboard__resume--expenses dashboard__resume__record">
              <div className="dashboard__resume--title">
                <Link to="/history">
                  <h4>Expenses</h4>
                </Link>
                <BiChevronRight />
              </div>
              {recordHistory
                .filter((record) => record.RECORD_TYPE === 2)
                .sort(
                  (a, b) => new Date(b.RECORD_DATE) - new Date(a.RECORD_DATE)
                )
                .map((record) => (
                  <div
                    className="dashboard__resume--record"
                    key={record.RECORD_HISTORY}
                  >
                    <p className="resume__record--amount expense">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: record.CURRENCIE_SYMBOL,
                      }).format(record.AMOUNT)}
                    </p>
                    <p>{record.DESCRIPTION}</p>
                    <p>{record.BANK_ACCOUNT}</p>
                    <p>
                      {new Intl.DateTimeFormat("en-US").format(
                        new Date(record.RECORD_DATE)
                      )}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
