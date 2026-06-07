import React from 'react';
import aboutme from '../../images/woman.svg';

export const About = () => {
  return (
    <main className="page">
      <section className="about-card">
        <img src={aboutme} alt="About Silvina" />
        <span className="eyebrow">About this project</span>
        <h1>Movies App</h1>
        <p>
          Aplicación hecha con React para buscar películas y series usando datos de The Movie Database.
          El proyecto original fue actualizado con una interfaz más moderna, cards responsive,
          estados de carga y mejor experiencia de búsqueda.
        </p>
        <div className="about-links">
          <a href="https://github.com/Silvyhs90" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB API</a>
        </div>
      </section>
    </main>
  );
};
