import { Routes, Route } from "react-router-dom";
import { Index, Login, Signup, Dashboard } from "./Routes/index";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
