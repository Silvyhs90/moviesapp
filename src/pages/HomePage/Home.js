import React  from 'react'
import styled from "styled-components"
import {Movie} from '../../components/Movie'
import portada from "../../images/scream.jpg"

const FEATURED_API1 = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=600d38b9ea12ad8eed83670ed81d230c&page=1";
const FEATURED_API2 = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=600d38b9ea12ad8eed83670ed81d230c&page=2";
const FEATURED_API3 = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=600d38b9ea12ad8eed83670ed81d230c&page=3";
const TOP_RATED="https://api.themoviedb.org/3/movie/upcoming?api_key=600d38b9ea12ad8eed83670ed81d230c&language=en-US&page=1";

//const PORT= "https://api.themoviedb.org/3/movie/646385?api_key=600d38b9ea12ad8eed83670ed81d230c&language=en-US";

export const Home = () => {

   const [movies, setMovies] = React.useState([]);  
   const [movies2, setMovies2] = React.useState([]);  
   const [movies3, setMovies3] = React.useState([]);
   
   const [moviesRated, setMoviesRated] = React.useState([]);

    React.useEffect(() => {
        fetch(FEATURED_API1)
        .then((res) => res.json())
        .then((data) => {
                setMovies(data.results);
        });
    }, []);

    React.useEffect(() => {
        fetch(FEATURED_API2)
        .then((res) => res.json())
        .then((data) => {
                setMovies2(data.results);
        });
    }, []);

    React.useEffect(() => {
        fetch(FEATURED_API3)
        .then((res) => res.json())
        .then((data) => {
                setMovies3(data.results);
        });
    }, []);


    React.useEffect(() => {
        fetch(TOP_RATED)
        .then((res) => res.json())
        .then((data) => {
                setMoviesRated(data.results);
        });
    }, []);


    return (
        <HomePage>
             <Wrapper> 
                 <div className="imagen-texto">
                 <img src={portada} className="imagen-portada" alt="portada" />
                    <h1>SCREAM 2022</h1>
                <p>
                Twenty-five years after the original series of murders in Woodsboro, a new Ghostface emerges, and Sidney Prescott must return to uncover the truth.
                    </p>
                    </div>   
               <h1>UPCOMING MOVIES</h1>
            <div className="movie-container">
            {moviesRated.length > 0 && moviesRated.map((movie) => <Movie key={movie.id} {...movie}/>)}
            </div>
         <h1>MOVIES TO DISCOVER</h1>
        <div className="movie-container">
        {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie}/>)}
        {movies2.length > 0 && movies2.map((movie) => <Movie key={movie.id} {...movie}/>)}
        {movies3.length > 0 && movies3.map((movie) => <Movie key={movie.id} {...movie}/>)}
        </div>
       </Wrapper>
        </HomePage>
    ); 
};


    const HomePage = styled.div`
    display:block; 
    display:inline-block;
    background-color: #22254b;
    flex-wrap: wrap;
    `


    const Wrapper= styled.div`
    display:block; 
    display:inline-block;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
   

    h1{
        padding: 30px;
        color:white;
        background-color: black;
    }

    p{
        margin: 1rem;
        padding:30px;
        font-size: 25px;
    }
    `


