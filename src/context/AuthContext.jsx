/**
 * context/AuthContext.jsx
 *
 * Stores the JWT and the username across page navigations.
 * Login calls Keycloak's token endpoint directly using the
 * Resource Owner Password grant (enabled in the realm for dev/testing).
 */
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8081';
const REALM        = import.meta.env.VITE_KEYCLOAK_REALM || 'cybersecurity';
const CLIENT_ID    = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'fastapi-api';

const TOKEN_URL = `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token,    setToken]    = useState(() => localStorage.getItem('access_token') || null);
  const [username, setUsername] = useState(() => localStorage.getItem('username')     || null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const login = useCallback(async (usernameInput, password) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        grant_type: 'password',
        client_id:  CLIENT_ID,
        username:   usernameInput,
        password,
        scope:      'openid',
      });

      const response = await axios.post(TOKEN_URL, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const { access_token } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('username', usernameInput);
      setToken(access_token);
      setUsername(usernameInput);
      return true;
    } catch (err) {
      const msg = err.response?.data?.error_description || 'Credenciales incorrectas.';
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ token, username, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
