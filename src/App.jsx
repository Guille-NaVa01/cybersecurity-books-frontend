/* App.jsx — routing and auth guard */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage     from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddBookPage   from './pages/AddBookPage';

/** Redirects unauthenticated users to /login */
function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/dashboard"
        element={<PrivateRoute><DashboardPage /></PrivateRoute>}
      />
      <Route
        path="/add"
        element={<PrivateRoute><AddBookPage /></PrivateRoute>}
      />
      {/* Default redirect */}
      <Route path="*" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
