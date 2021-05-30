import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Home} from "../pages/HomePage/index"
import {Search} from "../pages/MovieCard/index"
import {About} from "../pages/About/index"
import {SearchTv} from "../pages/TvCard/index"
import {PageNotFound} from "../pages/PageNotFound/index"


export const Router = () => {
   return (
    <BrowserRouter>
         <div className="contenedor">
         <div className="imagen">
               </div>
               <nav>
               <div>
               <ul>
               <li>
               <a href="/">Home Page</a>
               </li>
               <li>
               <a href="/about">About Me</a>
               </li>
               <li>
               <a href="/movie">Search Movies</a>
               </li>
               <li>
               <a href="/show">Search Tv Shows</a>
               </li>
            </ul>
         </div>
         </nav>
         </div>   
         <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/movie" component={Search} />
            <Route exact path="/show" component={SearchTv} />
            <Route component={PageNotFound} />
          </Switch>
    </BrowserRouter>
    );
};
