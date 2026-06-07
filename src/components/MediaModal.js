import React from 'react';

const API_KEY = '600d38b9ea12ad8eed83670ed81d230c';
const PROVIDER_LOGO = 'https://image.tmdb.org/t/p/w92';

const getTrailer = (videos) => {
  const list = videos || [];
  return list.find((video) => video.site === 'YouTube' && video.type === 'Trailer') ||
    list.find((video) => video.site === 'YouTube');
};

export const MediaModal = ({ id, mediaType, title, onClose }) => {
  const [providers, setProviders] = React.useState(null);
  const [trailer, setTrailer] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError('');

      try {
        const [providersRes, videosRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${API_KEY}&language=en-US`),
        ]);

        const providersData = await providersRes.json();
        const videosData = await videosRes.json();

        setProviders(providersData.results && providersData.results.AR ? providersData.results.AR : null);
        setTrailer(getTrailer(videosData.results));
      } catch (err) {
        setError('No pudimos cargar las opciones para ver este título.');
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id, mediaType]);

  React.useEffect(() => {
    const closeWithEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', closeWithEscape);
    return () => document.removeEventListener('keydown', closeWithEscape);
  }, [onClose]);

  const renderProviderGroup = (label, items) => {
    if (!items || !items.length) return null;

    return (
      <div className="provider-group">
        <h4>{label}</h4>
        <div className="provider-list">
          {items.slice(0, 8).map((provider) => (
            <div className="provider-pill" key={`${label}-${provider.provider_id}`} title={provider.provider_name}>
              {provider.logo_path && <img src={PROVIDER_LOGO + provider.logo_path} alt={provider.provider_name} />}
              <span>{provider.provider_name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`Opciones para ver ${title}`}>
      <div className="watch-modal">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar modal">×</button>

        <div className="modal-header-copy">
          <span className="eyebrow">Dónde ver</span>
          <h2>{title}</h2>
          <p>Opciones legales de streaming para Argentina y tráiler oficial cuando está disponible.</p>
        </div>

        {loading && <div className="status-card compact"><p>Cargando opciones...</p></div>}
        {error && <div className="status-card compact"><p>{error}</p></div>}

        {!loading && !error && (
          <>
            {trailer ? (
              <div className="trailer-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={`Trailer de ${title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="status-card compact"><p>No encontramos un tráiler disponible para este título.</p></div>
            )}

            <div className="providers-box">
              {providers ? (
                <>
                  {renderProviderGroup('Streaming', providers.flatrate)}
                  {renderProviderGroup('Gratis con anuncios', providers.ads)}
                  {renderProviderGroup('Alquiler', providers.rent)}
                  {renderProviderGroup('Compra', providers.buy)}
                  {providers.link && (
                    <a className="btn-primary modal-action" href={providers.link} target="_blank" rel="noreferrer">
                      Ver disponibilidad completa en JustWatch
                    </a>
                  )}
                </>
              ) : (
                <div className="status-card compact"><p>No hay plataformas cargadas para Argentina en este momento.</p></div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
