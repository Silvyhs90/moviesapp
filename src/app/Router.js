import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { Home } from '../pages/HomePage/index';
import { Search } from '../pages/MovieCard/index';
import { About } from '../pages/About/index';
import { SearchTv } from '../pages/TvCard/index';
import { PageNotFound } from '../pages/PageNotFound/index';
import { Favorites } from '../pages/Favorites/index';

export const Router = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="site-header">
          <nav className="navbar" aria-label="Main navigation">
            <NavLink exact to="/" className="brand">
              <span className="brand-mark">▶</span>
              <span>
                Movies App
                <small>Films & TV explorer</small>
              </span>
            </NavLink>

            <ul className="nav-links">
              <li><NavLink exact className="nav-link" to="/">Home</NavLink></li>
              <li><NavLink className="nav-link" to="/movie">Películas</NavLink></li>
              <li><NavLink className="nav-link" to="/show">Series</NavLink></li>
              <li><NavLink className="nav-link" to="/favorites">Favoritos</NavLink></li>
              <li><NavLink className="nav-link" to="/about">About</NavLink></li>
            </ul>
          </nav>
        </header>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/movie" component={Search} />
          <Route exact path="/show" component={SearchTv} />
          <Route exact path="/favorites" component={Favorites} />
          <Route component={PageNotFound} />
        </Switch>

        <p className="footer-note">Proyecto React creado por Silvina Saucedo · Datos de The Movie Database</p>
      </div>
    </BrowserRouter>
  );
};
