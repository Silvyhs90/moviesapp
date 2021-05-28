import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import {Movie} from '../components/Movie'
import {MovieLogoUrl} from './constants'

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=600d38b9ea12ad8eed83670ed81d230c&page=1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=600d38b9ea12ad8eed83670ed81d230c&query=";

export const Home = () => {

   const [movies, setMovies ] = useState([]);  //vacio
   const [searchTerm, seSearchTerm] = useState("");

   
   useEffect(() => {
        fetch(FEATURED_API)
        .then((res) => res.json())
        .then((data) => {
                setMovies(data.results);
        });
    }, []);


    const handleOnSubmit =(e) => {
        e.preventDefault();

        fetch(SEARCH_API+searchTerm)
        .then((res) => res.json())
        .then((data) => {
                setMovies(data.results);
        });

    };

    const handleOnChange = (e) => {
    seSearchTerm(e.target.value);
    };

    return (
        <HomePage>
         <Wrapper>
        <MoviesLogo src={MovieLogoUrl} alt ="Logo pagina"/>
        <form onSubmit={handleOnSubmit}>
        <SearchBar
            type="search" 
            placeholder="Buscar.." 
            value={searchTerm}
            onChange={handleOnChange}
            />
        </form>
        <div className="movie">{movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie}/> )}</div>
       </Wrapper>
        </HomePage>
    );
}

const HomePage = styled.div`
  
  background-color: #22254b;
  display:flex;
  flex-wrap: wrap;
`

    const MoviesLogo = styled.div`
    width: 350px;
    align-items: center;
    `

    const Wrapper= styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    `
const SearchBar = styled.input`
  width: 100%;
  margin-bottom: 20px;
  margin-top:15px;
  font-size: 1.2rem;
  border:2px solid #22254b;
  padding:0.5rem 1.5rem;
  border-radius:50px;
`;
