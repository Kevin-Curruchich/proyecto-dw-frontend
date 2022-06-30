import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import logo from "../../Assets/myBudget.svg";
import { BiCaretDown } from "react-icons/bi";
import "./Header.css";

export default function Header(typeNav) {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const logoutHandle = async () => {
    try {
      await authCtx.logout();
      navigate("/", { replace: true });
    } catch (error) {
      setError("Error to logout");
    }
  };

  let navHeader = null;
  // (
  //   <div className="header__buttons--dashboard">
  //     <Link to="/dashboard">Dashboard</Link>
  //     <Link to="/record">Record</Link>
  //     <Link to="/transfers">Transfers</Link>
  //     <div className="header__buttons--profile dropdown">
  //       {`${authCtx.currentUser.first_name} ${authCtx.currentUser.last_name}`.toUpperCase()}{" "}
  //       <BiCaretDown />
  //       <ul className="dropdown-content">
  //         <li className="dropdown-content-item">
  //           <Link to="/addbank">Add bank account</Link>
  //         </li>
  //         <li className="dropdown-content-item">
  //           <button
  //             onClick={logoutHandle}
  //             className="button button--large border"
  //           >
  //             Logout
  //           </button>
  //         </li>
  //       </ul>
  //     </div>
  //   </div>
  // );

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
        <div className="header__buttons--profile dropdown">
          {`${authCtx.currentUser.first_name} ${authCtx.currentUser.last_name}`.toUpperCase()}{" "}
          <BiCaretDown />
          <ul className="dropdown-content">
            <li className="dropdown-content-item">
              <Link to="/addbank">Add bank account</Link>
            </li>
            <li className="dropdown-content-item">
              <button
                onClick={logoutHandle}
                className="button button--large border"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <header>
      <Link to={`/${typeNav.dashboard ? "dashboard" : ""}`}>
        <img id="header__logo" src={logo} alt="My budget logo" />
      </Link>
      {navHeader}
    </header>
  );
}
