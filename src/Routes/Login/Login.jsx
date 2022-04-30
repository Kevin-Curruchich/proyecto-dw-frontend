import { Link } from "react-router-dom";
import logo from "../../Assets/myBudget.svg";
import "./login.css";

export default function Login() {
  return (
    <>
      <header>
        <Link to="/">
          <img id="header__logo" src={logo} alt="My budget logo" />
        </Link>
        <div className="header__buttons">
          <button className="button button--small border">Login</button>
          <button className="button button--large solid">SignUp</button>
        </div>
      </header>
      <main>
        <h2 id="slogan">Spend, save and enjoy</h2>
        <p>The best place to organice your finances</p>
      </main>
    </>
  );
}
