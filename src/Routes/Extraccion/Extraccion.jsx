import { Link, Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import "./Extraccion.css";

export default function Extraccion() {
  return (
    <>
      <Header dashboard />
      <main className="main--transfers">
        <div className="transfers__links">
          <Link to="/extraction">Pisos</Link>|<Link to="blocks">Blocks</Link>
        </div>
        <hr className="hr--completed" />
        <Outlet />
      </main>
    </>
  );
}
