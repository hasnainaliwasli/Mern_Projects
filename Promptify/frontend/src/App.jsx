import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import AdminRoute from './utils/AdminRoute';
import DashboardLayout from './layouts/DashboardLayout';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/user/Dashboard';
import Categories from './pages/user/Categories';
import CategoryDetail from './pages/user/CategoryDetail';
import Generate from './pages/user/Generate';
import Settings from './pages/user/Settings';
import AdminUsers from './pages/admin/Users';
import AdminPrompts from './pages/admin/Prompts';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected App */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout><Dashboard /></DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <DashboardLayout><Categories /></DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout><CategoryDetail /></DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/generate"
        element={
          <ProtectedRoute>
            <DashboardLayout><Generate /></DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout><Settings /></DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <DashboardLayout><AdminUsers /></DashboardLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/prompts"
        element={
          <AdminRoute>
            <DashboardLayout><AdminPrompts /></DashboardLayout>
          </AdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
