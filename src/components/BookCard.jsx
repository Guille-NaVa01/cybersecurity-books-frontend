/* components/BookCard.jsx */
const GENRE_COLORS = {
  Programming:  '#00d4ff',
  Security:     '#f43f5e',
  Architecture: '#a78bfa',
  DevOps:       '#34d399',
  Default:      '#fb923c',
};

export default function BookCard({ book, index }) {
  const color = GENRE_COLORS[book.genre] || GENRE_COLORS.Default;

  return (
    <article
      className="book-card"
      style={{ '--accent': color, animationDelay: `${index * 60}ms` }}
    >
      <div className="book-card__spine" style={{ background: color }} />
      <div className="book-card__body">
        <span className="book-card__genre" style={{ color }}>
          {book.genre}
        </span>
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
        <div className="book-card__footer">
          <span className="book-card__year">{book.year}</span>
          <span className="book-card__id">#{book.id}</span>
        </div>
      </div>
    </article>
  );
}
