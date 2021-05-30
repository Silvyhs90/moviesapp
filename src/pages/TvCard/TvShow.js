import React  from 'react'
import styled from "styled-components"
import {TvShow} from '../../components/TvShow'


const FEATURED_API = "https://api.themoviedb.org/3/discover/tv?sort_by=name&api_key=600d38b9ea12ad8eed83670ed81d230c&page=1";
const SEARCH_API = "https://api.themoviedb.org/3/search/tv?api_key=600d38b9ea12ad8eed83670ed81d230c&query=";

export const SearchTv= () => {

   const [tvShow, setTvShow ] = React.useState([]);  //vacio
   const [searchTerm, seSearchTerm] = React.useState("");

   
   React.useEffect(() => {
        fetch(FEATURED_API)
        .then((res) => res.json())
        .then((data) => {
                setTvShow(data.results);
        });
    }, []);


    const handleOnSubmit =(e) => {
        e.preventDefault();

        fetch(SEARCH_API+searchTerm)
        .then((res) => res.json())
        .then((data) => {
                setTvShow(data.results);
        });

    };

    const handleOnChange = (e) => {
    seSearchTerm(e.target.value);
    };

    return (
        <HomePage>
         <Wrapper>
        <form onSubmit={handleOnSubmit}>
        <SearchBar 
            type="search" 
            placeholder="Search Tv Show.." 
            value={searchTerm}
            onChange={handleOnChange}
            />
        </form>
        <div className="tv-container">
            {tvShow.length > 0 && tvShow.map((tvShow) => <TvShow key={tvShow.id} {...tvShow}/> )}
            </div>
       </Wrapper>
        </HomePage>
    );
}

const HomePage = styled.div`
  
  background-color: #22254b;
  display:flex;
  flex-wrap: wrap;
`

    const Wrapper= styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    `
const SearchBar = styled.input`
  margin-left: 10px;
  margin-bottom: 20px;
  margin-top:15px;
  font-size: 1.2rem;
  border:2px solid black;
  padding:0.5rem 1.5rem;
  border-radius:60px;
`;
