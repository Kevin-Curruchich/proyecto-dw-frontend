import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import Header from "../../Components/Header/Header";
import "./index.css";

export default function Login() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.entries(authCtx.currentUser).length !== 0) {
      navigate("/dashboard", { replace: true });
    }
  }, []);
  return (
    <>
      <Header home />
      <main className="main--index">
        <h2 id="slogan">Spend, save and enjoy</h2>
        <p>The best place to organice your finances</p>
      </main>
    </>
  );
}
