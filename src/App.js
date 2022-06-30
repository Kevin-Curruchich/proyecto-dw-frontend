import { Routes, Route } from "react-router-dom";
import {
  Index,
  Login,
  Signup,
  Dashboard,
  Record,
  Transfers,
  MyAccounts,
  Thirds,
  AddAccount,
  History,
} from "./Routes/index";
import AuthProvider from "./context/AuthProvier";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="record" element={<Record />} />
        <Route path="addbank" element={<AddAccount />} />
        <Route path="transfers" element={<Transfers />}>
          <Route index element={<MyAccounts />} />
          <Route path="thirds" element={<Thirds />} />
        </Route>
        <Route path="history/:typehistory" element={<History />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
