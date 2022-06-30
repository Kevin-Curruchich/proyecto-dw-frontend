import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { BiChevronRight, BiUser } from "react-icons/bi";
import Header from "../../Components/Header/Header";
import RecordCard from "../../Components/RecordCard/RecordCard";
import "./Dashboard.css";

export default function Dashboard() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [cookies] = useCookies(["auth_token"]);
  const [recordHistoryIncomes, setRecordHistoryIncomes] = useState([]);
  const [recordHistoryExpenses, setRecordHistoryExpenses] = useState([]);

  useEffect(() => {
    if (Object.entries(authCtx.currentUser).length === 0) {
      navigate("/", { replace: true });
    }

    //traer todos los records del usuario
    const fetchRecordHistory = async () => {
      const responseIncomes = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getrecordhistory/${cookies.auth_token}/1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );

      const { data: dataIncomes } = await responseIncomes.json();
      const lastRecordsIncomes = dataIncomes
        .sort((a, b) => new Date(b.RECORD_DATE) - new Date(a.RECORD_DATE))
        .slice(0, 2);
      setRecordHistoryIncomes(lastRecordsIncomes);

      const responseExpenses = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getrecordhistory/${cookies.auth_token}/2`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.auth_token}`,
          },
        }
      );

      const { data: dataExpenses } = await responseExpenses.json();
      const lastRecordsExpenses = dataExpenses
        .sort((a, b) => new Date(b.RECORD_DATE) - new Date(a.RECORD_DATE))
        .slice(0, 2);

      setRecordHistoryExpenses(lastRecordsExpenses);
    };
    fetchRecordHistory();
    authCtx.refreshBankAccounts();
  }, []);

  return (
    <>
      <Header dashboard />
      <main className="main--dashboard">
        <div className="dashboard">
          {authCtx.bankAccounts ? (
            <>
              <p>
                Accounts <BiUser size="1rem" />
              </p>
              <div className="dashboard__accounts">
                {authCtx.bankAccounts.map((bankAccount) => (
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
                <Link to="/history/incomes">
                  <h4>Incomes</h4>
                </Link>
                <BiChevronRight />
              </div>
              {recordHistoryIncomes.map((record) => (
                <RecordCard record={record} key={record.RECORD_HISTORY} />
              ))}
            </div>
            <div className="dashboard__resume--expenses dashboard__resume__record">
              <div className="dashboard__resume--title">
                <Link to="/history/expenses">
                  <h4>Expenses</h4>
                </Link>
                <BiChevronRight />
              </div>
              {recordHistoryExpenses.map((record) => (
                <RecordCard record={record} key={record.RECORD_HISTORY} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
