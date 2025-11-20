// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Halaman auth
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";

// Halaman di dalam layout
import Profile from "./pages/Profile";

import Layout from "./components/Layout";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman tanpa Sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-success" element={<RegisterSuccess />} />

        {/* Redirect default */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
