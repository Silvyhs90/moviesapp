import React  from 'react'
import styled from "styled-components"
import {Movie} from '../../components/Movie'


const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=600d38b9ea12ad8eed83670ed81d230c&page=2";

export const Home = () => {

   const [movies, setMovies ] = React.useState([]);  //vacio
    React.useEffect(() => {
        fetch(FEATURED_API)
        .then((res) => res.json())
        .then((data) => {
                setMovies(data.results);
        });
    }, []);

    return (
        <HomePage>
         <Wrapper>
        <div className="movie">{movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie}/>)}</div>
       </Wrapper>
        </HomePage>
    );
};

const HomePage = styled.div`
  
  background-color: #22254b;
  flex-wrap: wrap;
`


    const Wrapper= styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    `

