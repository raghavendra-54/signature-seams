// src/App.js
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import MeasurementsPage from "./pages/MeasurementsPage";
import PaymentPage from "./pages/PaymentPage";
import ThankYouPage from "./pages/ThankYouPage";

function RequireAuth({ children }) {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  useEffect(() => {
    localStorage.removeItem("userId");
    localStorage.removeItem("phone");
    localStorage.removeItem("name");
  }, []);
  
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />

      <Route
        path="/products"
        element={
          <RequireAuth>
            <ProductsPage />
          </RequireAuth>
        }
      />

      <Route
        path="/products/:id"
        element={
          <RequireAuth>
            <ProductDetail />
          </RequireAuth>
        }
      />

      <Route
        path="/measurements"
        element={
          <RequireAuth>
            <MeasurementsPage />
          </RequireAuth>
        }
      />

      <Route
        path="/payment"
        element={
          <RequireAuth>
            <PaymentPage />
          </RequireAuth>
        }
      />

      <Route
        path="/thank-you"
        element={
          <RequireAuth>
            <ThankYouPage />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
