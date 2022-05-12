import { Routes, Route } from "react-router-dom";
import {
  Index,
  Login,
  Signup,
  Dashboard,
  IncomesExpenses,
  Transfers,
  MyAccounts,
} from "./Routes/index";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="record" element={<IncomesExpenses />} />
      <Route path="transfers" element={<Transfers />}>
        <Route index element={<MyAccounts />} />
        <Route path="thirds" element={<MyAccounts />} />
      </Route>
    </Routes>
  );
}

export default App;
