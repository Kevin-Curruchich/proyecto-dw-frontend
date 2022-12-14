import { Link, Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import "./Transfers.css";

export default function Transfers() {
  return (
    <>
      <Header dashboard />
      <main className="main--transfers">
        <div className="transfers__links">
          <Link to="/transfers">Pisos</Link>|<Link to="thirds">Blocks</Link>
        </div>
        <hr className="hr--completed" />
        <Outlet />
      </main>
    </>
  );
}
