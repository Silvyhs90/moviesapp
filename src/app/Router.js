import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import {Home} from "../pages/HomePage/index"
import {Search} from "../pages/MovieCard/index"
import {About} from "../pages/About/index"
import {SearchTv} from "../pages/TvCard/index"
import {PageNotFound} from "../pages/PageNotFound/index"

export const Router = () => {

 return (
    <BrowserRouter>
            <div>
               <nav>
               <ul>
               <li><Link to="/">Home</Link></li>
               <li><Link to="/about">About</Link></li>
               <li><Link to="/movie">Search Movies ♥</Link></li>
               <li><Link to="/show">Search Tv Series ♥</Link></li>
               </ul>
               </nav>
               </div>
         <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/movie" component={Search} />
            <Route exact path="/show" component={SearchTv} />
            <Route components={PageNotFound} />
          </Switch>
    </BrowserRouter>
    );
};