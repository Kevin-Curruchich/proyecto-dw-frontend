import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import "./index.css";

export default function Login() {
  const navigate = useNavigate();

  return (
    <>
      <Header>
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
      </Header>
      <main className="main--index">
        <h2 id="slogan">Spend, save and enjoy</h2>
        <p>The best place to organice your finances</p>
      </main>
    </>
  );
}
