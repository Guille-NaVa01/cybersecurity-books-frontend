/* pages/AddBookPage.jsx */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';

const GENRES = ['Programming', 'Security', 'Architecture', 'DevOps', 'Otro'];

const INITIAL = { title: '', author: '', year: new Date().getFullYear(), genre: 'Programming' };

export default function AddBookPage() {
  const [form,    setForm]    = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error,   setError]   = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = { ...form, year: Number(form.year) };
      const { data } = await api.post('/books', payload);
      setSuccess(`✅ "${data.title}" agregado con id #${data.id}`);
      setForm(INITIAL);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError(err.response?.data?.detail || 'Error al agregar el libro.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Navbar />

      <main className="main-content">
        <section className="add-hero">
          <button className="btn-ghost" onClick={() => navigate('/dashboard')}>
            ← Volver al Dashboard
          </button>
          <h2 className="dashboard-heading">Agregar Libro</h2>
          <p className="dashboard-subheading">
            El JWT se enviará como Bearer Token en el header de esta solicitud.
          </p>
        </section>

        <div className="add-card">
          <form className="add-form" onSubmit={handleSubmit} id="add-book-form">

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title" className="form-label">Título *</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="form-input"
                  placeholder="El nombre del libro"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="author" className="form-label">Autor *</label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  className="form-input"
                  placeholder="Nombre del autor"
                  value={form.author}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="year" className="form-label">Año *</label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  className="form-input"
                  min="1800"
                  max="2099"
                  value={form.year}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="genre" className="form-label">Género *</label>
                <select
                  id="genre"
                  name="genre"
                  className="form-input form-select"
                  value={form.genre}
                  onChange={handleChange}
                  required
                >
                  {GENRES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            {success && (
              <div className="form-success" role="status">
                {success}
                <button
                  type="button"
                  className="btn-ghost form-success__link"
                  onClick={() => navigate('/dashboard')}
                >
                  Ver catálogo
                </button>
              </div>
            )}

            {error && (
              <div className="form-error" role="alert">
                <span>⚠️</span> {error}
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => navigate('/dashboard')}
              >
                Cancelar
              </button>
              <button
                type="submit"
                id="submit-add-book"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? <span className="btn-spinner" /> : 'Guardar libro'}
              </button>
            </div>

          </form>

          {/* JWT info box */}
          <div className="jwt-info-box">
            <h4>🔐 Flujo de autenticación</h4>
            <ol>
              <li>Login → Keycloak emite un JWT (RS256)</li>
              <li>El JWT se almacena en <code>localStorage</code></li>
              <li>El interceptor de Axios lo inyecta en cada request</li>
              <li>El backend valida la firma con la JWKS pública de Keycloak</li>
            </ol>
            <p>Revisa la consola del navegador para ver el token en cada solicitud.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
