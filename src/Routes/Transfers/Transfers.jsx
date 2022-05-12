import { Link, Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import "./Transfers.css";

export default function Transfers() {
  return (
    <>
      <Header />
      <main className="main--transfers">
        <div className="transfers__links">
          <Link to="myaccounts">My Counts</Link>
          <Link to="thirds">Thirds</Link>
        </div>
        <hr className="hr--completed" />
        <Outlet />
      </main>
    </>
  );
}
