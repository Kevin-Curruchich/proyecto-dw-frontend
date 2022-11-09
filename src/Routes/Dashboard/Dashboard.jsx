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
  const [primarySales, setPrimarySales] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [transportalRental, setTransportalRental] = useState([]);

  useEffect(() => {
    // if (Object.entries(authCtx.currentUser).length === 0) {
    //   navigate("/", { replace: true });
    // }

    //traer todos los records del usuario
    const fetchAllBudgets = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get-budget`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const budgets = await response.json();
      console.log({ budgets });
      const formatBudgetOption = budgets.data.map((budget) => {
        return {
          ...budget,
          moneda: "GTQ",
        };
      });
      console.log({ formatBudgetOption });

      setBudgets(formatBudgetOption);
    };
    fetchAllBudgets();

    const fetchAllTransportRental = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get-all-transport-rental`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const allRental = await response.json();
      const formatAllRental = allRental.data.map((rental) => {
        return {
          ...rental,
          moneda: "GTQ",
        };
      });
      console.log({ formatAllRental });

      setTransportalRental(formatAllRental);
    };
    fetchAllTransportRental();
    // authCtx.refreshBankAccounts();
  }, []);

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
                {budgets.map((aBudget) => (
                  <div className="accounts__card" key={aBudget.id_prespuesto}>
                    <p className="accounts__card--mount">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: aBudget.moneda,
                      }).format(aBudget.presupuesto)}
                    </p>
                    <div className="accounts__card--bank">
                      <p>{aBudget.C_descrpcion}</p>
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
              {primarySales.map((record) => (
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
              {transportalRental.map((record) => (
                <RecordCard record={record} key={record.RECORD_HISTORY} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
