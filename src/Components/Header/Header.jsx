import { Link } from "react-router-dom";
import logo from "../../Assets/myBudget.svg";
import "./Header.css";

export default function Header({ children = null }) {
  return (
    <header>
      <Link to="/">
        <img id="header__logo" src={logo} alt="My budget logo" />
      </Link>
      {children}
    </header>
  );
}
