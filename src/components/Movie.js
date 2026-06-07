import React from 'react';
import notAv from '../images/background.jpg';
import { MediaModal } from './MediaModal';

const IMG_API = 'https://image.tmdb.org/t/p/w500';
const FAVORITES_KEY = 'moviesAppFavorites';

const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch (error) {
    return [];
  }
};

const saveFavorites = (items) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('favorites-updated'));
};

export const Movie = ({ id, title, poster_path, overview, vote_average, release_date }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(() => getFavorites().some((item) => item.id === id && item.media_type === 'movie'));

  const year = release_date ? new Date(release_date).getFullYear() : 'Sin fecha';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
  const starWidth = vote_average ? `${Math.min(vote_average * 10, 100)}%` : '0%';

  const toggleFavorite = () => {
    const favorites = getFavorites();
    const exists = favorites.some((item) => item.id === id && item.media_type === 'movie');

    if (exists) {
      saveFavorites(favorites.filter((item) => !(item.id === id && item.media_type === 'movie')));
      setIsFavorite(false);
      return;
    }

    saveFavorites([
      ...favorites,
      { id, title, poster_path, overview, vote_average, release_date, media_type: 'movie' },
    ]);
    setIsFavorite(true);
  };

  return (
    <>
      <article className="media-card">
        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          type="button"
          onClick={toggleFavorite}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          ♥
        </button>

        <img src={poster_path ? IMG_API + poster_path : notAv} alt={title || 'Poster no disponible'} />
        <div className="media-card-content">
          <h3>{title}</h3>
          <div className="media-meta">
            <span>{year}</span>
            <span className="rating">★ {rating}</span>
          </div>
          <div className="star-meter" aria-label={`Puntaje ${rating}`}>
            <span style={{ width: starWidth }}>★★★★★</span>
            <strong>★★★★★</strong>
          </div>
          <button className="watch-button" type="button" onClick={() => setShowModal(true)}>
            Ver opciones
          </button>
        </div>
        <div className="overview">
          <h4>Sinopsis</h4>
          <p>{overview || 'No hay sinopsis disponible para este título.'}</p>
        </div>
      </article>

      {showModal && (
        <MediaModal id={id} mediaType="movie" title={title} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};
