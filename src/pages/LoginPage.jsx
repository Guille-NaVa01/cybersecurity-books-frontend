/* pages/LoginPage.jsx */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(form.username, form.password);
    if (ok) navigate('/dashboard');
  };

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="login-bg">
        <div className="login-bg__circle login-bg__circle--1" />
        <div className="login-bg__circle login-bg__circle--2" />
        <div className="login-bg__grid" />
      </div>

      <div className="login-card">
        {/* Header */}
        <div className="login-card__header">
          <div className="login-logo">📚</div>
          <h1 className="login-title">BookVault</h1>
          <p className="login-subtitle">
            Autenticación segura vía&nbsp;
            <span className="login-highlight">LDAP + Keycloak</span>
          </p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-input"
              placeholder="alice"
              value={form.username}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className="form-error" role="alert">
              <span>⚠️</span> {error}
            </div>
          )}

          <button
            type="submit"
            id="login-submit-btn"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? (
              <span className="btn-spinner" />
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        {/* Footer hint */}
        <p className="login-hint">
          Usuarios de prueba: <code>alice / alice123</code> · <code>bob / bob123</code>
        </p>
      </div>
    </div>
  );
}
