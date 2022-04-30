import { Routes, Route } from "react-router-dom";
import { Login } from "./Routes/index";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
