import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../components/Movie';

const API_KEY = '600d38b9ea12ad8eed83670ed81d230c';
const IMG_API = 'https://image.tmdb.org/t/p/w780';
const POPULAR = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
const TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const TRENDING = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=es-AR`;

export const Home = () => {
  const [popularMovies, setPopularMovies] = React.useState([]);
  const [upcomingMovies, setUpcomingMovies] = React.useState([]);
  const [topRatedMovies, setTopRatedMovies] = React.useState([]);
  const [featuredMovie, setFeaturedMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const fetchHomeMovies = async () => {
      try {
        const [popularRes, upcomingRes, topRatedRes, trendingRes] = await Promise.all([
          fetch(POPULAR),
          fetch(UPCOMING),
          fetch(TOP_RATED),
          fetch(TRENDING),
        ]);

        if (!popularRes.ok || !upcomingRes.ok || !topRatedRes.ok || !trendingRes.ok) {
          throw new Error('No se pudieron cargar las películas.');
        }

        const [popularData, upcomingData, topRatedData, trendingData] = await Promise.all([
          popularRes.json(),
          upcomingRes.json(),
          topRatedRes.json(),
          trendingRes.json(),
        ]);

        setPopularMovies((popularData.results || []).slice(0, 10));
        setUpcomingMovies((upcomingData.results || []).slice(0, 10));
        setTopRatedMovies((topRatedData.results || []).slice(0, 10));
        setFeaturedMovie((trendingData.results || []).find((movie) => movie.poster_path) || null);
      } catch (err) {
        setError('No pudimos conectar con la API de películas. Probá de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeMovies();
  }, []);

  const featuredTitle = featuredMovie ? (featuredMovie.title || featuredMovie.name) : 'Película destacada';
  const featuredOverview = featuredMovie && featuredMovie.overview
    ? featuredMovie.overview
    : 'La película más vista o comentada de la semana se actualiza automáticamente con datos de TMDB.';
  const featuredYear = featuredMovie && featuredMovie.release_date
    ? new Date(featuredMovie.release_date).getFullYear()
    : '';
  const featuredRating = featuredMovie && featuredMovie.vote_average
    ? featuredMovie.vote_average.toFixed(1)
    : null;

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Trending semanal · actualizado por TMDB</span>
          <h1>Encontrá qué mirar hoy.</h1>
          <p>
            La película destacada cambia sola según lo más popular de la semana,
            así la app no queda congelada con un póster viejo.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/movie">Buscar películas</Link>
            <Link className="btn-secondary" to="/show">Buscar series</Link>
          </div>
        </div>

        <div className="hero-poster dynamic-hero-poster">
          {featuredMovie && featuredMovie.poster_path ? (
            <img src={IMG_API + featuredMovie.poster_path} alt={featuredTitle} />
          ) : (
            <div className="hero-placeholder">Cargando destacada...</div>
          )}
          <div className="hero-caption">
            <span className="hero-badge">Más vista ahora</span>
            <h2>{featuredTitle}{featuredYear && ` (${featuredYear})`}</h2>
            {featuredRating && <p className="hero-rating">★ {featuredRating} / 10</p>}
            <p>{featuredOverview}</p>
          </div>
        </div>
      </section>

      {loading && <div className="status-card"><p>Cargando películas...</p></div>}
      {error && <div className="status-card"><p>{error}</p></div>}

      {!loading && !error && (
        <>
          <section>
            <div className="section-heading">
              <div>
                <span className="eyebrow">Coming soon</span>
                <h2>Próximos estrenos</h2>
              </div>
              <p>Una selección de películas que están por llegar.</p>
            </div>
            <div className="movie-container">
              {upcomingMovies.map((movie) => <Movie key={movie.id} {...movie} />)}
            </div>
          </section>

          <section>
            <div className="section-heading">
              <div>
                <span className="eyebrow">Trending</span>
                <h2>Películas populares</h2>
              </div>
              <p>Títulos que están generando más interés ahora mismo.</p>
            </div>
            <div className="movie-container">
              {popularMovies.map((movie) => <Movie key={movie.id} {...movie} />)}
            </div>
          </section>

          <section>
            <div className="section-heading">
              <div>
                <span className="eyebrow">Top rated</span>
                <h2>Mejor puntuadas</h2>
              </div>
              <p>Clásicos y favoritas del público para guardar en tu lista.</p>
            </div>
            <div className="movie-container">
              {topRatedMovies.map((movie) => <Movie key={movie.id} {...movie} />)}
            </div>
          </section>
        </>
      )}
    </main>
  );
};
