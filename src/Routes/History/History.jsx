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
  const [lessThan, setLessThan] = useState("");
  const [filters, setFilters] = useState({
    category: 0,
    bankAccount: "",
    date: "",
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
      let { data } = await response.json();

      data = data.map((record) => {
        return {
          ...record,
          RECORD_DATE: new Intl.DateTimeFormat("en-US").format(
            new Date(record.RECORD_DATE)
          ),
        };
      });

      setRecordHistory(data);
      setRecordHistoryFiltered(data);
    };

    fetchCategories();
    fetchRecordHistory();
  }, []);

  //cambio filtros
  useEffect(() => {
    // console.log(recordHistory);
    //without filters
    if (
      filters.category === 0 &&
      filters.bankAccount === "" &&
      filters.date === ""
    ) {
      setRecordHistoryFiltered(recordHistory);
    }

    //filted by category
    if (
      filters.category !== 0 &&
      filters.bankAccount === "" &&
      filters.date === ""
    ) {
      const filterdByCategory = recordHistory.filter(
        (record) => record.CATEGORY === filters.category
      );

      setRecordHistoryFiltered(filterdByCategory);
    }

    //filted by bankAccount
    if (
      filters.bankAccount !== "" &&
      filters.category === 0 &&
      filters.date === ""
    ) {
      const filterdByBankAccount = recordHistory.filter(
        (record) => record.BANK_ACCOUNT === filters.bankAccount
      );

      setRecordHistoryFiltered(filterdByBankAccount);
    }

    //filted by date
    if (
      filters.date !== "" &&
      filters.category === 0 &&
      filters.category === 0
    ) {
      const filterdByDate = recordHistory.filter(
        (record) =>
          record.RECORD_DATE >= filters.date && record.RECORD_DATE < lessThan
      );

      setRecordHistoryFiltered(filterdByDate);
    }

    //filted by 3 filters
    if (
      filters.category !== 0 &&
      filters.bankAccount !== "" &&
      filters.date !== ""
    ) {
      const filterdByCategoryAndBankAccount = recordHistory.filter(
        (record) =>
          record.BANK_ACCOUNT === filters.bankAccount &&
          record.CATEGORY === filters.category &&
          record.RECORD_DATE >= filters.date &&
          record.RECORD_DATE < lessThan
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
                if (e.target.value === "")
                  return setFilters({ ...filters, date: "" });
                const dateSplited = e.target.value.split("-");
                const realDate = `${dateSplited[1]}-${dateSplited[2]}-${dateSplited[0]}`;
                setFilters({
                  ...filters,
                  date: new Intl.DateTimeFormat("en-US").format(
                    new Date(realDate)
                  ),
                });
                setLessThan(
                  new Intl.DateTimeFormat("en-US").format(
                    new Date(
                      `${dateSplited[1]}-${Number(dateSplited[2]) + 1}-${
                        dateSplited[0]
                      }`
                    )
                  )
                );
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
