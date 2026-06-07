import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../images/notfound.png';

export const PageNotFound = () => {
  return (
    <main className="page">
      <section className="not-found-card">
        <img src={error} alt="Página no encontrada" />
        <span className="eyebrow">404</span>
        <h1>Página no encontrada</h1>
        <p>La ruta que buscás no existe o fue movida.</p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Link className="btn-primary" to="/">Volver al inicio</Link>
        </div>
      </section>
    </main>
  );
};
