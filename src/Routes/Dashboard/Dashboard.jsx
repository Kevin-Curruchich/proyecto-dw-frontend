import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { BiChevronRight, BiMoney } from "react-icons/bi";
import Header from "../../Components/Header/Header";
import RecordCard from "../../Components/RecordCard/RecordCard";
import "./Dashboard.css";

export default function Dashboard() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [cookies] = useCookies(["auth_token"]);
  const [recordHistoryIncomes, setRecordHistoryIncomes] = useState([]);
  const [recordHistoryExpenses, setRecordHistoryExpenses] = useState([]);

  // useEffect(() => {
  //   if (Object.entries(authCtx.currentUser).length === 0) {
  //     navigate("/", { replace: true });
  //   }

  //   //traer todos los records del usuario
  //   const fetchRecordHistory = async () => {
  //     const responseIncomes = await fetch(
  //       `${process.env.REACT_APP_BACKEND_URL}/getrecordhistory/${cookies.auth_token}/1`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${cookies.auth_token}`,
  //         },
  //       }
  //     );

  //     const { data: dataIncomes } = await responseIncomes.json();
  //     const lastRecordsIncomes = dataIncomes
  //       .sort((a, b) => new Date(b.RECORD_DATE) - new Date(a.RECORD_DATE))
  //       .slice(0, 2);
  //     setRecordHistoryIncomes(lastRecordsIncomes);

  //     const responseExpenses = await fetch(
  //       `${process.env.REACT_APP_BACKEND_URL}/getrecordhistory/${cookies.auth_token}/2`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${cookies.auth_token}`,
  //         },
  //       }
  //     );

  //     const { data: dataExpenses } = await responseExpenses.json();
  //     const lastRecordsExpenses = dataExpenses
  //       .sort((a, b) => new Date(b.RECORD_DATE) - new Date(a.RECORD_DATE))
  //       .slice(0, 2);

  //     setRecordHistoryExpenses(lastRecordsExpenses);
  //   };
  //   fetchRecordHistory();
  //   authCtx.refreshBankAccounts();
  // }, []);

  return (
    <>
      <Header dashboard />
      <main className="main--dashboard">
        <div className="dashboard">
          {authCtx.bankAccounts ? (
            <>
              <p>
                Presupuestos <BiMoney size="1rem" />
              </p>
              <div className="dashboard__accounts">
                {/* {authCtx.bankAccounts.map((bankAccount) => ( */}
                {[
                  {
                    giroNegocioId: "TP01",
                    moneda: "GTQ",
                    presupuesto: 3222,
                    giroNegocioNombre: "Mineria",
                  },
                ].map((bankAccount) => (
                  <div className="accounts__card" key={bankAccount.giroNegocio}>
                    <p className="accounts__card--mount">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: bankAccount.moneda,
                      }).format(bankAccount.presupuesto)}
                    </p>
                    <div className="accounts__card--bank">
                      <p>{bankAccount.giroNegocioNombre}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/addTruck", { replace: true });
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
                  <h4>Ventas materia prima</h4>
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
                  <h4>Alquiler transportes</h4>
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
