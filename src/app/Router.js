import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import {Home} from '../pages/Home'


export const Router = () => {
    
    return(
    <BrowserRouter>
           <div className="App">
             <Route exact path="/" component={Home} />
           </div>
    </BrowserRouter>
    );
};