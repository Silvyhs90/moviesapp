import React from 'react';
import { TvShow } from '../../components/TvShow';

const API_KEY = '600d38b9ea12ad8eed83670ed81d230c';
const FEATURED_API = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=`;

export const SearchTv = () => {
  const [tvShows, setTvShows] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [title, setTitle] = React.useState('Series populares');

  const fetchShows = async (url) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setTvShows(data.results || []);
    } catch (err) {
      setError('No se pudieron cargar los resultados.');
      setTvShows([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchShows(FEATURED_API);
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();

    if (!query) {
      setTitle('Series populares');
      fetchShows(FEATURED_API);
      return;
    }

    setTitle(`Resultados para “${query}”`);
    fetchShows(SEARCH_API + encodeURIComponent(query));
  };

  return (
    <main className="page">
      <section className="search-panel">
        <div>
          <span className="eyebrow">TV search</span>
          <h1>Buscar series</h1>
          <p>Encontrá series populares o buscá una por nombre.</p>
        </div>

        <form className="search-form" onSubmit={handleOnSubmit}>
          <input
            className="search-input"
            type="search"
            placeholder="Ej: Friends, Breaking Bad, Dark..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </section>

      <div className="section-heading">
        <h2>{title}</h2>
      </div>

      {loading && <div className="status-card"><p>Buscando series...</p></div>}
      {error && <div className="status-card"><p>{error}</p></div>}
      {!loading && !error && tvShows.length === 0 && <div className="status-card"><p>No encontramos resultados.</p></div>}

      <div className="tv-container">
        {!loading && !error && tvShows.map((show) => <TvShow key={show.id} {...show} />)}
      </div>
    </main>
  );
};
