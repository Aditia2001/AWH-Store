import { BrowserRouter, Routes, Route } from "react-router-dom";

import GuestRoute from "../components/common/GuestRoute";
import ProtectedRoute from "../components/common/ProtectedRoute";

import CustomerLayout from "../layouts/CustomerLayout";
import AdminLayout from "../layouts/AdminLayout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import LandingPage from "../pages/customer/LandingPage";
import OrderHistoryPage from "../pages/customer/OrderHistoryPage";
import OrderDetailPage from "../pages/customer/OrderDetailPage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminProductPage from "../pages/admin/AdminProductPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CustomerLayout>
              <LandingPage />
            </CustomerLayout>
          }
        />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <CustomerLayout>
                <LoginPage />
              </CustomerLayout>
            </GuestRoute>
          }
        />

        <Route
          path="/register"
          element={
            <GuestRoute>
              <CustomerLayout>
                <RegisterPage />
              </CustomerLayout>
            </GuestRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerLayout>
                <OrderHistoryPage />
              </CustomerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerLayout>
                <OrderDetailPage />
              </CustomerLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <AdminDashboardPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
                <AdminProductPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
