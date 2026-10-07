/* pages/DashboardPage.jsx */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import api from '../api/axios';

export default function DashboardPage() {
  const [books,    setBooks]    = useState([]);
  const [username, setUsername] = useState('');
  const [total,    setTotal]    = useState(0);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/books');
      setBooks(data.books);
      setTotal(data.total);
      setUsername(data.username ?? '');
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('No se pudo cargar el catálogo. ¿Está el servidor activo?');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <Navbar />

      <main className="main-content">
        {/* Hero */}
        <section className="dashboard-hero">
          <div>
            <h2 className="dashboard-heading">
              Catálogo de Libros
            </h2>
            <p className="dashboard-subheading">
              Bienvenido, <strong>{username}</strong> · {total} título{total !== 1 ? 's' : ''} disponible{total !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            id="add-book-btn"
            className="btn-primary"
            onClick={() => navigate('/add')}
          >
            + Agregar libro
          </button>
        </section>

        {/* States */}
        {loading && (
          <div className="state-center">
            <div className="spinner" />
            <p>Cargando catálogo…</p>
          </div>
        )}

        {error && !loading && (
          <div className="state-error">
            <span>⚠️</span>
            <p>{error}</p>
            <button className="btn-ghost" onClick={fetchBooks}>Reintentar</button>
          </div>
        )}

        {/* Book grid */}
        {!loading && !error && (
          <>
            {books.length === 0 ? (
              <div className="state-empty">
                <span>📭</span>
                <p>No hay libros en el catálogo todavía.</p>
                <button className="btn-primary" onClick={() => navigate('/add')}>
                  Agregar el primero
                </button>
              </div>
            ) : (
              <div className="books-grid">
                {books.map((book, i) => (
                  <BookCard key={book.id} book={book} index={i} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
