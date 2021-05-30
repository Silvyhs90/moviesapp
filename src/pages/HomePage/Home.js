import React  from 'react'
import styled from "styled-components"
import {Movie} from '../../components/Movie'


const FEATURED_API1 = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=600d38b9ea12ad8eed83670ed81d230c&page=1";
const FEATURED_API2 = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=600d38b9ea12ad8eed83670ed81d230c&page=2";
const FEATURED_API3 = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=600d38b9ea12ad8eed83670ed81d230c&page=3";

export const Home = () => {

   const [movies, setMovies] = React.useState([]);  
   const [movies2, setMovies2] = React.useState([]);  
   const [movies3, setMovies3] = React.useState([]);  

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


    return (
        <HomePage>
         <Wrapper>
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
    display:block; display:inline-block;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    `


