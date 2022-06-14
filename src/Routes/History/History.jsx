import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import "./History.css";

const History = () => {
  return (
    <>
      <Header dashboard />
      <main>
        <div className="main__options">
          <div className="form__input">
            <label className="form__input--label" htmlFor="date">
              Date
            </label>
            <input id="date" className="form__input--input fit" type="date" />
          </div>
          <div className="form__input">
            <label className="form__input--label" htmlFor="date">
              Category
            </label>
            <select name="category" className="fit">
              <option>primera</option>
              <option>segunda</option>
              <option>tercera</option>
            </select>
          </div>
        </div>
        <Outlet />
      </main>
    </>
  );
};

export default History;
