import React from 'react';
import { Movie } from '../../components/Movie';

const API_KEY = '600d38b9ea12ad8eed83670ed81d230c';
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

export const Search = () => {
  const [movies, setMovies] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [title, setTitle] = React.useState('Películas populares');

  const fetchMovies = async (url) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      setError('No se pudieron cargar los resultados.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMovies(FEATURED_API);
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();

    if (!query) {
      setTitle('Películas populares');
      fetchMovies(FEATURED_API);
      return;
    }

    setTitle(`Resultados para “${query}”`);
    fetchMovies(SEARCH_API + encodeURIComponent(query));
  };

  return (
    <main className="page">
      <section className="search-panel">
        <div>
          <span className="eyebrow">Movie search</span>
          <h1>Buscar películas</h1>
          <p>Escribí una película y presioná Enter.</p>
        </div>

        <form className="search-form" onSubmit={handleOnSubmit}>
          <input
            className="search-input"
            type="search"
            placeholder="Ej: Scream, Barbie, Matrix..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </section>

      <div className="section-heading">
        <h2>{title}</h2>
      </div>

      {loading && <div className="status-card"><p>Buscando películas...</p></div>}
      {error && <div className="status-card"><p>{error}</p></div>}
      {!loading && !error && movies.length === 0 && <div className="status-card"><p>No encontramos resultados.</p></div>}

      <div className="movie-container">
        {!loading && !error && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </main>
  );
};
