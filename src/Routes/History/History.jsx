import { useEffect, useLayoutEffect, useState, useContext } from "react";
import { BiLineChart, BiLineChartDown } from "react-icons/bi";
import AuthContext from "../../context/auth-context";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import RecordCard from "../../Components/RecordCard/RecordCard";
import "./History.css";

const History = () => {
  const authCtx = useContext(AuthContext);
  const { typehistory } = useParams();
  const [recordCategories, setRecorCategorie] = useState([]);
  const [cookies] = useCookies(["auth_token"]);
  const [recordHistory, setRecordHistory] = useState([]);
  const [recordHistoryFiltered, setRecordHistoryFiltered] = useState([]);
  const [changeRecordHistory, setChangeRecordHistory] = useState([]);
  const [filters, setFilters] = useState({
    category: 0,
    bankAccount: "",
    date: new Date(),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const typeCategories = typehistory === "incomes" ? 1 : 2;
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getcategories/${typeCategories}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.auth_token}`,
          },
          credentials: "include",
        }
      );
      let categories = await response.json();
      categories = [{ VALUE: 0, TEXT: "---" }, ...categories];
      setRecorCategorie(categories);
    };

    const fetchRecordHistory = async () => {
      const typeCategories = typehistory === "incomes" ? 1 : 2;
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getrecordhistory/${cookies.auth_token}/${typeCategories}`,
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
      setRecordHistoryFiltered(data);
    };

    fetchCategories();
    fetchRecordHistory();
  }, []);

  //cambio filtros
  useEffect(() => {
    console.log(filters);
    if (filters.category === 0 && filters.bankAccount === "") {
      console.log("Sin filtros");
      setRecordHistoryFiltered(recordHistory);
    }

    if (filters.bankAccount === "" && filters.category !== 0) {
      const filterdByCategory = recordHistory.filter(
        (record) => record.CATEGORY === filters.category
      );

      setRecordHistoryFiltered(filterdByCategory);
    }

    if (filters.category === 0 && filters.bankAccount !== "") {
      const filterdByBankAccount = recordHistory.filter(
        (record) => record.BANK_ACCOUNT === filters.bankAccount
      );

      setRecordHistoryFiltered(filterdByBankAccount);
    }

    if (filters.category !== 0 && filters.bankAccount !== "") {
      console.log("Entra por dos filtros");
      const filterdByCategoryAndBankAccount = recordHistory.filter(
        (record) =>
          record.BANK_ACCOUNT === filters.bankAccount &&
          record.CATEGORY === filters.category
      );

      setRecordHistoryFiltered(filterdByCategoryAndBankAccount);
    }

    // console.log("Record history filtered", recordHistoryFiltered);
  }, [filters]);

  return (
    <>
      <Header dashboard />
      <main>
        <div className="main__options">
          <div className="form__input">
            <label className="form__input--label" htmlFor="date">
              Date
            </label>
            <input
              id="startDate"
              className="form__input--input fit"
              type="date"
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  date: e.target.value,
                }));
              }}
            />
          </div>
          <div className="form__input">
            <label className="form__input--label" htmlFor="date">
              Category
            </label>
            <select
              name="category"
              className="fit"
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  category: Number(e.target.value),
                }));
              }}
            >
              {recordCategories.map((category) => (
                <option key={category.VALUE} value={category.VALUE}>
                  {category.TEXT}
                </option>
              ))}
            </select>
          </div>
          <div className="form__input">
            <label className="form__input--label" htmlFor="date">
              Bank Account
            </label>
            <select
              name="category"
              className="fit"
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  bankAccount: e.target.value,
                }));
              }}
            >
              {[{ VALUE: "", TEXT: "---" }, ...authCtx.bankAccounts].map(
                (category) => (
                  <option key={category.VALUE} value={category.VALUE}>
                    {category.TEXT}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        {typehistory && (
          <p
            className={`history__title ${
              typehistory === "incomes" ? "income" : "expense"
            } `}
          >
            {typehistory.toUpperCase()}{" "}
            {typehistory === "incomes" ? <BiLineChart /> : <BiLineChartDown />}
          </p>
        )}
        <div className="history__records">
          {recordHistoryFiltered.map((record) => (
            <RecordCard key={record.RECORD_HISTORY} record={record} />
          ))}
        </div>
      </main>
    </>
  );
};

export default History;
