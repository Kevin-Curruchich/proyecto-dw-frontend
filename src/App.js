import { Routes, Route } from "react-router-dom";
import {
  Index,
  Login,
  Signup,
  Dashboard,
  RentaTransporte,
  Transfers,
  VentaPisos,
  VentaBlocks,
  Extraccion,
  ExtraccionPisos,
  ExtraccionBlocks,
  AddTruck,
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
        <Route path="record" element={<RentaTransporte />} />
        <Route path="addTruck" element={<AddTruck />} />
        <Route path="transfers" element={<Transfers />}>
          <Route index element={<VentaPisos />} />
          <Route path="thirds" element={<VentaBlocks />} />
        </Route>
        <Route path="extraction" element={<Extraccion />}>
          <Route index element={<ExtraccionPisos />} />
          <Route path="blocks" element={<ExtraccionBlocks />} />
        </Route>
        <Route path="history/:typehistory" element={<History />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
