import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Add from "./Components/Add";
import Delete from "./Components/Delete";
import Edit from "./Components/Edit";
import View from "./Components/View";
import Details from "./Components/Details";
import Edited from "./Pages/Edited";
import Added from "./Pages/Added";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import AdminPage from "./Pages/AdminPage";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/homepage" element={<ProtectedRoute requiredRole="user"><HomePage /></ProtectedRoute>} />
        <Route path="/adminpage" element={<ProtectedRoute requiredRole="admin"><AdminPage /></ProtectedRoute>} />
        <Route path="/add" element={<Add />} />
        <Route path="/added" element={<Added />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/edited" element={<Edited />} />
        <Route path="/view" element={<View />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
