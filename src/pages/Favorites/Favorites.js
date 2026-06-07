import React from 'react';
import { Movie } from '../../components/Movie';
import { TvShow } from '../../components/TvShow';

const getSavedFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('moviesAppFavorites')) || [];
  } catch (error) {
    return [];
  }
};

export const Favorites = () => {
  const [favorites, setFavorites] = React.useState(getSavedFavorites());

  React.useEffect(() => {
    const refreshFavorites = () => setFavorites(getSavedFavorites());
    window.addEventListener('storage', refreshFavorites);
    window.addEventListener('favorites-updated', refreshFavorites);
    return () => {
      window.removeEventListener('storage', refreshFavorites);
      window.removeEventListener('favorites-updated', refreshFavorites);
    };
  }, []);

  const movies = favorites.filter((item) => item.media_type === 'movie');
  const shows = favorites.filter((item) => item.media_type === 'tv');

  return (
    <main className="page">
      <section className="search-panel">
        <div>
          <span className="eyebrow">Mi lista</span>
          <h1>Favoritos</h1>
          <p>Guardá películas y series con el corazón de cada card.</p>
        </div>
      </section>

      {!favorites.length && (
        <div className="status-card">
          <p>Todavía no guardaste favoritos. Tocá el corazón en una película o serie para armar tu lista.</p>
        </div>
      )}

      {!!movies.length && (
        <section>
          <div className="section-heading"><h2>Películas guardadas</h2></div>
          <div className="movie-container">
            {movies.map((movie) => <Movie key={`movie-${movie.id}`} {...movie} />)}
          </div>
        </section>
      )}

      {!!shows.length && (
        <section>
          <div className="section-heading"><h2>Series guardadas</h2></div>
          <div className="tv-container">
            {shows.map((show) => <TvShow key={`tv-${show.id}`} {...show} />)}
          </div>
        </section>
      )}
    </main>
  );
};
