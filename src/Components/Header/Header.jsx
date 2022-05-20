import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/myBudget.svg";
import { BiFace } from "react-icons/bi";
import "./Header.css";

export default function Header(typeNav) {
  const navigate = useNavigate();

  let navHeader = null;

  if (typeNav.home) {
    navHeader = (
      <div className="header__buttons">
        <button
          onClick={() => navigate("/login")}
          className="button button--small border"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="button button--large solid"
        >
          SignUp
        </button>
      </div>
    );
  }

  if (typeNav.dashboard) {
    navHeader = (
      <div className="header__buttons--dashboard">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/record">Record</Link>
        <Link to="/transfers">Transfers</Link>
        <BiFace size="2.5rem" />
      </div>
    );
  }

  return (
    <header>
      <Link to="/">
        <img id="header__logo" src={logo} alt="My budget logo" />
      </Link>
      {navHeader}
    </header>
  );
}
